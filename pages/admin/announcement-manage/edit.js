import { BASE_URL } from '../../../config/api'

Page({
    data: {
        isEdit: false,
        announcement: {
            id: '',
            title: '',
            content: ''
        }
    },

    onLoad(options) {
        if (options.id) {
            this.setData({
                isEdit: true,
                'announcement.id': options.id
            })
            this.fetchAnnouncementDetail(options.id)
        }
    },

    // 获取公告详情
    async fetchAnnouncementDetail(id) {
        try {
            wx.showLoading({
                title: '加载中...'
            })

            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/notice/detail/${id}`,
                    method: 'GET',
                    success: resolve,
                    fail: reject
                })
            })

            wx.hideLoading()

            if (res.data.code === 200) {
                this.setData({
                    announcement: {
                        id: res.data.data.id,
                        title: res.data.data.title,
                        content: res.data.data.content
                    }
                })
            } else {
                wx.showToast({
                    title: res.data.message || '获取公告详情失败',
                    icon: 'none'
                })
            }
        } catch (error) {
            wx.hideLoading()
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            })
        }
    },

    // 输入框变化处理
    handleInput(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`announcement.${field}`]: e.detail.value
        })
    },

    // 提交表单
    async handleSubmit() {
        const { announcement, isEdit } = this.data

        if (!announcement.title || !announcement.content) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            })
            return
        }

        if (isEdit) {
            try {
                wx.showLoading({
                    title: '保存中...'
                })

                const adminInfo = wx.getStorageSync('adminInfo')
                const res = await new Promise((resolve, reject) => {
                    wx.request({
                        url: `${BASE_URL}/notice/update/${announcement.id}`,
                        method: 'PUT',
                        data: {
                            admin_userid: adminInfo.userid,
                            title: announcement.title,
                            content: announcement.content
                        },
                        success: resolve,
                        fail: reject
                    })
                })

                wx.hideLoading()

                if (res.data.code === 200) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        success: () => {
                            setTimeout(() => {
                                // 返回上一页并刷新列表
                                const pages = getCurrentPages()
                                const prevPage = pages[pages.length - 2]
                                prevPage.fetchAnnouncementList() // 调用上一页的刷新方法
                                wx.navigateBack()
                            }, 1500)
                        }
                    })
                } else {
                    wx.showToast({
                        title: res.data.message || '修改失败',
                        icon: 'none'
                    })
                }
            } catch (error) {
                wx.hideLoading()
                wx.showToast({
                    title: '网络错误',
                    icon: 'none'
                })
            }
        } else {
            try {
                wx.showLoading({
                    title: '发布中...'
                })

                const adminInfo = wx.getStorageSync('adminInfo')
                const res = await new Promise((resolve, reject) => {
                    wx.request({
                        url: `${BASE_URL}/notice/create`,
                        method: 'POST',
                        data: {
                            admin_userid: adminInfo.userid,
                            title: announcement.title,
                            content: announcement.content
                        },
                        success: resolve,
                        fail: reject
                    })
                })

                wx.hideLoading()

                if (res.data.code === 200) {
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        success: () => {
                            setTimeout(() => {
                                // 返回上一页并刷新列表
                                const pages = getCurrentPages()
                                const prevPage = pages[pages.length - 2]
                                prevPage.fetchAnnouncementList() // 调用上一页的刷新方法
                                wx.navigateBack()
                            }, 1500)
                        }
                    })
                } else {
                    wx.showToast({
                        title: res.data.message || '发布失败',
                        icon: 'none'
                    })
                }
            } catch (error) {
                wx.hideLoading()
                wx.showToast({
                    title: '网络错误',
                    icon: 'none'
                })
            }
        }
    }
}) 