Page({
    data: {
        isEdit: false,
        studentInfo: {
            id: '',
            name: '',
            class: '',
            major: '',
            college: '',
            password: '',
            avatar: '/images/avatar-default.png'
        }
    },

    onLoad(options) {
        if (options.id) {
            this.setData({ isEdit: true })
            // TODO: 根据id获取学生信息
            // 这里暂时使用模拟数据
            this.setData({
                studentInfo: {
                    id: '2024001',
                    name: '张三',
                    class: '计算机科学2024级',
                    major: '计算机科学与技术',
                    college: '信息学院',
                    password: '123456',
                    avatar: '/images/avatar-default.png'
                }
            })
        }
    },

    // 输入框变化处理
    handleInput(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`studentInfo.${field}`]: e.detail.value
        })
    },

    // 选择头像
    chooseAvatar() {
        wx.chooseImage({
            count: 1,
            success: (res) => {
                this.setData({
                    'studentInfo.avatar': res.tempFilePaths[0]
                })
            }
        })
    },

    // 提交表单
    handleSubmit() {
        const { studentInfo, isEdit } = this.data

        // 表单验证
        if (!studentInfo.id || !studentInfo.name || !studentInfo.class ||
            !studentInfo.major || !studentInfo.college || !studentInfo.password) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            })
            return
        }

        // TODO: 调用保存API
        wx.showToast({
            title: isEdit ? '修改成功' : '添加成功',
            icon: 'success',
            success: () => {
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
            }
        })
    }
}) 