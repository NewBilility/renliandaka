Page({
    data: {
        studentInfo: null
    },

    onLoad() {
        const studentInfo = wx.getStorageSync('studentInfo')
        if (studentInfo) {
            this.setData({
                studentInfo: studentInfo
            })
        }
    },

    // 跳转到公告信息页面
    navigateToAnnouncements() {
        wx.navigateTo({
            url: '/pages/student/announcements/index'
        })
    },

    // 跳转到个人打卡页面
    navigateToCheckin() {
        wx.navigateTo({
            url: '/pages/student/checkin/index'
        })
    },

    // 跳转到个人信息页面
    navigateToProfile() {
        wx.navigateTo({
            url: '/pages/student/profile/index'
        })
    }
}) 