// pages/account/coupon/couponDetail/couponDetail.js
import drawQrcode from '../../../../utils/weapp.qrcode.min'
// 或者，将 dist 目录下，weapp.qrcode.min.js 复制到项目目录中
// import drawQrcode from '../../utils/weapp.qrcode.min.js'
const db=wx.cloud.database();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponTitle:null,
    index:null,
    openQR:false,
    coupon:[]
  },
  //打开二维码
  openQR:function(){
    var that=this;
    wx.showModal({
      title:'提示',
      content:'是否确定使用该优惠券，点击确定后将视为确定使用，将无法退回',
      success:function(res){
        if(res.confirm==true){
          var index=that.data.index,coupon=that.data.coupon;
          coupon.splice(index,1);
          that.setData({
            openQR:true,
            coupon:coupon
          })
          console.log(coupon);
          db.collection('user').where({
            _openid:app.globalData.openid
          }).update({
            data:{
              coupon:coupon
            },
            success:function(res){
              console.log(res)
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.showLoading({
      title: '全力加载中',
      mask:true
    }),
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {},
      })
    }, 1000);
    console.log(options.title)
    that.setData({
      couponTitle:options.title,
      index:options.index
    })
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: that.data.couponTitle
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