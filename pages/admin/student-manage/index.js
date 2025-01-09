import { BASE_URL } from '../../../config/api'

Page({
    data: {
        searchValue: '',
        studentList: [],
        loading: true
    },

    onLoad() {
        this.fetchStudentList()
    },

    // 获取学生列表
    async fetchStudentList() {
        try {
            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/students`,
                    method: 'GET',
                    data: {
                        admin_userid: adminInfo.userid
                    },
                    success: (res) => {
                        console.log('获取到的学生列表：', res.data.data)
                        resolve(res)
                    },
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    studentList: res.data.data,
                    loading: false
                })
                console.log('设置后的学生列表：', this.data.studentList)
            } else {
                wx.showToast({
                    title: res.data.message || '获取学生列表失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        }
    },

    // 搜索框输入
    onSearchInput(e) {
        this.setData({
            searchValue: e.detail.value
        })
    },

    // 搜索学生
    async handleSearch() {
        const { searchValue } = this.data

        try {
            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/students`,
                    method: 'GET',
                    data: {
                        admin_userid: adminInfo.userid,
                        student_id: searchValue
                    },
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    studentList: res.data.data
                })
            } else {
                wx.showToast({
                    title: res.data.message || '搜索失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        }
    },

    // 添加学生
    handleAddStudent() {
        wx.navigateTo({
            url: '/pages/admin/student-manage/edit'
        })
    },

    // 编辑学生
    handleEditStudent(e) {
        const { studentid } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/admin/student-manage/edit?student_id=${studentid}`
        })
    },

    // 删除学生
    async handleDeleteStudent(e) {
        const { studentid } = e.currentTarget.dataset
        console.log('要删除的学生ID:', studentid)

        if (!studentid) {
            wx.showToast({
                title: '学号不能为空',
                icon: 'none'
            })
            return
        }

        wx.showModal({
            title: '确认删除',
            content: '确定要删除该学生信息吗？',
            success: async (res) => {
                if (res.confirm) {
                    try {
                        wx.showLoading({
                            title: '删除中...'
                        })

                        const adminInfo = wx.getStorageSync('adminInfo')
                        const res = await new Promise((resolve, reject) => {
                            wx.request({
                                url: `${BASE_URL}/admin/student/${studentid}`,
                                method: 'DELETE',
                                data: {
                                    admin_userid: adminInfo.userid
                                },
                                success: resolve,
                                fail: reject
                            })
                        })

                        if (res.data.code === 200) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                            // 重新获取学生列表
                            this.fetchStudentList()
                        } else {
                            wx.showToast({
                                title: res.data.message || '删除失败',
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
            }
        })
    }
}) 