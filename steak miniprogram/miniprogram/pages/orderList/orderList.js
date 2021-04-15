// 用户订单页
var app=getApp();
const db=wx.cloud.database();
Page({
  data: {
    orderList:[]
  },
  toOrder:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  onShow:function(){
    var openid=app.globalData.openid;
    var that=this;
    db.collection('list').where({
      _openid:openid
    })
    .get({
      success:function(res){
        console.log(res)
        that.setData({
          orderList:res.data.reverse()
        })
        console.log('orderList is',that.data.orderList)
      }
    })
  }
})
