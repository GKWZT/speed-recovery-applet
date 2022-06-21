// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    addressInfo: {
      cityName: "广州市",
      countyName: "海珠区",
      detailInfo: "新港中路397号",
      errMsg: "chooseAddress:ok",
      nationalCode: "510000",
      postalCode: "510000",
      provinceName: "广东省",
      telNumber: "020-81167888",
      userName: "张三"
    },
    orderTimes: 0,
    isLogin: false
  }
})
