// pages/goodsInfo/goodsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1: 0,
    select2: 0
  },
  // 点击发货按钮
  gotoConfirmTransfer() {
    wx.navigateTo({
      url: '/pages/confirmTransfer/confirmTransfer',
    })
  },
  default(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      this.setData({
        select1: 1
      })
      this.priceUpSearch();
    }else if (idx == 2) {
      this.setData({
        select2: 1
      })
      this.sizeUpSearch();
    }
  },
  up(e) {
    var idx = e.currentTarget.dataset.index;
    if (idx == 1) {
      this.setData({
        select1: 2
      })
      this.priceDownSearch();
    } else if (idx == 2) {
      this.setData({
        select2: 2
      })
      this.sizeDownSearch();
    }
  },
  down(e) {
    var idx = e.currentTarget.dataset.index;
    if (idx == 1) {
      this.setData({
        select1: 1
      })
      this.priceUpSearch();
    } else if (idx == 2) {
      this.setData({
        select2: 1
      })
      this.sizeUpSearch();
    }
  },
  priceUpSearch() {
    console.log("价格向上搜索")
  },
  priceDownSearch() {
    console.log("价格向下搜索")
  },
  sizeUpSearch() {
    console.log("尺寸向上搜索")
  },
  sizeDownSearch() {
    console.log("尺寸向下搜索")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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