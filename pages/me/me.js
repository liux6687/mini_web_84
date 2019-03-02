// pages/me/me.js
// var meiqiaPlugin = requirePlugin("meiqia");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳到登录页 重新登录
  gotoMine() {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  // 我的服务
  gotoMyService() {
    wx.navigateTo({
      url: '/pages/myService/myService',
    })
  },
  // 跳转到我的调货单页面
  gotoMyTransferList() {
    wx.navigateTo({
      url: '/pages/myTransferList/myTransferList',
    })
  },
  // 我的担保
  gotoMyGuarantee() {
    wx.navigateTo({
      url: '/pages/myGuarantee/myGuarantee',
    })
  },
  // // 我的信用分
  // gotoMyCredit() {
  //   wx.navigateTo({
  //     url: '/pages/myCredit/myCredit',
  //   })
  // },
  // 我的保证金
  gotoMySecurityDeposit() {
    wx.navigateTo({
      url: '/pages/mySecurityDeposit/mySecurityDeposit',
    })
  },
  // 我的钱包
  gotoMyWallet() {
    wx.navigateTo({
      url: '/pages/myWallet/myWallet',
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