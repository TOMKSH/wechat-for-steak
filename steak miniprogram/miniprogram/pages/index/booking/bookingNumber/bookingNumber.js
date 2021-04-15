// pages/index/booking/bookingNumber/bookingNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:null,
    type:null
  },
  //返回首页
  backToIndex:function(){
    wx.switchTab({
      url: '../../../../pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type=options.type;
    this.setData({
      type:type
    })
    var that=this;
    //用户选好就餐人数后，将其加入数据库中进行排队
    wx.cloud.database().collection('booking').add({
      data:{
        type:options.type
      }
    })
    //获取不同类型的就餐人数的队列长度
    wx.cloud.database().collection('booking').where({
      type:type
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          number:res.data.length
        })
      }
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