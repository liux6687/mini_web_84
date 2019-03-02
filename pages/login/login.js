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
    var user_info = e.detail.userInfo;
    var that = this;
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
        url: app.globalData.apiURL + '/api/wechat/ma/auth/login',
        method: 'POST',
        data: {
          miniapp_name: "dms",
          js_code: that.data.loginDataAgain.code,
          user_info: that.data.user_info,
          mobile_info: detail
        },
        success: function (res) {
          if(res.data.status == 201) {
            // 时间戳
            var timestamp = res.data.data.mobile_info.watermark.timestamp;
            // 手机号
            var phone = res.data.data.mobile_info.phoneNumber;
            var token = res.data.data.token;
            var userInfo = res.data.data.user_info;
            if (phone != '') {
              // 有手机号  验证通过
              console.log(token)
              wx.setStorageSync("timestamp", timestamp)
              wx.setStorageSync("phone", phone)
              wx.setStorageSync("token", token)
              that.setData({
                phoneModal: false
              })
              wx.hideToast();
              // 如果不是店主
              if (userInfo.store_id == 0) {
                that.setData({
                  selectModel:true
                })
              }else {
                // 如果是店主 直接去首页
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }
            }
          }else {
            wx.showModal({
              title: '提示',
              content: '验证失败，请重新验证',
            })
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
            if (res.status == 201) {
              wx.navigateTo({
                url: '/pages/home/home',
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
  onShareAppMessage: function () {

  }
})