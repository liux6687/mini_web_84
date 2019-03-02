// pages/confirmSendGoods/confirmSendGoods.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    logistics: "", //物流公司
    logistics_num: "", //物流单号
  },
  // 确认发货按钮
  submit() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 取消发货
  cancelSend() {
    wx.showModal({
      title: '提示',
      cancelText: "取消发货",
      confirmText: "返回",
      content: '取消发货后您的保证金会被扣除并且会计入个人信用记录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
         
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsInfo = JSON.parse(options.goodsInfo);
    var token = wx.getStorageSync("token")
    // wx.request({
    //   url: app.globalData.apiURL + '/api/dms/demand/receive',
    //   method: "POST",
    //   data: {
    //     demand_id: goodsInfo.id,
    //     token
    //   },
    //   success: function(res) {
    //     console.log("jfkdjkf",res)
    //   }
    // })
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