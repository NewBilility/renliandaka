Page({
    data: {
        adminInfo: {
            name: '管理员',
            department: '教务处'
        },
        statistics: {
            totalStudents: 1200,
            totalCourses: 48,
            activeUsers: 856
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