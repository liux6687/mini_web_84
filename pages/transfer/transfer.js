// pages/transfer/transfer.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
  },
  // 获取搜索内容
  getSearchValue(e) {
    var value = e.detail.value;
    this.setData({
      value
    })
  },
  // 点击查看详情
  gotoOrderInfo(){
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo',
    })
  },
  // 前往搜索页
  search() {
   console.log(111)
  },
  close() {
    this.setData({
      value: ""
    })
  },
  // 复制
  copy() {
    var str = "123456789"
    app.copy(str)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var time = Date.parse(new Date());
    var time1 = time + 24 * 60 * 60;
    var time3 = time + 48 * 60 * 60;
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