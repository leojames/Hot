
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        withCredentials: true,


        success: function (loginRes) {
          if (loginRes) {
            
            wx.request({
              header: { 'content-type': 'application/json' },
              url: 'https://abce.com:8443/login?code=' + loginRes.code,
              data: {
                code: loginRes.code
              },
              success: function (res) {
              
                that.globalData.userInfo.openid=res.data.openid
                that.globalData.userInfo.session_key=res.data.session_key
                that.globalData.userInfo.expires_in=res.data.expires_in
                console.log(res.data)
              }
            })
          } else {
            console.log('获取用户登陆状态失败' + loginRes.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(res.rawData)
              console.log(res.signature)
              console.log(res.encryptedData)
              console.log(res.iv)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }



      })
    }
  },
  globalData: {
    userInfo: null
  }
})