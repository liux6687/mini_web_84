App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.isToken(
      function goNext() {
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    )
  },
  // 重新请求token
  isToken: function (goNext) {
    var that = this;
    var token = wx.getStorageSync('token');
    if(token != "") {
      var oldTime = wx.getStorageSync("timestamp");
      var newTime = Date.parse(new Date())/1000;
      if( newTime - oldTime >= 3600 ) {
        // 重新请求token
        wx.request({
          url: that.globalData.apiURL + '/api/auth/refresh-token',
          method: 'POST',
          data: {
            token: token
          },
          success: function (res) {
            if (res.data.status == 200) {
              // 更新时间戳 与 token
              wx.setStorageSync('timestamp', newTime)
              wx.setStorageSync('token', res.data.data.token);
              goNext(token);
            } else {
              // 如果请求失败 跳转登录页重新登录
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }else {
        goNext(token)
      }
    }
    else {
      // 如果token是空的
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  // 数组去重
  Arrquchong: function (array) {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  },
  // 复制
  copy(str) {
    wx.setClipboardData({
      data: str,
      success: function() {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
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
    
  },
  globalData: {
    openType: "",
    homeSearchValue: "",
    apiURL: "https://cwa.tosneaker.com"
  }
})
