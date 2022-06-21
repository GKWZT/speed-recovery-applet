// pages/recycle/recycle.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      checkPaperColor:"#eaeaea",
      checkClothesColor:"#eaeaea",
      checkMetalColor:"#eaeaea",
      checkPlasticColor:"#eaeaea",
      checkEleAppColor:"#eaeaea",
      addressInfo:{
      },
      choiceTenColor:"#27ce8b",
      choiceTenTextColor:"#f8f8f8",
      choiceTwentyColor:"#f8f8f8",
      choiceTwentyTextColor:"#000000",
      choiceFiftyColor:"#f8f8f8",
      choiceFiftyTextColor:"#000000",
      choiceHundredColor:"#f8f8f8",
      choiceHundredTextColor:"#000000",
      choiceMoneyText:"10元-30元",
      chocieCreditText:"10-20",
      recycleClass:[0,0,0,0,0],
      takeOrderData:{
        "recycleClass":[0,0,0,0,0],
        "recycleWeight":'10-20公斤',
        "recycleAddress":'',
        "recycleCredit":'',
        "orderId":'',
        "isCancel": false,
        "orderWaitMessage":'等待回收员确认上门时间',
        "takeOrderTime":'',
        "cancleOrderTime":'',
        "cancelReason":'',
      },
      takeOrderDataList:[],
      takeOrderTimes:0
    },

    // 计算积分
    calCredit:function(n, m){
      var randomCredit = Math.floor(Math.random()*(m-n+1)+n);
      return randomCredit;
    },

  //半小时后才能下单
  timecount:function(){
    let that = this
    setTimeout(function(){
      that.setData({
        takeOrderTimes:0
      })
    },30000);
  },


    

    //下单
    takeOrder:function(){
      // 20220526163426452356
      // 获取年月日
      var id = "";
      var date = new Date();
      date.toLocaleString();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      if(month < 10){
        month = "0"+month;
      }
      var day = date.getDate();
      if(day < 10){
        day = "0"+day;
      }
      var id = year+month+day;
      var num = "";
      for(var i = 0; i < 12;i++){
        num+=Math.floor(Math.random()*10);
      }
      id = id+num;
      // 时间
      var hour = date.getHours();
      if(hour<10){
        hour = "0"+hour;
      }
      var min = date.getMinutes();
      if(min<10){
        min = "0"+min;
      }
      var second = date.getSeconds();
      if(second<10){
        second = "0"+second;
      }
      var takeOrderTime = year+"-"+month+"-"+day+" "+hour+":"+min+":"+second;


      //设置recycleClass和addressInfo以及takeOrderTime数据
      this.setData({
        'takeOrderData.recycleClass':this.data.recycleClass,
        'takeOrderData.recycleAddress':this.data.addressInfo,
        'takeOrderData.orderId': id,
        'takeOrderData.takeOrderTime':takeOrderTime
      })
      console.log(this.data.takeOrderData)
      // 回收种类数组
      var arr = this.data.takeOrderData.recycleClass;
      // console.log(arr)
      // 回收种类总数
      var totalZero = 0;
      //有多少个回收种类
      for(var i = 0;i < arr.length;i++){
        if(arr[i] === 0){
          totalZero = totalZero+1;
          // console.log(arr[i])
        }
      }
      

      // console.log(totalZero)
      // 如果没有选择回收种类，那么让用户选择
      if(totalZero >= 5){
        wx.showModal({
          title:'请选择回收品类'
        })
      }else{
        // 设置用户下单次数
        if(this.data.takeOrderTimes>=1){
          wx.showModal({
            title:'请勿重新下单，下单间隔半小时'
          })
          // 计时器
          this.timecount();
        }
        else{
          
          wx.showToast({
            title: '下单成功',
          })

          
          wx.requestSubscribeMessage({
            tmplIds: ['你自己的temId'],
            success (res) { 
              // console.log("用户已授权");
              // console.log(res);
              var address = that.data.addressInfo.cityName+that.data.addressInfo.countyName;
              if (res['你自己的temId'] == 'accept') {
                wx.cloud.callFunction({
                  name: 'orderData',
                  // config: {
                  //   env: 'lds-1g62fppd434581c9'
                  // },
                 
                  data: {
                    data1: that.data.addressInfo.userName,
                    data2: that.data.addressInfo.telNumber,
                    data3: that.data.takeOrderData.orderId,
                    data4: address,
                    data5: '上门回收前打电话',
                    templateId: '你自己的temId',
                  },
                }).then(res =>{
                  console.log(res.result);
                })
              }
            }
          })

          

          


          


          
          // 使用云函数的方式

          const that = this


          
            wx.cloud.init({
              env:'你自己的env'
            })
          


          wx.cloud.database().collection("takeOrderData").add({
            data:{
              recycleClass:that.data.recycleClass,
              recycleAddress:that.data.addressInfo,
              orderId: id,
              recycleCredit:that.data.takeOrderData.recycleCredit,
              recycleWeight:that.data.takeOrderData.recycleWeight,
              isCancel: false,
              orderWaitMessage:'等待回收员确认上门时间',
              takeOrderTime:that.data.takeOrderData.takeOrderTime
            }
          })

        }

        // 禁止重复下单   ！！！ 写一个半小时的计时器
        this.setData({
          takeOrderTimes:this.data.takeOrderTimes+1
        })

        
        

      }




      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    checkedPaper: function(){
      if((this.data.checkPaperColor)===("#ffa508")){
        this.setData(
        {
          checkPaperColor:"#eaeaea",
        },
        this.data.recycleClass[0]=0
        )
      }else{
        this.setData(
        {
          checkPaperColor:"#ffa508"
        },
        this.data.recycleClass[0]=1
        )
      }
      
      // console.log(this.data.takeOrderData.recycleClass)
    },
    checkedClothes: function(){
      if((this.data.checkClothesColor)===("#ffa508")){
        this.setData(
        {
          checkClothesColor:"#eaeaea"
        },
        this.data.recycleClass[1]=0
        )
      }else{
        this.setData(
        {
          checkClothesColor:"#ffa508"
        },
        this.data.recycleClass[1]=1
        )
      }
    },
    checkedMetal: function(){
      if((this.data.checkMetalColor)===("#ffa508")){
        this.setData(
        {
          checkMetalColor:"#eaeaea"
        },
        this.data.recycleClass[2]=0
        )
      }else{
        this.setData(
        {
          checkMetalColor:"#ffa508"
        },
        this.data.recycleClass[2]=1
        )
      }
    },

    checkedPlastic: function(){
      if((this.data.checkPlasticColor)===("#ffa508")){
        this.setData(
        {
          checkPlasticColor:"#eaeaea"
        },
        this.data.recycleClass[3]=0
        )
      }else{
        this.setData(
        {
          checkPlasticColor:"#ffa508"
        },
        this.data.recycleClass[3]=1
        )
      }
    },
    checkedEleApp: function(){
      if((this.data.checkEleAppColor)===("#ffa508")){
        this.setData(
        {
          checkEleAppColor:"#eaeaea"
        },
        this.data.recycleClass[4]=0
        )
      }else{
        this.setData(
        {
          checkEleAppColor:"#ffa508"
        },
        this.data.recycleClass[4]=1
        )
        var EleAppisSelected = true;
      }
    },
    Address:function(){
      wx.chooseAddress({
        // 成功之后，把所有数据存放在addressInfo里，在wxml中调用
        success: res => {
            this.setData({
                "takeOrderData.recycleAddress": res
            })
            console.log("data",res)
            app.globalData.addressInfo = res;
            console.log("address:",app.globalData.addressInfo)
        },
        // 接口返回失败信息，打印在控制台中
        fail: err => {
            console.log(err)
        }
        })
    },
    setAddrInfo:function(e){
      const eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
          delta:1,
          success:function(){
            eventChannel.emit('getData',addressInfo)
          }
        });
      },
    choiceTen:function(){
      console.log("choiceTen");
      this.setData({
        choiceTenColor:"#27ce8b",
        choiceTenTextColor:"#f8f8f8",
        choiceTwentyColor: "#f8f8f8",
        choiceTwentyTextColor:"#000000",
        choiceFiftyColor: "#f8f8f8",
        choiceFiftyTextColor: "#000000",
        choiceHundredColor: "#f8f8f8",
        choiceHundredTextColor: "#000000",
        choiceMoneyText:"10元-30元",
        chocieCreditText:"10-20"
      })
      var credit = this.calCredit(10,20)
      this.setData({
        'takeOrderData.recycleWeight':'10-20公斤',
        'takeOrderData.recycleCredit': credit
      })

    },
    choiceTwenty:function(){
      console.log()
      this.setData({
        choiceTwentyColor: "#27ce8b",
        choiceTwentyTextColor:"#f8f8f8",
        choiceTenColor:"#f8f8f8",
        choiceTenTextColor:"#000000",
        choiceFiftyColor: "#f8f8f8",
        choiceFiftyTextColor: "#000000",
        choiceHundredColor: "#f8f8f8",
        choiceHundredTextColor: "#000000",
        choiceMoneyText:"20元-75元",
        chocieCreditText:"20-50"
      })
      var credit = this.calCredit(20,50)
      this.setData({
        'takeOrderData.recycleWeight':'20-50公斤',
        'takeOrderData.recycleCredit': credit
      })
    },
    choiceFifty:function(){
      console.log("choiceFifty")
      this.setData({
        choiceFiftyColor: "#27ce8b",
        choiceFiftyTextColor: "#f8f8f8",
        choiceTenColor:"#f8f8f8",
        choiceTenTextColor:"#000000",
        choiceTwentyColor: "#f8f8f8",
        choiceTwentyTextColor:"#000000",
        choiceHundredColor: "#f8f8f8",
        choiceHundredTextColor: "#000000",
        choiceMoneyText:"50元-150元",
        chocieCreditText:"50-100",
      })
      var credit = this.calCredit(50,100)
      this.setData({
        'takeOrderData.recycleWeight':'50-100公斤',
        'takeOrderData.recycleCredit': credit
      })
    },
    choiceHundred:function(){
      console.log("choiceHundred")
      this.setData({
        choiceHundredColor: "#27ce8b",
        choiceHundredTextColor: "#f8f8f8",
        choiceTenColor:"#f8f8f8",
        choiceTenTextColor:"#000000",
        choiceTwentyColor: "#f8f8f8",
        choiceTwentyTextColor:"#000000",
        choiceFiftyColor: "#f8f8f8",
        choiceFiftyTextColor: "#000000",
        choiceMoneyText:"150元+",
        chocieCreditText:"100+",
      })
      var credit = this.calCredit(100,150)
      this.setData({
        'takeOrderData.recycleWeight':'100公斤以上',
        'takeOrderData.recycleCredit': credit
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
      let val = app.globalData.addressInfo
      this.setData({
        addressInfo : val
      })
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