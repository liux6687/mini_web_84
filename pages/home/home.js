// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "store_grade": {
      "1-3钻店铺": "1分",
      "3-5钻店铺": "2分",
      "1-2皇冠店铺": "3分",
      "3-4皇冠店铺": "5分",
      "5皇冠店铺": "7分",
      "1金冠及以上": "10分"
    },
    "caution_money": {
      "保证金": "￥5000=1分",
      "钱包余额": "￥10000=1分",
      "累计交易": "￥50000=1分"
    },
    "service": {
      "瑕疵退换": "1分",
      "假一赔三": "3分"
    }
  },
  // 规则
  gotoRElus() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  },
  // 搜索
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 我的服务
  gotoMyService() {
    wx.navigateTo({
      url: '/pages/myService/myService',
    })
  },
  // 我的担保
  gotoMyGuarantee() {
    wx.navigateTo({
      url: '/pages/myGuarantee/myGuarantee',
    })
  },
  // 我的保证金
  gotoMySecurityDeposit() {
    wx.navigateTo({
      url: '/pages/mySecurityDeposit/mySecurityDeposit',
    })
  },
  // 点击商品
  gotoGoodsInfo() {
    wx.navigateTo({
      url: '/pages/goodsInfo/goodsInfo',
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