App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  // 重新请求token
  isToken: function (goNext) {
    var that = this;
    var token = wx.getStorageSync('token');
    if (token != '') {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      var oldTimeStamp = wx.getStorageSync('time');
      if (timestamp - oldTimeStamp >= 3600) {
        wx.request({
          url: that.globalData.url + '/api/auth/refresh-token',
          method: 'POST',
          data: {
            token: token
          },
          success: function (res) {
            if (res.data.status == 200) {
              wx.setStorageSync('time', timestamp)
              wx.setStorageSync('token', res.data.data.token);
              goNext(token);
            } else {
              wx.navigateTo({
                url: '/pages/mine/mine',
              })
            }
          },
          fail: function (e) {
            console.log(e)
          }
        })
      } else {
        goNext(token);
      }
    } else {
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
