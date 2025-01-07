// 检查登录状态
export function checkLoginStatus() {
    const token = wx.getStorageSync('token')
    const expireTime = wx.getStorageSync('expire_time')

    if (!token || !expireTime) {
        return false
    }

    // 检查是否过期
    const now = new Date().getTime()
    // 将日期格式转换为 iOS 支持的格式
    const formattedExpireTime = expireTime.replace(' ', 'T')
    const expireDate = new Date(formattedExpireTime).getTime()

    if (now >= expireDate) {
        // 清除过期信息
        wx.removeStorageSync('token')
        wx.removeStorageSync('session_id')
        wx.removeStorageSync('expire_time')
        wx.removeStorageSync('adminInfo')
        return false
    }

    return true
}

// 检查登录状态并跳转
export function checkLoginStatusAndRedirect() {
    if (!checkLoginStatus()) {
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]

        // 如果当前页面不是登录页，才跳转到登录页
        if (currentPage && currentPage.route !== 'pages/login/login') {
            wx.redirectTo({
                url: '/pages/login/login'
            })
        }
        return false
    }
    return true
}

// 处理返回主页
export function handleBackToHome() {
    if (checkLoginStatus()) {
        wx.switchTab({
            url: '/pages/admin/index'
        })
    } else {
        wx.redirectTo({
            url: '/pages/login/login'
        })
    }
} 