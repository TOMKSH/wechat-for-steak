// pages/account/account.js
var app=getApp()
console.log('globalData is',app.globalData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    point:0,
    coupon:[],
    exp:0,
    lv:0,
    id:0
  },
  //打开积分商城页面
  toPoint:function(){
    wx.navigateTo({
      url: '../index/point/point',
    })
  },
  //打开预约页面
  toAppoint:function(){
    wx.navigateTo({
      url: '../index/booking/booking',
    })
  },
  //查看订单页面
  toOrders:function(){
    wx.switchTab({
      url: '../orderList/orderList',
    })
  },
  getinfo:function(res){
      var userInfo = res.detail.userInfo
      this.setData({
        info:res.detail.userInfo,
      })
  },
  //打开抽奖页面
  toLottery:function(){
    wx.navigateTo({
      url: '../index/lottery/lottery',
    })
  },
  //打开叠杯任务页面
  toMission:function(){
    wx.navigateTo({
      url: '../index/associatorAct/associatorArt',
    })
  },
  //打开优惠券页面
  toCoupon:function(){
    wx.navigateTo({
      url: './coupon/coupon',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      lang: 'zh_CN',
      success:function(res){
        console.log(res.userInfo)
        that.setData({
          info:res.userInfo
        })
      }
    })
    wx.cloud.database().collection('user')
    .where({
      _openid:app.globalData.openid
    })
    .get({
      success:function(res){
        console.log('积分优惠信息',res.data)
        that.setData({
          point: res.data[0].pointNum,
          coupon:res.data[0].coupon,
          exp:res.data[0].exp,
          lv:res.data[0].lv,
          id:res.data[0]._id
        })
        console.log(that.data)
        //成功返回积分优惠券信息
        if(res.data==''){
          wx.cloud.database().collection('user').add({
            data:{
              pointNum:0,
              coupon:[],
              lv:0,
              exp:0
            }
          })
        }
      },
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.cloud.database().collection('user')
    .where({
      _openid:app.globalData.openid
    })
    .get({
      success:function(res){
        console.log('积分优惠信息',res.data)
        that.setData({
          point: res.data[0].pointNum,
          coupon:res.data[0].coupon,
          exp:res.data[0].exp,
          lv:res.data[0].lv,
          id:res.data[0]._id
        })
        console.log(that.data)
        //成功返回积分优惠券信息
        if(res.data==''){
          wx.cloud.database().collection('user').add({
            data:{
              pointNum:0,
              coupon:[],
              lv:0,
              exp:0
            }
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})