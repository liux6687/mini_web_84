// pages/mine/mine.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginDataAgain: {},
    loginModel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("mine")
    let pages = getCurrentPages();    //获取当前页面信息栈
    let prevPage = pages[pages.length - 2]
    console.log(prevPage)
  },
  weChat(e) {
    let that = this;
    let userInfo = e.detail.userInfo;
    wx.login({
      success: function (res) {
        if(res.code) {
          console.log(res.code, JSON.stringify(userInfo))
          wx.request({
            url: app.globalData.apiURL + '/api/wechat/ma/auth/login',
            method: 'POST',
            data: {
              miniapp_name: "dms",
              user_info: userInfo,
              js_code: res.code,
            },
            success: function (res) {
              console.log(res)
              if (res.data.status == 201) {
                let userInfo = res.data.data.user_info;
                let store_base = res.data.data.store_base;
                let timestamp = Date.parse(new Date()) / 1000;
                wx.setStorageSync("timestamp", timestamp)
                wx.setStorageSync("token", res.data.data.token)
                wx.setStorageSync("store_base", store_base)
                console.log(res.data.data.token)
                if (userInfo.mobile == null) {
                  // 没有手机号  去验证
                  console.log("没有手机号要去验证")
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                  return
                }
                if (userInfo.mobile == "") {
                  // 手机号空  去验证
                  console.log("手机号空  去验证")
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                  return
                }
                // 有手机号 跳到首页
                console.log("去首页")
                app.globalData.isMine = false
                wx.switchTab({
                  url: '/pages/home/home',
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: "none"
                })
              }
            }
          })
        }else {
          wx.showToast({
            title: '系统错误',
            icon: "none"
          })
        }
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
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})