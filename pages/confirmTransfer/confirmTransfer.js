// pages/confirmTransfer/confirmTransfer.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    current_store_money: 0, //保证金
    bank_fee: 0 //银行转账费
  },
  // 点击确认调货
  gotoConfirmSendGoods() {
    let that = this;
    wx.showLoading({
      title: '',
    })
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/order',
        data: {
          token,
          order_id: that.data.goodsInfo.order_id,
          raw_oid: that.data.goodsInfo.raw_oid,
          is_update: 0
        },
        success(res) {
          console.log(res)
          // if (res.data.data.validate) {
          if (true) {
            // 同步淘宝  true可以接单
            app.isToken(function goNext(token) {
              wx.request({
                url: app.globalData.apiURL + '/api/dms/demand/receive',
                method: "POST",
                data: {
                  token,
                  demand_id: that.data.goodsInfo.id
                },
                success(res) {
                  console.log("确认调货",res)
                  if(res.data.status == 201) {
                    wx.redirectTo({
                      url: '/pages/confirmSendGoods/confirmSendGoods?goodsInfo=' + JSON.stringify(that.data.goodsInfo) + "&deliver_log_id=" + res.data.data.deliver_log_id,
                    })
                  }else {
                    wx.showToast({
                      title: res.data.message,
                      icon: "none"
                    })
                  }
                }
              })
            })
          }else {
            // 不可调货
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }

        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option", options.current_store_money)

    var goodsInfo = JSON.parse(options.goodsInfo)
    console.log(goodsInfo)
    this.setData({
      goodsInfo,
      current_store_money: options.current_store_money,
      bank_fee: Math.ceil(Number(goodsInfo.deliver_amount) * Number(goodsInfo.service_fee_scale))// 银行转账费取整
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
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})