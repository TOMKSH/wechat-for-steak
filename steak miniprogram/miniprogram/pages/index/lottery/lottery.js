var time = null;//setTimeout的ID，用clearTimeout清除
var app=getApp();
var db=wx.cloud.database();
Page({
  data: {
    box: [{
        name: '10元优惠券/满80可用',value:1
    }, {
        name: '10元优惠券/满100可用',value:2
    }, {
        name: '20元优惠券/满50可用',value:3
    }, {
        name: '20元优惠券/满80可用',value:4
    }, {
        name: '20元优惠券/满100可用',value:5
    }, {
        name: '30元优惠券/满90可用',value:6
    }, {
        name: '30元优惠券/满120可用',value:7
    }, {
        name: '30元优惠券/满150可用',value:8
    }, {
        name: '35元优惠券/满120可用',value:9
    }, {
        name: '35元优惠券/满150可用',value:10
    }, {
        name: '45元优惠券/满150可用',value:11
    }, {
        name: '50元优惠券/满150可用',value:12
    }],
    recordBox:[

    ],
    luckynum:0,//当前运动到的位置，在界面渲染
    howManyNum:10,//抽奖的剩余次数
    content:{
      index: 0,    //当前转动到哪个位置，起点位置
      count: 0,    //总共有多少个位置
      speed: 50,    //初始转动速度
      cycle: 3*12,    //转动基本次数：即至少需要转动多少次再进入抽奖环节，这里设置的是转动三次后进入抽奖环节
    },
    prize:0,//中奖的位置
    luckytapif:true,//判断现在是否可以点击
    displayA:'none',//兑换抽奖机会页面display控制
    displayB:'none',//中奖记录页面display控制
    lotteryNum:0
  },
  //点击抽奖
  luckyTap:function(){
    var i=0,
        that=this,
        howManyNum = this.data.howManyNum,//剩余的抽奖次数
        luckytapif = this.data.luckytapif,//获取现在处于的状态
        luckynum = this.data.luckynum,//当前所在的格子
        prize =Math.floor(Math.random()*12) ;//中奖序号,随机生成
    if (luckytapif && howManyNum>0){//当没有处于抽奖状态且剩余的抽奖次数大于零，则可以进行抽奖
      console.log('prize:'+prize);
      this.data.content.count=this.data.box.length;
      this.setData({
        howManyNum:howManyNum-1//更新抽奖次数
      });
      this.data.luckytapif=false;//设置为抽奖状态
      this.data.prize = prize;//中奖的序号
      this.roll();//运行抽奖函数
    } else if (howManyNum == 0 && luckytapif){
      wx.showModal({
        title: '',
        content: '您的抽奖次数已经没有了',
        showCancel:false
      })
    }
  },
//抽奖
  roll:function(){
    var that=this;
    var content=this.data.content,
      prize = this.data.prize,//中奖序号
      that=this;
    if (content.cycle - (content.count-prize)>0){//最后一轮的时间进行抽奖
      content.index++;
      content.cycle--;
      this.setData({
        luckynum: content.index%12  //当前应该反映在界面上的位置
      });
      setTimeout(this.roll, content.speed);//继续运行抽奖函数
    }else{
      if (content.index < (content.count*3 + prize)){//判断是否停止

        content.index++;  
        content.speed += (550 /12);//最后一轮的速度，匀加速，最后停下时的速度为550+50
        this.data.content=content;
        this.setData({
          luckynum: content.index % 12
        });
        console.log(content.index, content.speed);//打印当前的步数和当前的速度
        setTimeout(this.roll,content.speed);
      }else{
        //完成抽奖，初始化数据
        console.log('完成');
        content.index =0;
        content.cycle = 3 * 12;
        content.speed = 50;
        this.data.luckytapif = true;
        this.data.lotteryNum++;
        this.data.recordBox[this.data.recordBox.length]=that.data.box[prize].name;
        var recordBox=this.data.recordBox;
        this.setData({
          recordBox:recordBox
        });
        console.log(this.data.recordBox,this.data.lotteryNum);
        //将获取的优惠券加入到数据库中
        db.collection('user').doc(app.globalData.id).get({
          success:function(res){
            var coupon=res.data.coupon;
            var recordBox=coupon.recordBox;
            var howManyNum=coupon.howManyNum;
            var length=coupon.length;
            coupon[length]=that.data.box[prize].name;
            db.collection('user').doc(app.globalData.id).update({
              data:{
                coupon:coupon,
                howManyNum:that.data.howManyNum,
                recordBox:that.data.recordBox
              }
            })
          }
        })
        clearTimeout(time);
        wx.showModal({
          title: '',
          content: '恭喜你抽到了'+that.data.box[prize].name,
          showCancel:false
        })
      }
    }
  },
  openExchange:function(){
    this.setData({
      displayA:""
    })
  },
  cancelView:function(){
    this.setData({
      displayA:"none",
      displayB:"none"
    })
  },
  openRecord:function(){
    this.setData({
      displayB:""
    })
  },
  //积分交换抽奖机会
  exchangePoint:function(){
    var pointNum=this.data.pointNum,
        howManyNum=this.data.howManyNum,
        point=pointNum-10;
        db.collection('user').doc(app.globalData.id).update({
          data:{
            pointNum:point,
            howManyNum:howManyNum+1
          }
        })
    this.setData({
      pointNum:point,
      howManyNum:howManyNum+1
    })
    console.log(pointNum,howManyNum);
    this.cancelView();
  },
  onLoad: function (options) {
    var that=this;
    db.collection('user').doc(app.globalData.id).get({
      success:function(res){
        var point=res.data.pointNum;
        var howManyNum=res.data.howManyNum;
        var recordBox=res.data.recordBox;
          that.setData({
            pointNum:point,
            howManyNum:howManyNum,
            recordBox:recordBox
          })
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  }
})