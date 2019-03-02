// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    value: '' //input 输入框内容
  },
  // 获取输入框内容
  getSearchValue(e) {
    var value = e.detail.value;
    this.setData({
      value
    })
  },
  // 提交搜索
  submit() {
    var value = this.data.value;
    if (value == "") {
      wx.showModal({
        title: '提示',
        content: '请输入搜索内容。。。',
      })
      return
    }
    var searchList = this.data.searchList;
    searchList.push(value)
    searchList = app.Arrquchong(searchList)
    if (searchList.length >= 10 ) {
      searchList.shift()
      this.setData({
        searchList
      })
    }
    wx.setStorageSync("searchList", JSON.stringify(searchList))
    app.globalData.homeSearchValue = value;
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  // 键盘搜索事件
  search(){
    this.submit()
  },
  // 清空input框
  close() {
    this.setData({
      value: ''
    })
  },
  // 清空历史搜索列表
  empty() {
    var searchList = [];
    wx.setStorageSync("searchList", JSON.stringify(searchList))
    this.setData({
      searchList: JSON.parse(wx.getStorageSync("searchList"))
    })

  },
  searchItem(e) {
    var value = e.currentTarget.dataset.item;
    this.setData({
      value
    })
    this.submit()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchList = wx.getStorageSync("searchList");
    if (searchList == "") {
      searchList = []
    }else {
      searchList = JSON.parse(wx.getStorageSync("searchList"));
    }
    this.setData({
      searchList
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