// pages/associatorAct/associatorArt.js
const db=wx.cloud.database();
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    underwayColor: "white",
    finishedColor:"teal",
    display1:"",
    display2:"none",
    total:8,
    num:0,
    missionCoupon:[]
  },
  click1:function(){
    this.setData({
      underwayColor: "white",
      finishedColor:"teal",
      display1:"",
      display2:"none"
    })
  },
  click2:function(){
    this.setData({
      underwayColor: "teal",
      finishedColor:"white",
    })
  },
  //实现领取优惠券功能
  getCoupon:function(e){
    var that=this;
    wx.showModal({
      title:'提示',
      content:"确定领取？",
      success:function(s){
        if(s.confirm==true){
          var index=e.currentTarget.dataset.index;
          var _t='missionCoupon['+index+'].get';
          that.setData({
            [_t]:true
          })
          db.collection('user').doc(app.globalData.id).get({
            success:function(r){
              var coupon=r.data.coupon;
              var length=r.data.coupon.length;
              console.log(length,index,that.data.missionCoupon)
              coupon[length]=that.data.missionCoupon[index].title;
              db.collection('user').doc(app.globalData.id).update({
                data:{
                  cupCollected:that.data.missionCoupon,
                  coupon:coupon
                }
              })
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
    var that = this;
     //读取数据
    db.collection('user').where({
      _openid:app.globalData.openid
    })
    .get({
      success:function(res){
        var boughtCup=res.data[0].boughtCup;//获取用户已购买的饮料杯数
        var finishedMissionNum=Math.floor(boughtCup/8);//获取用户已购买的饮料杯数可以换取的优惠券数目
        var cupCollectedLength=res.data[0].cupCollected.length;//获取用户已换取的优惠券列表的长度
        var num=that.data.num;
        num=boughtCup%8;//目前任务进度
        that.setData({
          num:num
        })
        var data={
          total:that.data.total,
          num:that.data.num
        }
        that.drawCircleBg('activeCanvas',data);//显示任务进度
        var missionCoupon=[];
        var title='10元代金券';
        var get=false;
        var time=new Date().toLocaleDateString();
        //用户获得新的优惠券后
        if(finishedMissionNum>cupCollectedLength){
          //获取用户已完成任务获取的优惠券列表
          db.collection('user').doc(app.globalData.id).get({
            success:function(c){
              console.log(c)
              missionCoupon=c.data.cupCollected;
              console.log(missionCoupon)
          //在用户的优惠券列表尾部加上新获取的优惠券
          for(let x=cupCollectedLength;x<finishedMissionNum;x++){
            missionCoupon[x]={title,time,get}
          }
          console.log(missionCoupon)
          //更新用户的优惠券列表
          db.collection('user').doc(app.globalData.id).update({
            data:{
              cupCollected:missionCoupon
            },
            success:function(a){
              db.collection('user').doc(app.globalData.id).get({
                success:function(b){
                that.setData({
                  missionCoupon:b.data.cupCollected
                })
                }
              })
            }
          })
            }
          })
          //用户没有获取新的优惠券，直接读取目前用户的优惠券列表
        }else{
          db.collection('user').doc(app.globalData.id).get({
            success:function(res){
              that.setData({
                missionCoupon:res.data.cupCollected
              })
            }
          })
        }
      }
    })
  },
  //绘制浅蓝色圆形背景
  drawCircleBg: function (prefix, data) {
    var that = this;
    //创建并返回绘图上下文context对象。
    let cxt_arc = wx.createCanvasContext(prefix);
    cxt_arc.lineWidth=8; //线条的宽度
    cxt_arc.strokeStyle="#51cfff";//边框颜色
    cxt_arc.lineCap="round";
    cxt_arc.beginPath();
    // 参数分别：圆心的x坐标；圆心的y坐标；圆半径；起始弧度，单位弧度（在3点钟方向）；终止弧度；弧度的方向是否是逆时针
    cxt_arc.arc(150, 150, 80, 0, 2 * Math.PI, false);//创建一条弧线
    cxt_arc.stroke(); //对当前路径进行描边
    cxt_arc.draw();
    that.drawCirclePg(prefix, data);
  },
  //绘制蓝色进度条
  drawCirclePg: function (prefix, data) {
    console.log(data);
    var that = this;
    //创建并返回绘图上下文context对象。
    let cxt_arc = wx.createCanvasContext(prefix + '_p');
    var value = (data.num / data.total) * 2;
    console.log(value);
    cxt_arc.lineWidth=9;
    cxt_arc.strokeStyle='#ffffff';
    cxt_arc.lineCap='round';
    cxt_arc.beginPath();
    cxt_arc.arc(150, 150, 80, -0.5 * Math.PI, Math.PI * (value - 0.5), false);
    cxt_arc.stroke();
    cxt_arc.draw();
 
 
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