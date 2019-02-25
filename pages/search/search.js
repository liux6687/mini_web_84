// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log(value)
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
    console.log(111)
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