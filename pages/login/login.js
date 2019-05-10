// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneModal: false,
    nameModal: false,
    selectModel: false, //用户选择弹出框
    selected: null,
    user_info: {},
    userInfoData: {},
    loginDataAgain: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 手机立即验证 
  verifyPhone(e) {
  // 获取用户信息
    let that = this;
    let user_info = e.detail.userInfo;
    // 获取用户code码
    wx.login({
      success: function(res) {
        that.setData({
          phoneModal: true,
          user_info,
          loginDataAgain: res
        })
      }
    })
  },
  // 手机取消验证
  phoneOther() {
    this.setData({
      phoneModal: false
    })
  },
  // 实名立即验证
  verifyName() {
    // this.setData({
    //   nameModal: true
    // })
    wx.showToast({
      title: '暂时不需要实名认证',
      icon: "none"
    })
  },
  // 实名取消验证
  nameOther() {
    this.setData({
      nameModal: false
    })
  },
  // 获取手机号事件
  getPhoneNumber: function (e) {
    var that = this;
    var detail = e.detail;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.showToast({
        title: '',
        duration: 100000,
        icon: 'loading',
        mask: true
      })
      wx.request({
        url: app.globalData.apiURL + '/api/wechat/ma/auth/bind-mobile',
        method: 'POST',
        data: {
          miniapp_name: "dms",
          js_code: that.data.loginDataAgain.code,
          user_info: that.data.user_info,
          mobile_info: detail
        },
        success: function (res) {
          if(res.data.status == 201) {
            wx.hideToast();
            // 时间戳
            let timestamp = Date.parse(new Date()) / 1000;
            let token = res.data.data.token;
            let userInfo = res.data.data.user_info;
            wx.setStorageSync("timestamp", timestamp)
            wx.setStorageSync("token", token)
            that.setData({
              phoneModal: false
            })
            if (userInfo.mobile != '') {
              // 有手机号  验证通过
              wx.showModal({
                title: '重要提示',
                showCancel: false,
                content: '您的初始密码为：111111。如需修改密码请前往84交易后台',
                success(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/home/home'
                    })
                  }
                }
              })
            }
          }else {
            wx.showModal({
              title: '提示',
              content: '验证失败，请重新验证',
            })
            that.setData({
              phoneModal: false
            })
            wx.hideToast();
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
    }
  },
  // 用户的2种状态
  selected(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      selected:idx
    })
  },
  // 确定
  yes() {
    var that = this;
    if (that.data.selected == 0) {
      // 没有店铺
      app.isToken(function goNext(token) {
      // 发请求  创建店铺
        wx.request({
          // https://cwa.tosneaker.com/api/user/store?
          method: 'POST',
          url: app.globalData.apiURL + '/api/user/store?relation=0&token=' + token,
          header: {},
          success: function (res) {
            console.log("创建店铺",res)
            if (res.data.status == 201) {
              wx.switchTab({
                url: '/pages/home/home'
              })
            }
          }
        })
      })
    }else {
      // 有店铺  但不是店主
      wx.showModal({
        title: '提示',
        content: '请联系店主添加',
      })
    }
    this.setData({
      selectModel: false
    })
  },
  // 取消
  no() {
    this.setData({
      selectModel: false
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
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})