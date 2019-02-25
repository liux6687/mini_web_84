// pages/myGuarantee/myGuarantee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelShow: false,
    selected: 1
  },
  // 点击担保他人
  showModel() {
    this.setData({
      modelShow: true
    })
  },
  // 导航条切换
  select(e) {
    console.log(1)
    var idx = e.currentTarget.dataset.index;
    this.setData({
      selected: idx
    })
  },
  // 确定担保
  yes() {
    this.setData({
      modelShow: false
    })
  },
  // model取消按钮
  no() {
    this.setData({
      modelShow: false
    })
  },
  // 取消担保
  remove() {
    console.log(1111)
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