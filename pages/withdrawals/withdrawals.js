// pages/withdrawals/withdrawals.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallet_money: 0,
    alipay_account: "",
    money: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let wallet_money = options.wallet_money;
    let alipay_account = options.alipay_account;
    
    that.setData({
      wallet_money,
      alipay_account
    })
  },
  getValue(e) {
    let money = e.detail.value;
    this.setData({
      money
    })
  },
  all_money() {
    this.setData({
      money: this.data.wallet_money
    })
  },
  submit() {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/wallet/withdraw',
        method: "POST",
        data: {
          token,
          money: that.data.money
        },
        success(res) {
          if (res.data.status == 201) {
            wx.showToast({
              title: '提现请求已发送',
            })
            that.setData({
              money: 0
            })
            return
          }
          wx.showToast({
            title: res.data.message,
          })
        },
        fail(res) {
          wx.showToast({
            title: "数据请求失败",
            icon: "none"
          })
        }
      })
    })
  },
  close() {
    this.setData({
      money: 0
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