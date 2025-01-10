import { BASE_URL } from '../../../config/api'

Page({
    data: {
        studentInfo: null,
        newPassword: '',
        avatarUrl: '/static/images/default-avatar.png'  // 添加默认头像
    },

    onLoad() {
        const studentInfo = wx.getStorageSync('studentInfo')
        if (studentInfo) {
            this.setData({
                studentInfo: studentInfo
            })
            // 获取学生头像
            this.fetchStudentAvatar(studentInfo.student_id)
        }
    },

    // 获取学生头像
    async fetchStudentAvatar(studentId) {
        try {
            // 先下载图片到本地
            const downloadRes = await new Promise((resolve, reject) => {
                wx.downloadFile({
                    url: `${BASE_URL}/student/avatar/${studentId}`,
                    success: resolve,
                    fail: reject
                })
            })

            if (downloadRes.statusCode === 200) {
                this.setData({
                    avatarUrl: downloadRes.tempFilePath
                })
            }
        } catch (error) {
            console.error('获取头像失败:', error)
            // 加载失败时使用默认头像
            this.setData({
                avatarUrl: '/static/images/default-avatar.png'
            })
        }
    },

    // 选择并上传头像
    chooseAvatar() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: async (res) => {
                const tempFilePath = res.tempFilePaths[0]

                try {
                    wx.showLoading({
                        title: '上传中...'
                    })

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
                        // 重新获取头像
                        await this.fetchStudentAvatar(this.data.studentInfo.student_id)

                        wx.showToast({
                            title: '头像更新成功',
                            icon: 'success'
                        })
                    } else {
                        wx.showToast({
                            title: result.message || '上传失败',
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
            }
        })
    },

    // 密码输入处理
    handlePasswordInput(e) {
        this.setData({
            newPassword: e.detail.value
        })
    },

    // 修改密码
    async handleUpdatePassword() {
        const { newPassword } = this.data
        if (!newPassword.trim()) {
            wx.showToast({
                title: '请输入新密码',
                icon: 'none'
            })
            return
        }

        try {
            wx.showLoading({
                title: '更新中...'
            })

            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/student/password/update`,
                    method: 'PUT',
                    data: {
                        student_id: this.data.studentInfo.student_id,
                        new_password: newPassword
                    },
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                wx.showToast({
                    title: res.data.message || '密码修改成功',
                    icon: 'success'
                })
                // 清空输入框
                this.setData({
                    newPassword: ''
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
    }
}) 