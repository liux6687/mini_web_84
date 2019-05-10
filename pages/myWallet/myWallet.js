// pages/myWallet/myWallet.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    extra: {},
    data: [],
    page: 1
  },
  // 前往设置支付宝
  gotoSet() {
    wx.navigateTo({
      url: '/pages/setAl/setAl',
    })
  },
  // 提现
  submit() {
    if (this.data.extra.alipay_account == null || this.data.extra.alipay_account == "") {
        wx.showToast({
          title: '尚未设置支付宝账号, 不可提现',
          icon: "none",
        })
      return
    }
    wx.navigateTo({
      url: '/pages/withdrawals/withdrawals?wallet_money=' + this.data.extra.money + "&alipay_account=" + this.data.extra.alipay_account,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/wallet/details',
        data: {
          token
        },
        success(res) {
          console.log(res)
          if(res.data.status == 200) {
            that.setData({
              extra: res.data.extra,
              data: res.data.data
            })
            return
          }
          wx.showToast({
            title: '数据跟新失败',
            icon: "none"
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
    let that = this;
    let page = that.data.page;
    page = page + 1;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/wallet/details',
        data: {
          token,
          page: page,
          limit: 10
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            let newData = res.data.data;
            if (newData.length == 0) {
              wx.showToast({
                title: '已经到底了',
                icon: "none"
              }),
              page = page - 1;
              that.setData({
                page
              })
              return
            }
            let data = that.data.data.concat(newData);
            that.setData({
              data
            })
            return
          }
          wx.showToast({
            title: '数据更新失败',
            icon: "none"
          })
        }
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})