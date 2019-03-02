// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginData: null,//登录信息
    loginUserInfo: null// 微信用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  weChat(e) {
    var that = this;
    wx.login({
      success: function(res) {
        if(res.code) {
          var loginData = res;
          that.setData({
            loginData: loginData
          })
          wx.getUserInfo({
            success:function(res1) {
              that.setData({
                loginUserInfo: res1
              })
              
            }
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
  onShareAppMessage: function () {

  }
})