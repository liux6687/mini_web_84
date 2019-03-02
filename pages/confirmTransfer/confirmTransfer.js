// pages/confirmTransfer/confirmTransfer.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    goodsInfo: {},
    current_store_money: 0 //保证金
  },
  // 点击确认调货
  gotoConfirmSendGoods() {
    var token = wx.getStorageSync("token")
    // wx.request({
    //   url: app.globalData.apiURL + '/api/dms/order',
    //   data: {
    //     order_id: this.data.goodsInfo.order_id,
    //     raw_oid: this.data.goodsInfo.raw_oid,
    //     token: token
    //   },
    //   success: function (res) {
    //     if (res.data.data.validate == false) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '请求失败',
    //         success: function(res) {
    //           if (res.confirm) {
    //             wx.navigateBack({
    //               delta: 1
    //             })
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     }else {
    //       wx.redirectTo({
    //         url: '/pages/confirmSendGoods/confirmSendGoods?goodsInfo=' + JSON.stringify(this.data.goodsInfo),
    //       })
    //     }
    //   }
    // })
    wx.redirectTo({
      url: '/pages/confirmSendGoods/confirmSendGoods?goodsInfo=' + JSON.stringify(this.data.goodsInfo),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goods = JSON.parse(options.goods);
    var goodsInfo = JSON.parse(options.goodsInfo)
    this.setData({
      goods,
      goodsInfo,
      current_store_money: options.current_store_money
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