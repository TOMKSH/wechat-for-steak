const db=wx.cloud.database();
var app=getApp();
Page({
  data:{
    userCoupon:[]
  },
  onLoad:function(){
    var that=this;
    db.collection('user').where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        that.setData({
          userCoupon:res.data[0].boughtCoupon
        })
        console.log(that.data.userCoupon)
      }
    })
  }
})
