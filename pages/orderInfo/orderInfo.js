// pages/orderInfo/orderInfo.js
const qiniuUploader = require("../../utils/qiniuUploader"); //七牛sdk
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    static:"",
    addressInfo: false,
    demand_user: null, //求货商信息
    goodsInfo: null,// 商品信息
    logistics: null,// 地址信息
    order: null,// 订单信息
    goods: {},
    img: ''
  },
  // 前往个人主页
  gotomyHome() {
    wx.redirectTo({
      url: '/pages/myHome/myHome?unique_id=' + this.data.demand_user.unique_id,
    })
  },
  change() {
    this.setData({
      addressInfo: !this.data.addressInfo
    })
  },
  copy(e) {
    let str = e.currentTarget.dataset.str;
    app.copy(str)
  },
  // 打电话
  contact(e) {
    let tal = e.currentTarget.dataset.tal;
    wx.makePhoneCall({
      phoneNumber: tal // 仅为示例，并非真实的电话号码
    })
  },
  getInfo(){
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deliver/details',
        data: {
          token,
          deliver_log_id: that.data.goods.deliver_log_id
        },
        success(res) {
          console.log(res)
          if(res.data.status == 200) {
            that.setData({
              demand_user: res.data.data.demand_user, //供货商信息
              goodsInfo: res.data.data.goods,// 商品信息
              logistics: res.data.data.logistics,// 地址信息
              order: res.data.data.order,// 订单信息
            })
          }else {
            wx.showToast({
              title: '数据请求失败',
              icon:"none",
              success(res) {
                wx.navigateBack({
                  detal: 1
                })
              }
            })
          }
        }
      })
    })
  },
  bigImg(e) {
    let src = e.currentTarget.dataset.src;
    let arr = [];
    arr.push(src)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let goods = JSON.parse(options.goods)
    that.setData({
      goods
    })
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      static: app.globalData.static
    })
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