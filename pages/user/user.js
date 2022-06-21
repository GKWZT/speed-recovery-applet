const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data:{
      avatarUrl:"",
      nickName:"点击登录数速回收",
     },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.getUserProfile({
        success: (res) => {
          this.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          app.globalData.isLogin = true;
          console.log(app.globalData.isLogin);
        }
      })
    },
    getUserProfile(){
      wx.getUserProfile({
        desc: '登录数速回收', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          wx.setStorage({    //数据缓存方法
            key: 'nickName',   //关键字，本地缓存中指定的key
            data: res.userInfo.nickName,    //缓存微信用户公开信息，
            success: function() {      //缓存成功后，输出提示
              console.log('写入nickName缓存成功')
            },
            fail: function() {        //缓存失败后的提示
              console.log('写入nickName发生错误')
            }
          })
          wx.setStorage({    //数据缓存方法
            key: 'avatarUrl',   //关键字，本地缓存中指定的key
            data: res.userInfo.avatarUrl,    //缓存微信用户公开信息，
            success: function() {      //缓存成功后，输出提示
              console.log('写入avatarUrl缓存成功')
            },
            fail: function() {        //缓存失败后的提示
              console.log('写入avatarUrl发生错误')
            }
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

