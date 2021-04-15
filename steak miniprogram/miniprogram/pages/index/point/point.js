// pages/index/point/point.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:[

    ],
    other:[

    ],
    selectedCoupon:[],
    userCoupon:[],
    pointNum:0  ,//积分
    //页面状态
    displayA: 'display:flex;',
    displayB: 'display:none;',
    displayC: 'display:none;',
    state1:'border-bottom: 4rpx red solid;',
    state2:'',
    state3:'',

  },
  openAll:function(){
    this.setData({
      state1:'border-bottom: 4rpx red solid;',
      state2:'',
      state3:'',
      displayA: 'display:flex;',
      displayB: 'display:none;',
      displayC: 'display:none;'
    })
  },
  openCoupon:function(){
    this.setData({
      state1:'',
      state2:'border-bottom: 4rpx red solid;',
      state3:'',
      displayA: 'display:none;',
      displayB: 'display:flex;',
      displayC: 'display:none;'
    })
  },
  openOther:function(){
    this.setData({
      state1:'',
      state2:'',
      state3:'border-bottom: 4rpx red solid;',
      displayA: 'display:none;',
      displayB: 'display:none;',
      displayC: 'display:flex;'
    })
  },
  //积分商城点击购买后的交互以及购买之后将其加入订单列表中
  templateClick:function(event){
    var that=this;
    var temp=event.currentTarget.dataset.point;
    var title=event.currentTarget.dataset.title;
    var pointNum=this.data.pointNum;
    console.log(this.data.pointNum,temp,title);
    //余额不足购买失败
    if(pointNum<temp){
      wx.showModal({
        title:'提示',
        content:'积分余额不足',
        showCancel:false,
      })
    //余额充足，可以购买
    }else{
      var pointNum=pointNum-temp;
      console.log('title is',title)
      wx.showModal({
        title: '提示',
        content:'确认购买？',
        success(res){
          if(res.confirm==true){
            wx.showToast({
              title: '购买成功'
            })
            var time=new Date().toLocaleDateString();//获取购买日期
            console.log(time)
            var selectedCouponLength=that.data.selectedCoupon.length;
            var _s='selectedCoupon['+selectedCouponLength+']';//获取已购买优惠券的列表长度
            var _c='userCoupon['+that.data.userCoupon.length+']';//获取用户目前拥有的优惠券列表长度
            //将本次购买的优惠券加到已购买优惠券列表和用户拥有的优惠券列表后面
            that.setData({
              pointNum:pointNum,
              [_s]:{title,time},
              [_c]:title
            });
            console.log('selectedCoupon is',that.data.selectedCoupon,'userCoupon is',that.data.userCoupon)
            //将完成购买后的已购买优惠券列表和用户拥有的优惠券列表上传到数据库进行信息更新
            wx.cloud.database().collection('user').doc(app.globalData.id).update({
              data:{
                pointNum: that.data.pointNum,
                boughtCoupon:that.data.selectedCoupon,
                coupon:that.data.userCoupon
              }
            })
          }
        }
      })
      
    }
  },
  buy:function(event){
    
  },
  openDetail:function(){
    wx.navigateTo({
      url: 'detail/detail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id is',app.globalData.id)
    var that=this;
    //获取积分商城的商品
    wx.cloud.database().collection('point-store')
    .get({
      success:function(res){
        console.log(res.data)
        that.setData({
          coupon:res.data[0].coupon,
          other:res.data[0].other
        })
      }
    })
    wx.cloud.database().collection('user').where({
      _openid:app.globalData.openid
    })
    .get({
      success:function(res){
        console.log('获取到的用户信息为',res)
        var pointNum=res.data[0].pointNum;
        var selectedCoupon=res.data[0].boughtCoupon;
        var userCoupon=res.data[0].coupon;
        that.setData({
          pointNum:pointNum,
          selectedCoupon:selectedCoupon,
          userCoupon:userCoupon
        })
        console.log('data中的pointNum为',that.data.pointNum)
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