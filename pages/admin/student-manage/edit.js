import { BASE_URL } from '../../../config/api'

Page({
    data: {
        isEdit: false,
        studentInfo: {
            student_id: '',
            name: '',
            class_name: '',
            major: '',
            college: '',
            password: ''
        },
        tempFilePath: ''  // 临时文件路径
    },

    onLoad(options) {
        if (options.student_id) {
            this.setData({ isEdit: true })
            this.fetchStudentInfo(options.student_id)
        }
    },

    // 获取学生信息
    async fetchStudentInfo(student_id) {
        try {
            wx.showLoading({
                title: '加载中...'
            })

            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/student/${student_id}`,
                    method: 'GET',
                    data: {
                        admin_userid: adminInfo.userid
                    },
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    studentInfo: {
                        student_id: res.data.data.student_id,
                        name: res.data.data.name,
                        class_name: res.data.data.class_name,
                        major: res.data.data.major,
                        college: res.data.data.college || '',
                        password: ''  // 密码不回显
                    }
                })

                // 获取学生头像
                await this.fetchStudentAvatar(student_id)
            } else {
                wx.showToast({
                    title: res.data.message || '获取学生信息失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        } finally {
            wx.hideLoading()
        }
    },

    // 输入框变化处理
    handleInput(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`studentInfo.${field}`]: e.detail.value
        })
    },

    // 选择并上传头像
    async chooseAvatar() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async (res) => {
                const tempFilePath = res.tempFilePaths[0]
                console.log('选择图片成功：', tempFilePath)

                try {
                    wx.showLoading({ title: '上传中...' })

                    const uploadRes = await new Promise((resolve, reject) => {
                        wx.uploadFile({
                            url: `${BASE_URL}/student/avatar/upload/${this.data.studentInfo.student_id}`,
                            filePath: tempFilePath,
                            name: 'avatar',
                            success: resolve,
                            fail: reject
                        })
                    })

                    const result = JSON.parse(uploadRes.data)
                    if (result.code === 200) {
                        this.setData({
                            tempFilePath: tempFilePath
                        })
                        wx.showToast({
                            title: '头像上传成功',
                            icon: 'success'
                        })
                    } else {
                        wx.showToast({
                            title: result.message || '上传失败',
                            icon: 'none'
                        })
                    }
                } catch (error) {
                    console.error('上传失败：', error)
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none'
                    })
                } finally {
                    wx.hideLoading()
                }
            },
            fail: (err) => {
                console.error('选择图片失败：', err)
                wx.showToast({
                    title: '选择图片失败',
                    icon: 'none'
                })
            }
        })
    },

    // 添加学生
    async handleAdd() {
        const { studentInfo, tempFilePath } = this.data

        // 表单验证
        if (!studentInfo.student_id || !studentInfo.name || !studentInfo.class_name ||
            !studentInfo.major || !studentInfo.college || !studentInfo.password || !tempFilePath) {
            wx.showToast({
                title: '请填写完整信息并选择头像',
                icon: 'none'
            })
            return
        }

        try {
            wx.showLoading({ title: '添加中...' })
            const adminInfo = wx.getStorageSync('adminInfo')

            const formData = {
                admin_userid: adminInfo.userid,
                student_id: studentInfo.student_id,
                name: studentInfo.name,
                password: studentInfo.password,
                class_name: studentInfo.class_name,
                major: studentInfo.major,
                college: studentInfo.college
            }

            const res = await new Promise((resolve, reject) => {
                wx.uploadFile({
                    url: `${BASE_URL}/admin/student/create`,
                    filePath: tempFilePath,
                    name: 'avatar',
                    formData: formData,
                    success: resolve,
                    fail: reject
                })
            })

            const result = JSON.parse(res.data)
            if (result.code === 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    success: () => {
                        setTimeout(() => wx.navigateBack(), 1500)
                    }
                })
            } else {
                wx.showToast({
                    title: result.message || '添加失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        } finally {
            wx.hideLoading()
        }
    },

    // 编辑学生
    async handleEdit() {
        const { studentInfo } = this.data

        try {
            wx.showLoading({ title: '保存中...' })
            const adminInfo = wx.getStorageSync('adminInfo')

            // 只包含修改的字段
            const requestData = {
                admin_userid: adminInfo.userid
            }

            // 只添加已修改的字段
            if (studentInfo.name) requestData.name = studentInfo.name
            if (studentInfo.password) requestData.password = studentInfo.password
            if (studentInfo.class_name) requestData.class_name = studentInfo.class_name
            if (studentInfo.major) requestData.major = studentInfo.major
            if (studentInfo.college) requestData.college = studentInfo.college

            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/student/${studentInfo.student_id}`,
                    method: 'PUT',
                    data: requestData,
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    success: () => {
                        setTimeout(() => wx.navigateBack(), 1500)
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.message || '修改失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        } finally {
            wx.hideLoading()
        }
    },

    // 提交表单
    handleSubmit() {
        const { isEdit } = this.data
        if (isEdit) {
            this.handleEdit()
        } else {
            this.handleAdd()
        }
    },

    // 获取学生头像
    async fetchStudentAvatar(student_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                wx.downloadFile({
                    url: `${BASE_URL}/student/avatar/${student_id}`,
                    success: resolve,
                    fail: reject
                })
            })

            if (res.statusCode === 200) {
                this.setData({
                    tempFilePath: res.tempFilePath
                })
            } else {
                console.error('获取头像失败：', res)
            }
        } catch (error) {
            console.error('获取头像错误：', error)
        }
    }
}) 