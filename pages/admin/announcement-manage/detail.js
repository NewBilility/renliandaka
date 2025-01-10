import { BASE_URL } from '../../../config/api'

Page({
    data: {
        announcement: null,
        comments: [],
        loading: true,
        expandedComments: {}, // 记录展开状态的评论
        commentContent: '', // 新评论内容
        replyContent: '', // 回复内容
        replyToComment: null, // 当前要回复的评论
        noticeId: null // 当前公告ID
    },

    onLoad(options) {
        if (options.id) {
            this.setData({
                noticeId: options.id
            })
            this.fetchAnnouncementDetail(options.id)
            this.fetchComments(options.id)
        }
    },

    // 获取公告详情
    async fetchAnnouncementDetail(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/notice/detail/${id}`,
                    method: 'GET',
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    announcement: res.data.data,
                    loading: false
                })
            } else {
                wx.showToast({
                    title: res.data.message || '获取公告详情失败',
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

    // 获取评论列表
    async fetchComments(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/notice/${id}/comments`,
                    method: 'GET',
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    comments: res.data.data
                })
            } else {
                wx.showToast({
                    title: res.data.message || '获取评论失败',
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

    // 切换评论展开状态
    toggleCommentReplies(e) {
        const { commentid } = e.currentTarget.dataset
        const { expandedComments } = this.data

        this.setData({
            [`expandedComments.${commentid}`]: !expandedComments[commentid]
        })
    },

    // 显示回复框
    showReplyInput(e) {
        const { commentid } = e.currentTarget.dataset
        this.setData({
            replyToComment: commentid,
            replyContent: ''
        })
    },

    // 取消回复
    cancelReply() {
        this.setData({
            replyToComment: null,
            replyContent: ''
        })
    },

    // 评论内容输入
    handleCommentInput(e) {
        this.setData({
            commentContent: e.detail.value
        })
    },

    // 回复内容输入
    handleReplyInput(e) {
        this.setData({
            replyContent: e.detail.value
        })
    },

    // 提交评论
    async submitComment() {
        const { commentContent, noticeId } = this.data
        if (!commentContent.trim()) {
            wx.showToast({
                title: '请输入评论内容',
                icon: 'none'
            })
            return
        }

        try {
            wx.showLoading({
                title: '提交中...'
            })

            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/comment/create`,
                    method: 'POST',
                    data: {
                        notice_id: parseInt(noticeId),
                        content: commentContent,
                        commenter_type: 1, // 管理员
                        commenter_id: adminInfo.userid // 保持字符串类型
                    },
                    success: resolve,
                    fail: reject
                })
            })

            wx.hideLoading()

            if (res.data.code === 200) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success'
                })
                this.setData({
                    commentContent: ''
                })
                // 刷新评论列表
                this.fetchComments(noticeId)
            } else {
                wx.showToast({
                    title: res.data.message || '评论失败',
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

    // 提交回复
    async submitReply() {
        const { replyContent, noticeId, replyToComment } = this.data
        if (!replyContent.trim()) {
            wx.showToast({
                title: '请输入回复内容',
                icon: 'none'
            })
            return
        }

        try {
            wx.showLoading({
                title: '提交中...'
            })

            const adminInfo = wx.getStorageSync('adminInfo')
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/comment/create`,
                    method: 'POST',
                    data: {
                        notice_id: parseInt(noticeId),
                        content: replyContent,
                        commenter_type: 1, // 管理员
                        commenter_id: adminInfo.userid, // 保持字符串类型
                        parent_id: parseInt(replyToComment)
                    },
                    success: resolve,
                    fail: reject
                })
            })

            wx.hideLoading()

            if (res.data.code === 200) {
                wx.showToast({
                    title: '回复成功',
                    icon: 'success'
                })
                this.setData({
                    replyContent: '',
                    replyToComment: null
                })
                // 刷新评论列表
                this.fetchComments(noticeId)
            } else {
                wx.showToast({
                    title: res.data.message || '回复失败',
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
}) 