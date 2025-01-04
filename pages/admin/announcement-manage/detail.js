Page({
    data: {
        announcement: {
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
        replyContent: '',
        currentCommentId: ''
    },

    onLoad(options) {
        if (options.id) {
            // TODO: 根据id获取公告详情
            // 目前使用假数据
        }
    },

    // 显示回复框
    showReplyInput(e) {
        const { id } = e.currentTarget.dataset
        this.setData({ currentCommentId: id })
    },

    // 输入回复内容
    handleReplyInput(e) {
        this.setData({
            replyContent: e.detail.value
        })
    },

    // 提交回复
    handleSubmitReply() {
        const { replyContent, currentCommentId } = this.data
        if (!replyContent) {
            wx.showToast({
                title: '请输入回复内容',
                icon: 'none'
            })
            return
        }

        // TODO: 调用回复API
        wx.showToast({
            title: '回复成功',
            icon: 'success'
        })

        this.setData({
            replyContent: '',
            currentCommentId: ''
        })
    }
}) 