// pages/goodsInfo/goodsInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {}, //从主页传来的商品信息
    goodsArr: [],//商品数组
    select1: 0,
    select2: 0
  },
  // 点击商品发货  跳确认发货页
  gotoConfirmTransfer(e) {
    var idx = e.currentTarget.dataset.index;
    var goodsInfo = this.data.goodsArr[idx];
    let current_store_money = wx.getStorageSync("store_base").deposit.money;
    wx.navigateTo({
      url: '/pages/confirmTransfer/confirmTransfer?goodsInfo=' + JSON.stringify(goodsInfo) + "&current_store_money=" + current_store_money,
    })
  },
  default(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      this.setData({
        select1: 1
      })
      this.priceUpSearch();
    }else if (idx == 2) {
      this.setData({
        select2: 1
      })
      this.sizeUpSearch();
    }
  },
  up(e) {
    var idx = e.currentTarget.dataset.index;
    if (idx == 1) {
      this.setData({
        select1: 2
      })
      this.priceDownSearch();
    } else if (idx == 2) {
      this.setData({
        select2: 2
      })
      this.sizeDownSearch();
    }
  },
  down(e) {
    var idx = e.currentTarget.dataset.index;
    if (idx == 1) {
      this.setData({
        select1: 1
      })
      this.priceUpSearch();
    } else if (idx == 2) {
      this.setData({
        select2: 1
      })
      this.sizeUpSearch();
    }
  },
  priceUpSearch() {
    console.log("价格向上搜索")
    var list = this.data.goodsArr;
    var newList = list.sort(function (a, b){
      return b.deliver_amount - a.deliver_amount
    })
    this.setData({
      goodsArr: newList,
      select2: 0
    })
  },
  priceDownSearch() {
    console.log("价格向下搜索")
    var list = this.data.goodsArr;
    var newList = list.sort(function (a, b) {
      return a.deliver_amount - b.deliver_amount
    })
    this.setData({
      goodsArr: newList,
      select2: 0
    })
  },
  sizeUpSearch() {
    console.log("尺寸向上搜索")
    var list = this.data.goodsArr;
    var newList = list.sort(function (a, b) {
      return b.size - a.size
    })
    this.setData({
      goodsArr: newList,
      select1: 0
    })
  },
  sizeDownSearch() {
    console.log("尺寸向下搜索")
    var list = this.data.goodsArr;
    var newList = list.sort(function (a, b) {
      return a.size - b.size
    })
    this.setData({
      goodsArr: newList,
      select1: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods = JSON.parse(options.goods);
    console.log("goods",goods)
    this.setData({
      goods
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
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand/list',
        data: {
          token,
          cloud_color_id: that.data.goods.cloud_color_id
        },
        success: function (res) {
          console.log("商品详情", res)
          if (res.data.status == 200) {
            that.setData({
              goodsArr: res.data.data,
            })
          }
        },
        fail: function (e) {

        }
      })
    })
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