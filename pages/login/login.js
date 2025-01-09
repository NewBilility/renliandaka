import { BASE_URL } from '../../config/api'

Page({
    data: {
        role: 'student', // 默认选中学生角色
        userId: '',
        password: ''
    },

    // 切换角色
    switchRole(e) {
        this.setData({
            role: e.currentTarget.dataset.role
        })
    },

    // 输入框变化处理
    inputChange(e) {
        const { field } = e.currentTarget.dataset
        const value = e.detail.value
        this.setData({
            [field]: value
        })
    },

    // 登录处理
    async handleLogin() {
        const { role, userId, password } = this.data

        if (!userId || !password) {
            wx.showToast({
                title: '请输入用户ID和密码',
                icon: 'none'
            })
            return
        }

        if (role === 'admin') {
            try {
                const res = await new Promise((resolve, reject) => {
                    wx.request({
                        url: `${BASE_URL}/admin/login`,
                        method: 'POST',
                        data: {
                            userid: userId,
                            password: password
                        },
                        success: resolve,
                        fail: reject
                    })
                })

                if (res.data.code === 200) {
                    // 保存登录信息
                    wx.setStorageSync('token', res.data.data.token)
                    wx.setStorageSync('session_id', res.data.data.session_id)
                    wx.setStorageSync('expire_time', res.data.data.expire_time)
                    wx.setStorageSync('adminInfo', {
                        name: res.data.data.username,
                        userid: res.data.data.userid
                    })

                    wx.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 1500,
                        success: () => {
                            setTimeout(() => {
                                wx.redirectTo({
                                    url: '/pages/admin/index'
                                })
                            }, 1500)
                        }
                    })
                } else {
                    wx.showToast({
                        title: res.data.message || '登录失败',
                        icon: 'none'
                    })
                }
            } catch (error) {
                wx.showToast({
                    title: '网络错误',
                    icon: 'none'
                })
            }
        } else {
            // TODO: 学生登录逻辑
            wx.showToast({
                title: '学生登录功能待实现',
                icon: 'none'
            })
        }
    }
}) 