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
        this.setData({
            [field]: e.detail.value
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

        // 模拟API调用
        const res = await new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    code: 0,
                    message: '登录成功',
                    data: []
                })
            }, 1000)
        })

        if (res.code === 0) {
            wx.showToast({
                title: '登录成功',
                icon: 'success'
            })

            // 根据角色跳转到不同页面
            wx.redirectTo({
                url: role === 'student' ? '/pages/student/index' : '/pages/admin/index'
            })
        }
    }
}) 