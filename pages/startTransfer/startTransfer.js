// pages/startTransfer/startTransfer.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    id: 0, 
    order_id: 0,
    modelShow: false,
    goods_amount: 0, //调货价
    old_deliver_amount: 0,
    deliver_amount:0,// 求货价
    profit: 0,// 利润
    service_fee:0, // 服务费
    service_fee_scale: 0 //调货比率
  },
  //开始调货按钮
  submit() {
    let that = this;
    let { deliver_amount, id, order_id, goods_amount, profit} = that.data; 
    if (profit > goods_amount) {
      wx.showModal({
        title: '重要提示',
        content: '当前调货价格不合理, 请重新设置',
        showCancel: false,
        success(res) {
          if(res.confirm) {
            return
          }
        }
      })
      return
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand',
        method: "POST",
        data: {
          demand_price: deliver_amount,//求货价
          order_id: order_id,//订单id
          order_goods_id: id,//子订单id
          token,
        },
        success: function (res) {
          if (res.data.status == 201) {
            wx.navigateBack({
              delta: 1
            })
            return 
          }
          wx.showToast({
            title: res.data.message,
            icon: "none"
          }) 
          console.log("submit", res)
        }
      })
    })
  },
  //设置调货价格
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
    let { value, service_fee_scale, goods_amount} = that.data;
    if (value == "") {
      wx.showToast({
        title: '请输入价格。。。',
        icon: "none"
      })
      return
    }
    console.log(value)
    if (value > goods_amount) {
      wx.showToast({
        title: '不得高于当前出售价格',
        icon: "none"
      })
      return
    }
    //服务费
    let service_fee = (value * service_fee_scale).toFixed(2);
    //利润
    let profit = (goods_amount - value).toFixed(2);
    that.setData({
      service_fee,
      profit,
      deliver_amount: value,
      modelShow: false,
      value: ""
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
      id: options.id,
      old_deliver_amount: options.deliver_amount,
      order_id: options.order_id
    })
    console.log("222",typeof options.deliver_amount)
    if (options.deliver_amount != "null") {
      app.isToken(function goNext(token) {
        // 说明null不为空   需要传deliver_amount
        wx.request({
          url: app.globalData.apiURL + '/api/dms/demand/profit/autoCalculation',
          data: {
            goods_id: options.id,
            deliver_amount: options.deliver_amount,
            token
          },
          success(res) {
            console.log("修改调货价", res)
            if (res.data.status == 200) {
              let { goods_amount, deliver_amount, profit, service_fee } = res.data.data;
              that.setData({
                goods_amount: goods_amount,
                deliver_amount: deliver_amount,
                profit: profit,
                service_fee: service_fee,
                service_fee_scale: res.data.extra.service_fee_scale
              })
            }
          }
        })
      })
      return
    }
    //说明是开始调货  不传deliver_amount
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand/profit/autoCalculation',
        data: {
          goods_id: options.id,
          token
        },
        success(res) {
          console.log("开始调货返回值", res)
          if (res.data.status == 200) {
            let { goods_amount, deliver_amount, profit, service_fee } = res.data.data;
            that.setData({
              goods_amount: goods_amount,
              deliver_amount: deliver_amount,
              profit: profit,
              service_fee: service_fee,
              service_fee_scale: res.data.extra.service_fee_scale
            })
          }
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
    this.setData({
      value: ""
    })
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