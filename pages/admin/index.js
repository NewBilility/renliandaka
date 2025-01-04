Page({
    data: {
        adminInfo: {
            name: '张老师'
        }
    },

    navigateToStudentManage() {
        wx.navigateTo({
            url: '/pages/admin/student-manage/index'
        })
    },

    navigateToAnnouncementManage() {
        wx.navigateTo({
            url: '/pages/admin/announcement-manage/index'
        })
    }
}) 