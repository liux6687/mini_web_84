// pages/setTransfer/setTransfer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model1:false,
    model2: false,
    model3: false,
    model4: false,
    moneyValue: "", //固定利润VALUE
    percentValue: "" //百分比value
  },
  // 提交
  submit() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 弹出弹出框
  showModel(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      // 查看调货列表
      this.setData({
        model1: true
      })
    }else if(idx == 2) {
      // 为您调货
      this.setData({
        model2: true
      })
    }else if (idx == 3) {
      // 按固定利润
      this.setData({
        model3: true
      })
    }else if(idx == 4) {
      // 按百分比
      this.setData({
        model4: true
      })
    }
    console.log(idx)
  },
  // 弹出框取消
  closeModel(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      this.setData({
        model1: false
      })
    }else if (idx == 2) {
      this.setData({
        model2: false
      })
    }else if (idx == 3) {
      this.setData({
        model3: false
      })
    }else if (idx == 4) {
      this.setData({
        model4: false
      })
    }
  },
  // 弹出框确定
  yes(e) {
    var idx = e.currentTarget.dataset.index;
    if( idx == 3) {
      this.setData({
        model3: false
      })
    }else if(idx == 4) {
      this.setData({
        model4: false
      })
    }
  },
  // 设置
  setValue(e) {
    
  },
  //  * 生命周期函数--监听页面加载*/
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