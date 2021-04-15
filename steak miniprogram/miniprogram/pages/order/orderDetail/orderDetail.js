// pages/order/orderDetail/orderDetail.js
const db=wx.cloud.database();
var app=getApp();
console.log(app.globalData.id)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    allPrice:'',
    boughtCupNumber:0
  },
  //确定点单按钮的功能函数
  order: function(){
    var that=this;
    console.log(this.data.list)
    var list=that.data.list;
    var listLength=list.length;
    var number_b=that.data.boughtCupNumber;
    for(let x=0;x<listLength;x++){
      if(list[x].type=='mikeTea'||list[x].type=='fruitTea'){
        number_b=number_b+list[x].num;
        db.collection('user').where({
          _openid:app.globalData.openid
        }).update({
          data:{
            boughtCup:number_b
          },
          success:function(res){
            console.log(res)
          }
        })
      }
    }
    db.collection('list').add({
      data:{
        orderDetail:this.data.list,
        allPrice:this.data.allPrice,
        date:new Date().toLocaleDateString()
      },
      success:function(res){
        console.log(res)
          //用于下单后更新user数据库的功能函数
        db.collection('user').doc(app.globalData.id).get({
          success:function(res){
            console.log('成功get到user数据库',res.data)
            var user=res.data;
            var allPrice=that.data.allPrice;
            var exp=(user.exp+allPrice)%100;
            var lv=user.lv+Math.floor(allPrice/100);
            var pointNum=user.pointNum+allPrice;
            db.collection('user').doc(app.globalData.id).update({
              data:{
                exp:exp,
                lv:lv,
                pointNum:pointNum
              },
              success:function(res){
                wx.showLoading({
                  title: '下单中',
              
                })
                setTimeout(() => {
                  wx.hideLoading({
                    success: (res) => {
                      wx.showToast({
                        title: '下单完成',
                        success:function(){
                          wx.switchTab({
                            url: '../../orderList/orderList',
                          })
                        }
                      })
                    },
                  })
                }, 2000);
               
              }
            })
          }
        })
      
      }
    })
   
  },
  //继续点单按钮的功能函数
  backToOrder:function(){
    wx.navigateBack({
      delta:1,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'selectedList',
      success:function(res){
        console.log(res);
        that.setData({
          list:res.data
        })
        console.log("list is",that.data.list)
        var allPrice=0;
        for(let i=0;i<that.data.list.length;i++){
          let _list=that.data.list;
          allPrice=allPrice+_list[i].num*_list[i].aPrice;
        }
        console.log("all is",allPrice)
        that.setData({
          allPrice:allPrice
        })
      }
    })
    db.collection('user').where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        that.setData({
          boughtCupNumber:res.data[0].boughtCup
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