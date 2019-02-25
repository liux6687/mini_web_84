// pages/myService/myService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1: false,
    select2: false
  },
  switch(e) {
    var { select1, select2 } = this.data;
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      var selected = !select1
      this.setData({
        select1: !select1
      })
      if (selected) {
        console.log("假一赔三选中")
      }else {
        console.log("假一赔三取消选中")
      }

    }else if(idx == 2) {
      var selected = !select2
      this.setData({
        select2: !select2
      })
      if (selected) {
        console.log("瑕疵退换选中")
      }else {
        console.log("瑕疵退换取消选中")
      }
    }
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