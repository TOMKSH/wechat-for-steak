// pages/index/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {title:'1~2人',checked:false,type:'A' },
      {title:'3~4',checked:false,type:'B' },
      {title:'5人以上',checked:false,type:'C' }
    ],
    type:null
  },
  check:function(e){
    this.setData({
      items:[
        {title:'1~2人',checked:false,type:'A'},
        {title:'3~4',checked:false,type:'B'},
        {title:'5人以上',checked:false,type:'C'}
      ]
    })
    var index=e.currentTarget.dataset.index;
    var type=e.currentTarget.dataset.type;
    var checkeditem=this.data.items;
    var _t='items['+index+'].checked';
    this.setData({
      [_t]:true,
      type:type
    })
  },
  toBookingNumber:function(){
    var type=this.data.type;
    wx.navigateTo({
      url: '../booking/bookingNumber/bookingNumber?type='+type,
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