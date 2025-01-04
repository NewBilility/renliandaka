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
            this.setData({ isEdit: true })
            // TODO: 根据id获取公告信息
            // 这里暂时使用模拟数据
            this.setData({
                announcement: {
                    id: '1',
                    title: '关于期末考试安排的通知',
                    content: '各位同学：期末考试将于2024年1月15日开始...'
                }
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
    handleSubmit() {
        const { announcement, isEdit } = this.data

        if (!announcement.title || !announcement.content) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            })
            return
        }

        // TODO: 调用保存API
        wx.showToast({
            title: isEdit ? '修改成功' : '发布成功',
            icon: 'success',
            success: () => {
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
            }
        })
    }
}) 