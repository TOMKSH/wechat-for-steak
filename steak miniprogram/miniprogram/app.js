// app.js
App({
  globalData: {
    userInfo:{},
    id:0,
    openid:0
},

  onLaunch() {
    var that=this;
    //初始化云开发能力
    if(!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        env:'ksh-env-0gjghrl38eede52f',
        traceUser:true,
      })
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功',res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              console.log('获取到的用户信息为','userInfo is',that.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取openid
    wx.cloud.callFunction({
      name: 'openapi',
      complete:res=>{
        that.globalData.openid=res.result.openid;
        console.log('app.js:获取到的openid是','openid is',that.globalData.openid)
         //获取用户信息的数据信息的_id
        wx.cloud.database().collection('user').where({
          _openid:that.globalData.openid
        }).get({
          success:function(res){
            that.globalData.id=res.data[0]._id
            console.log("_id is",res.data[0]._id)
            console.log('全局变量id(用于标记user数据库的每个用户的标志）为',that.globalData.id)
          }
        })
      }
    })

  },

})

