import { BASE_URL } from '../../../config/api'

Page({
    data: {
        adminInfo: null,
        loading: true,
        newPassword: ''
    },

    onLoad() {
        this.fetchAdminInfo()
    },

    // 基本信息输入处理
    handleInput(e) {
        const { field } = e.currentTarget.dataset
        const value = e.detail.value
        this.setData({
            [`adminInfo.${field}`]: value
        })
    },

    // 区域信息输入处理
    handleAreaInput(e) {
        const { field, index } = e.currentTarget.dataset
        const value = e.detail.value
        this.setData({
            [`adminInfo.areas[${index}].${field}`]: value
        })
    },

    // 保存修改
    async handleSave() {
        wx.showLoading({
            title: '保存中...'
        })

        try {
            const userid = wx.getStorageSync('adminInfo').userid
            // 准备请求数据
            const requestData = {
                username: this.data.adminInfo.username,
                contact: this.data.adminInfo.contact,
                areas: this.data.adminInfo.areas.map(area => {
                    // 基础数据
                    const areaData = {
                        name: area.name,
                        longitude: area.longitude,
                        latitude: area.latitude,
                        description: area.description
                    }

                    // 如果不是新增的区域（有原始id且不是临时生成的），才添加id字段
                    if (area.id && !String(area.id).startsWith('temp_')) {
                        areaData.id = area.id
                    }

                    return areaData
                })
            }

            // 如果输入了新密码，则添加到请求数据中
            if (this.data.newPassword) {
                requestData.password = this.data.newPassword
            }

            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/update/${userid}`,
                    method: 'PUT',
                    data: requestData,
                    success: resolve,
                    fail: reject
                })
            })

            wx.hideLoading()

            if (res.data.code === 200) {
                // 更新页面数据
                this.setData({
                    adminInfo: res.data.data,
                    newPassword: ''
                })
                wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                })
            } else {
                wx.showToast({
                    title: res.data.message || '保存失败',
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

    async fetchAdminInfo() {
        try {
            const userid = wx.getStorageSync('adminInfo').userid
            const res = await new Promise((resolve, reject) => {
                wx.request({
                    url: `${BASE_URL}/admin/info/${userid}`,
                    method: 'GET',
                    success: resolve,
                    fail: reject
                })
            })

            if (res.data.code === 200) {
                this.setData({
                    adminInfo: res.data.data,
                    loading: false
                })
            } else {
                wx.showToast({
                    title: res.data.message || '获取信息失败',
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

    // 添加区域
    handleAddArea() {
        const newArea = {
            id: 'temp_' + Date.now(), // 添加temp_前缀
            name: '新区域',
            description: '请输入区域描述',
            longitude: 116.397,
            latitude: 39.909
        }

        const areas = this.data.adminInfo.areas || []
        this.setData({
            'adminInfo.areas': [...areas, newArea]
        })
    },

    // 删除区域
    handleDeleteArea(e) {
        const { index } = e.currentTarget.dataset
        wx.showModal({
            title: '确认删除',
            content: '确定要删除这个区域吗？',
            success: (res) => {
                if (res.confirm) {
                    const areas = this.data.adminInfo.areas
                    areas.splice(index, 1)
                    this.setData({
                        'adminInfo.areas': areas
                    })
                }
            }
        })
    }
}) 