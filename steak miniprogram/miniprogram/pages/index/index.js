// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  //切换到点单tapbar
  switch2order(event) {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  navigate2associator:function(event){
    console.log(event);
    wx.navigateTo({
      url: '/pages/index/associatorAct/associatorArt',
    })
  },
  switch2coupon(event){
    wx.switchTab({
      url: '/pages/account/account',
    })
  },
  navigate2booking(event){
    wx.navigateTo({
      url: '/pages/index/booking/booking',
    })
  },
  navigate2lottery(event){
    wx.navigateTo({
      url: '/pages/index/lottery/lottery',
    })
  },
  navigate2point(event){
    wx.navigateTo({
      url: '/pages/index/point/point',
    })
  },
  navigate2share(event){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
