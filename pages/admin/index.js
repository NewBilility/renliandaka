import { checkLoginStatusAndRedirect } from '../../utils/auth.js'

Page({
    data: {
        adminInfo: {
            name: ''
        }
    },

    onLoad() {
        if (!checkLoginStatusAndRedirect()) return

        // 获取管理员信息
        const adminInfo = wx.getStorageSync('adminInfo')
        if (adminInfo) {
            this.setData({
                adminInfo: adminInfo
            })
        }
    },

    onShow() {
        if (!checkLoginStatusAndRedirect()) return
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