Page({
    data: {
        announcements: [
            {
                id: '1',
                title: '关于期末考试安排的通知',
                content: '各位同学：期末考试将于2024年1月15日开始...',
                createTime: '2024-01-04 10:00',
                comments: [
                    {
                        id: '1',
                        studentName: '张三',
                        content: '请问可以调整考试时间吗？',
                        createTime: '2024-01-04 10:30',
                        reply: '抱歉，考试时间已经确定，不能调整。'
                    }
                ]
            },
            {
                id: '2',
                title: '寒假放假通知',
                content: '寒假将于2024年1月20日开始...',
                createTime: '2024-01-03 14:00',
                comments: []
            }
        ]
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
            success: (res) => {
                if (res.confirm) {
                    // TODO: 调用删除API
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success'
                    })
                }
            }
        })
    },

    // 查看公告详情
    handleViewDetail(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/admin/announcement-manage/detail?id=${id}`
        })
    }
}) 