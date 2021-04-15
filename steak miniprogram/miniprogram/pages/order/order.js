// pages/order/order.js

Page({
  data: {
    openid:'',//用户的Openid
    scrollTop:0,//用于获取右边滚动菜单的scrollTop值
    top:"top:300rpx;",
    toView:"",//用于实现点击左边菜单类型按钮，右边滚动菜单就滚动到相应的位置
    display: "none",//用于控制点击‘规格’按钮之后是否实现规格页面
    display1:'none',//用于控制“已点清单”是否显示，点击小红点则显示，否则隐藏
    display2:'',//用于控制“小红点”的样式
    number:1,//用于获取用户选择商品数量的多少
    allPrice:0,//用于计算用户加入购物车的总价格
    index:0,//用于获取所点击的规格按钮属于该类型商品中的第几项目（从0开始）
    proIndex:0,
    stand:[],
    setMealPrice:[53,53,20,14,14],
    hoverStayTime:0,
    goodsProperty1:[],//当前用户所打开的规格页面的商品基本信息
    goodsProperty2:{},//当前用户所打开的规格页面的商品规格属性信息
    smallList:{},//菜单类型清单
    stapleFood:{},//主食类型商品清单
    snack:{},//小吃类型商品清单
    setMeal:{},//套餐类型商品清单
    mikeTea:{},//奶茶类型商品清单
    fruitTea:{},//果茶类型商品清单
    commend:{},//推荐商品清单
    standardImage:"",
    goodsStandard:{},//商品规格属性清单
    selectedList:[], //用户已选择的商品清单
    selectedListLength:0//用户已选择的商品清单长度
  },
  // 加入购物车事件
  addShop:function(event){
    const data=event.currentTarget.dataset;
    let type=this.data.goodsProperty1.type;
    console.log('type is ',type)
    let selectedList=this.data.selectedList;
    let length=selectedList.length;
    let stand=this.data.stand;
    let name=this.data.goodsProperty1.name;
    let aPrice=this.data.goodsProperty1.price;
    let allPrice=this.data.allPrice;
    console.log(allPrice)
    let num=data.num;
    if(num==0){
      wx.showModal({
        title:'提示',
        content:'请选择数量',
        cancelColor: '#000000',
        showCancel:false
      })
      console.log('hello')
      return ;
    }
    for(let i=0;i<length+1;i++){
      if(selectedList[i]==undefined){
        allPrice=allPrice+aPrice*num;
        console.log(allPrice)
        this.setData({
          allPrice:allPrice
        })
        selectedList[i]={name,aPrice,num,type,stand};
        wx.showToast({
          title: '加入购物车成功',
          duration: 1200
        })
        this.cancelStandardView();
      }
    }
    this.setData({
      selectedList:selectedList,
      selectedListLength:selectedList.length
    })
    console.log('selectedList为：',selectedList,'清单长度为:',this.data.selectedListLength);
  },
  getproIndex:function(e){
    let proIndex=e.currentTarget.dataset.proIndex;
    this.setData({
      proIndex:proIndex
    })
    console.log("proIndex为",this.data.proIndex)
  },
  // 商品属性选择事件
  select:function(event){
    let target=event.currentTarget.dataset;
    var proIndex=this.data.proIndex;
    var index=target.index;//获取点击的是哪个按钮
    var selected=target.selected;
    var items=target.items;
    var length=target.length;
    var _t='stand['+proIndex+']';
    var _p='setMealPrice['+proIndex+']';
    console.log("index是",index,'selected是',selected,'items是',items,'length是',length,'proIndex是',proIndex)
    var standard=this.data.goodsProperty2[proIndex]._standard;
    console.log('standard为',standard)
    for(let i=0;i<length;i++){
      var t='goodsProperty2['+proIndex+']._standard['+i+'].selected';
      if(index==i){
        this.setData({
          [t]:true
        })
        console.log('已完成选择按钮的样式布置')
      }else{
        this.setData({
          [t]:false
        })
        console.log('已经去除了其他按钮的样式')
      }
    }
    this.setData({
      [_t]:items.value
    })
    if(items.price){
      var proLength=this.data.goodsProperty2.length;
      var P=0;
      this.setData({
        [_p]:items.price
      })
      var setMPrice=this.data.setMealPrice;
      console.log(setMPrice,proLength)
      for(let i=0;i<proLength;i++){
        P=P+setMPrice[i]
      }
      console.log(P)
      var setPrice='goodsProperty1.price'
      this.setData({
        [setPrice]:P
      })
    }
    console.log('已经选取的商品规格stand[]为',this.data.stand)
  },
  // 商品数量减按钮
  subNum:function(){
    let num=this.data.number;
    if(num==0){
      this.setData({
        number:0
      })
    }else{
      num--;
      this.setData({
        number:num
      })
    }
  },

  // 商品数量加按钮
  addNum:function(){
    let num=this.data.number;
    num++;
    this.setData({
      number:num
    })
  },

  // 左边商品类型选择栏，实现菜单跳转以及按钮的样式变化
  scrollTo:function(e){
    let length=this.data.smallList.length;
    let index=e.currentTarget.dataset.index;
    let to=e.currentTarget.dataset.to;
    for(let i=0;i<length;i++){
      let _t='smallList['+i+'].selected';
      if(i==index){
        this.setData({
          toView:to,
          [_t]:0
        })
      }else{
        this.setData({
          [_t]:1
        })
      }
    }
  },

  //用来判断目前scrollView处于那个区间
  scrollTop_s(top){
    let scrollTop=top;
    let index;
    console.log("调用scrollTop_s成功",scrollTop)
      switch(true){
        case scrollTop<335: index=0;console.log('index为：',index);break;
        case scrollTop<981: index=1;console.log('index为：',index);break;
        case scrollTop<1472: index=2;console.log('index为：',index);break;
        case scrollTop<2272: index=3;console.log('index为：',index);break;
        case scrollTop<2600: index=4;console.log('index为：',index);break;
        case scrollTop>2600: index=5;console.log('index为：',index);break;
      }
      return index;
  },

  // 对smallList按钮的状态进行改变
  smallListChange(index){
    let _index=index;
    let length=this.data.smallList.length;
    console.log("调用smallListChange成功,_index:",_index)
    for(let i=0;i<length;i++){
      let _t='smallList['+i+'].selected';
      if(i==_index){
        this.setData({
          [_t]:0
        })
        console.log('hello')
      }else{
        this.setData({
          [_t]:1
        })
        console.log('no')
      }
    }
   },
   //右边菜单栏滚动结束后获取坐标，并实现smallList按钮状态随之改变
  scrollEnd:function(e){
    let top=parseInt(e.detail.scrollTop);
    let scrollTop=this.data.scrollTop;
    this.setData({
      scrollTop:top
    })
    console.log(scrollTop);
    let index=this.scrollTop_s(scrollTop);
    console.log(index)
    this.smallListChange(index);
  },
  // 打开商品规格属性页面
  openStandardView:function(e){
    let index=e.currentTarget.dataset.index;
    let items=e.currentTarget.dataset.items;
    let image=e.currentTarget.dataset.image;
    let _s=e.currentTarget.dataset.standard;
    let goodsStandard='';
    console.log("items.type为:",items.type,'_s为:',_s)
    switch(items.type){
      case 'staple':goodsStandard=_s[0].standard;break;
      case 'fruitTea':
      case 'mikeTea':goodsStandard=_s[1].standard;break;
      case 'setMeal2':
      case 'setMeal1':goodsStandard=_s[2].standard;break;
      case '_setMeal1':goodsStandard=_s[3].standard;break;
    }
    console.log('商品数据、goodsProperty1为:',items,'规格数据:',goodsStandard)
    this.setData({
      display: "",
      display1:'none',
      display2:'',
      index:index,
      standardImage:image,
      goodsProperty1:items,
      goodsProperty2:goodsStandard
    })
    console.log('点击规格按钮后，goodsProperty2为：',this.data.goodsProperty2)
  },
  // 关闭商品规格属性页面
  cancelStandardView:function(){
    this.setData({
      display:"none",
      number:1,
      stand:[]
      
    })
  },
  //打开已点订单页
  openSelectedList:function(){
    this.setData({
      display1:'',
      display2:'height: 400rpx;top: -360rpx'
    })
  },
  //关闭已点订单页
  cancelSelectedList:function(){
    this.setData({
      display1:'none',
      display2:''
    })
  },
  //删除一个订单
  deleteList:function(e){
    var index=e.currentTarget.dataset.index;
    var price=e.currentTarget.dataset.aprice;
    var selectedList=this.data.selectedList;
    var allPrice=this.data.allPrice;
    console.log('allprice',allPrice)
    console.log(price)
    var _allPrice=allPrice-price;
    console.log('_allPrice',_allPrice)
    selectedList.splice(index,1);
    this.setData({
      selectedList:selectedList,
      allPrice:_allPrice,
      selectedListLength:selectedList.length
    })
  },
  // 打开订单详情页面
  openOrderDetail:function(event){
    var selectedList=this.data.selectedList;
    console.log('selectedList is',selectedList)
    wx.setStorage({
      data: selectedList,
      key: 'selectedList',
    })
    wx.navigateTo({
      url: '/pages/order/orderDetail/orderDetail',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品类型数据库
    wx.cloud.database().collection('goods-type').get()
    .then(res=>{
      console.log('请求商品类型数据库成功',res)
      this.setData({
        smallList:res.data
      })
    })
    .catch(err=>{
      console.log('请求商品类型数据库失败',err)
    })
    // 获取主食数据库
    wx.cloud.database().collection('staple-food').get()
    .then(res=>{
      console.log('请求主食数据库成功',res)
      this.setData({
        stapleFood:res.data
      })
    })
    .catch(err=>{
      console.log('请求主食数据库失败',err)
    })
    
    // 获取商品属性数据库
    wx.cloud.database().collection('goods-standard').get()
    .then(res=>{
      console.log('获取商品属性数据库成功',res)
      this.setData({
        goodsStandard:res.data
      })
      console.log(this.data.goodsStandard)
    })
    .catch(err=>{
      console.log('获取商品属性数据库失败',err)
    })
    
    //获取小吃数据库
    wx.cloud.database().collection('snack').get()
    .then(res=>{
      console.log('请求小吃数据库成功',res)
      this.setData({
        snack:res.data
      })
    })
    .catch(err=>{
      console.log('请求小吃数据库失败',err)
    })
    
    //获取套餐数据库
    wx.cloud.database().collection('set-meal').get()
    .then(res=>{
      console.log('请求套餐数据库成功',res)
      this.setData({
        setMeal:res.data
      })
    })
    .catch(err=>{
      console.log('请求套餐数据库失败',err)
    })
    
    //获取奶茶数据库
    wx.cloud.database().collection('mike-tea').get()
    .then(res=>{
      console.log('请求奶茶数据库成功',res)
      this.setData({
        mikeTea:res.data
      })
    })
    .catch(err=>{
      console.log('请求奶茶数据库失败',err)
    })
    
    //获取果茶数据库
    wx.cloud.database().collection('fruit-tea').get()
    .then(res=>{
      console.log('请求果茶数据库成功',res)
      this.setData({
        fruitTea:res.data
      })
    })
    .catch(err=>{
      console.log('请求果茶数据库失败',err)
    })
    
    //获取推荐数据库
    wx.cloud.database().collection('commend').get()
    .then(res=>{
      console.log('请求推荐数据库成功',res)
      this.setData({
        commend:res.data
      })
    })
    .catch(err=>{
      console.log('请求推荐数据库失败',err)
    })
    //获取openid 
    var openid=getApp().globalData.openid;
    console.log('openid为',openid)
    this.setData({
      openid:openid
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