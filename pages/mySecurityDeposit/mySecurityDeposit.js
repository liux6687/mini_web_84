// pages/mySecurityDeposit/mySecurityDeposit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelShow: 0 //控制模态框显隐  0 都不可见 1 缴纳保证金 2转出到余额
  },
  // 查看详细
  gotoLooK() {
    wx.navigateTo({
      url: '/pages/freezeInfo/freezeInfo',
    })
  },
  // 模态框显隐
  showModel(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      modelShow: idx
    })
  },
  // 确定按钮
  yes() {
    var { modelShow } = this.data;
    if (modelShow == 1) {
      // 缴纳保证金
      console.log("缴纳保证金")
    }
    else if (modelShow == 2){
      // 转出至余额
      console.log("转出至余额")
    }
    this.setData({
      modelShow: false
    })
  },
  // 取消按钮
  no() {
    var { modelShow } = this.data;
    if (modelShow == 1) {
      // 缴纳保证金
      console.log("取消缴纳保证金")
    }
    else if (modelShow == 2) {
      // 转出至余额
      console.log("取消转出至余额")
    }
    this.setData({
      modelShow: false
    })
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