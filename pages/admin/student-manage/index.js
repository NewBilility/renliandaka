Page({
    data: {
        searchValue: '',
        studentList: [
            {
                id: '2024001',
                name: '张三',
                class: '计算机科学2024级',
                major: '计算机科学与技术',
                college: '信息学院',
                avatar: '/images/avatar-default.png'
            },
            {
                id: '2024002',
                name: '李四',
                class: '计算机科学2024级',
                major: '计算机科学与技术',
                college: '信息学院',
                avatar: '/images/avatar-default.png'
            }
        ]
    },

    // 搜索框输入
    onSearchInput(e) {
        this.setData({
            searchValue: e.detail.value
        })
    },

    // 搜索学生
    handleSearch() {
        const { searchValue } = this.data
        // TODO: 调用搜索API
        wx.showToast({
            title: '搜索功能待实现',
            icon: 'none'
        })
    },

    // 添加学生
    handleAddStudent() {
        wx.navigateTo({
            url: '/pages/admin/student-manage/edit'
        })
    },

    // 编辑学生
    handleEditStudent(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/admin/student-manage/edit?id=${id}`
        })
    },

    // 删除学生
    handleDeleteStudent(e) {
        const { id } = e.currentTarget.dataset
        wx.showModal({
            title: '确认删除',
            content: '确定要删除该学生信息吗？',
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
    }
}) 