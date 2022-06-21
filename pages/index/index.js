// index.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    banners:[
        {id:1,src:"/static/index/banner1.png"},
        {id:2,src:"http://tu1.gditc1.cn/i/2022/06/01/默认标题_公众号封面首图_2022-06-01+15_48_15-629719e1ed640.jpeg"},
        {id:3,src:"http://tu1.gditc1.cn/i/2022/06/01/默认标题_公众号封面首图_2022-06-01+15_55_29-62971b804a72e.jpeg"},
        {id:4,src:"http://tu1.gditc1.cn/i/2022/06/01/默认标题_公众号封面首图_2022-06-01+15_48_15-629719e1ed640.jpeg"},
    ],
    addressName:'',
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '你自己的电话号码',
      fail(res){
        console.log("用户取消了拨打电话")
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=你自己的key";
      that.longitude = res.longitude;
      that.latitude = res.latitude
      console.log(getAddressUrl);
      wx.request({          
        url: getAddressUrl,
        success: function (res) {        
          console.log(res.data.result.address)
          console.log(res.data);
          // _this.locations = result.data.result.address      
          that.setData({
            addressName:res.data.result.address
          })
        }        
      })
    }
  }) 
  }
})