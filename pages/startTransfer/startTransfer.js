// pages/startTransfer/startTransfer.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    goods_id: 0,
    modelShow: false
  },
  modelShow(e) {
    this.setData({
      modelShow: true
    })
  },
  getValue(e) {
    let value = e.detail.value;
    this.setData({
      value
    })
  },
  yes() {
    var that = this;
    if (that.data.value == "") {
      wx.showToast({
        title: '请输入价格。。。',
        icon: "none"
      })
      return
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand',
        data: {
          // 'demand_price' => 'required|numeric',//求货价
          // 'order_id' => 'required|integer',//订单id
          // 'order_goods_id' => 'required|integer',//子订单id
          demand_price: 0,//求货价
          order_id: 0,//订单id
          order_goods_id: 18,//子订单id
          token,
        },
        success: function(res) {
          if(res.data.status == 403) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
          console.log(res)
          that.setData({
            value: '',
            modelShow: false
          })
        }
      })
    })
  },
  no() {
    this.setData({
      modelShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      // goods_id: options.goods_id
      goods_id: "23"
    })
   app.isToken(function goNext(token){
     wx.request({
       url: app.globalData.apiURL + '/api/dms/demand/profit/autoCalculation',
       data: {
         goods_id: options.goods_id,
         token
       },
       success(res) {
        //  if(res.data.status == 200) {}
        that.setData({
          "goods_amount": "1410.00",
          "deliver_amount": "1310.00",
          "profit": 100,
          "service_fee": "6.55"
        })
       }
     })
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