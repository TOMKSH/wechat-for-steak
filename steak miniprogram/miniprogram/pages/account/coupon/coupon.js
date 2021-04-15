// pages/account/coupon/coupon.js
const db=wx.cloud.database();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:[]
  },
  //跳转到二维页面
  toCouponDetail:function(e){
    var title=e.currentTarget.dataset.title;
    var index=e.currentTarget.dataset.index;
    console.log('show title:',title)
    wx.navigateTo({
      url: './couponDetail/couponDetail?title='+title+'&index='+index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    //读取数据库中的user集合中的coupon来获取用户所拥有的优惠券
    db.collection('user').where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        console.log(res.data[0].coupon);
        that.setData({
          coupon:res.data[0].coupon
        })
      }
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