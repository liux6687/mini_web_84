App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    let that = this;
    let token = wx.getStorageSync("token");
    // 分享卡片进来
    if (options.scene == 1007 || options.scene == 1008) {
      that.isShare(options, token);
    }
    // 从扫码进入
    else if (options.scene == 1011 || options.scene == 1012 || options.scene == 1013 || options.scene == 1047 || options.scene == 1048 || options.scene == 1049) {
      that.isCode(options, token)
    }
    // 其他进入情况
    else {
      if (token != "") {
        console.log(1111)
        // 有token
        that.init()
      } else {
        // 没有token
        that.no_has_token();
      }
    }
    
  },

  init() {
    let that = this;
    let token = wx.getStorageSync("token");
    return new Promise(function(resolve, reject){
      wx.request({
        url: that.globalData.apiURL + '/api/auth/refresh-token',
        method: 'POST',
        data: {
          token: token
        },
        success: function (res) {
          resolve(res);
        },
        fail: function() {
          reject("系统异常，请重试！")
        }
      })
    })
    .then((res) => {
      return new Promise((resolve, reject) => {
        if (res.data.status == 200) {
          // 更新时间戳 与 token
          let token = res.data.data.token;
          let newTime = Date.parse(new Date()) / 1000;
          wx.setStorageSync('timestamp', newTime)
          wx.setStorageSync('token', token);
          wx.request({
            url: that.globalData.apiURL + '/api/user',
            data: {
              token
            },
            success: function (res) {
              let userInfo = res.data.data;
              resolve(userInfo)
            }
          })
        } 
      })
    })
    .then((userInfo) => {
      console.log(userInfo)
      if (userInfo.mobile && userInfo.mobile != "") {
        // 说明有手机号 跳首页
        console.log("跳首页")
        wx.switchTab({
          url: '/pages/home/home',
        })
        // wx.redirectTo({
        //   url: '/pages/home/home',
        // })
        wx.setStorageSync("userInfo", userInfo)
      } else {
        // 没有手机号  去验证
        console.log("前往login")
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  // 分享进来的函数
  isShare(options, token) {
    let that = this;
    let currentPage = getCurrentPages();
    if (options.query.userId) {
      console.log("有userId")
      let userId = options.query.userId;
      wx.redirectTo({
        url: '/pages/shareAfter/shareAfter?userId=' + userId,
      })
      return
    }
    if (token != "") {
      // 有token
      that.init()
    } else {
      // 没有token
      that.no_has_token();
    }
  },
  // 扫码进来的函数
  isCode(options, token) {
    let that = this;
    if (options.query.userId) {
      let userId = options.query.userId;
      wx.redirectTo({
        url: '/pages/shareAfter/shareAfter?userId=' + userId,
      })
    } else {
      if (token != "") {
        // 有token
        that.init()
      } else {
        // 没有token
        that.no_has_token();
      }
    }
  },
  // 没有token的函数
  no_has_token() {
    let currentPage = getCurrentPages();
    console.log(currentPage)
    if (currentPage.length == 0) {
      setTimeout(function () {
        console.log("55555")
        wx.redirectTo({
          url: '/pages/mine/mine',
        })
      }, 500)
    } else {
      wx.redirectTo({
        url: '/pages/mine/mine',
      })
    }
  },
  // 重新请求token
  isToken: function (goNext) {
    let pages = getCurrentPages();
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
        url: '/pages/mine/mine',
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
  // 倒计时或已过时间  参数 1 时间 格式："2019-03-04 18:00:00"  2 有效期 秒为单位
  countdown(starTime, duration) {
    // 获取当前时间  单位都以秒计
    starTime = starTime.replace(/-/g, '/'); //兼容ios
    let currentTime = Date.parse(new Date()) / 1000;
    let leftTime = null;
    //对数进行处理
    let checkTime = function (num) {
      num = Number(num)
      if (num < 10 && num >= 0) {
        num = "0" + num
      }else if(num <= 0) {
        num = "00"
      }
      return num
    }
    if (duration) {
      // console.log("倒计时")
      // 获取结束时间  开始时间 + 有效期
      let endTime = Date.parse(new Date(starTime)) / 1000 + Number(duration);
      // 剩余时间  秒计
      leftTime = endTime - currentTime;
    }else {
      // console.log("计时")
      //没有有效期  获取已过时间 当前 - 开始
      leftTime = currentTime - Date.parse(new Date(starTime)) / 1000;
    }
    let d = parseInt(leftTime / 60 / 60 / 24); 
    let h = parseInt(leftTime / 60 / 60 % 24, 10);
    let m = parseInt(leftTime / 60 % 60, 10);
    let s = parseInt(leftTime % 60, 10);
    let resultTime = {
      d: checkTime(d),
      h: checkTime(h),
      m: checkTime(m),
      s: checkTime(s),
    }
    return resultTime
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },
  // 分享时事件
  shareFunction(options) {
    var shareObj = {
      title: "明价求货, 有货的大哥直接给我发货",
      path: '/pages/mine/mine',
      imageUrl: '../../images/share_bg.png',
    };
    if (options.from == 'button') {
      var eData = options.target.dataset;
      shareObj.path = '/pages/shareAfter/shareAfter?userId=' + wx.getStorageSync("store_base").unique_id
    }
    return shareObj;
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
    wx.showToast({
      title: '加载失败, 请重试',
      icon: "none"
    })
  },
  globalData: {
    isMine: false,
    homeSearchValue: "",
    apiURL: "https://oth.tosneaker.com", //正式
    // apiURL: "https://dth.tosneaker.com", //测试
    upload_token: "", //七牛上传token,
    static: "http://qncdndev.tosneaker.com", //静态图片前缀
    tb_logo: "http://logo.taobao.com/shop-logo" //淘宝店铺头像前缀
  }
})
