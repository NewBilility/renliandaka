import { BASE_URL } from '../../../config/api'

Page({
    data: {
        announcements: [],
        loading: true
    },

    onLoad() {
        this.fetchAnnouncementList()
    },

    // 获取公告列表
    async fetchAnnouncementList() {
        try {
            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/notice/list`,
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
                    announcements: res.data.data,
                    loading: false
                })
            } else {
                wx.showToast({
                    title: res.data.message || '获取公告列表失败',
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

    // 添加公告
    handleAddAnnouncement() {
        wx.navigateTo({
            url: '/pages/admin/announcement-manage/edit'
        })
    },

    // 编辑公告
    handleEditAnnouncement(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/admin/announcement-manage/edit?id=${id}`
        })
    },

    // 删除公告
    handleDeleteAnnouncement(e) {
        const { id } = e.currentTarget.dataset
        wx.showModal({
            title: '确认删除',
            content: '确定要删除该公告吗？',
            success: async (res) => {
                if (res.confirm) {
                    try {
                        wx.showLoading({
                            title: '删除中...'
                        })

                        const adminInfo = wx.getStorageSync('adminInfo')
                        const res = await new Promise((resolve, reject) => {
                            wx.request({
                                url: `${BASE_URL}/notice/delete/${id}`,
                                method: 'DELETE',
                                data: {
                                    admin_userid: adminInfo.userid
                                },
                                success: resolve,
                                fail: reject
                            })
                        })

                        wx.hideLoading()

                        if (res.data.code === 200) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                            // 重新获取公告列表
                            this.fetchAnnouncementList()
                        } else {
                            wx.showToast({
                                title: res.data.message || '删除失败',
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
    },

    // 阻止事件冒泡
    stopPropagation(e) {
        e.stopPropagation()
    },

    // 查看公告详情
    handleViewDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/admin/announcement-manage/detail?id=${id}`
        })
    }
}) 