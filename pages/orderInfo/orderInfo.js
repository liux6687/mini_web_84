// pages/orderInfo/orderInfo.js
const qiniuUploader = require("../../utils/qiniuUploader"); //七牛sdk
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: ''
  },
  // 前往个人主页
  gotomyHome() {
    wx.redirectTo({
      url: '/pages/myHome/myHome',
    })
  },
  // 图片上传
  upload() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        var tempFilePath = res.tempFilePaths[0];
        var imgName = tempFilePath.substr(30, 50);
        qiniuUploader.upload(tempFilePath, (res) => {
          console.log(111)
          return
          that.setData({
            img: res.imageURL
          })
        }, (error) => {
          console.log(error)
        }, {
            region: 'NCN',
            uploadURL: 'https://upload-z1.qiniup.com',
            domain: 'https://static.tosneaker.com',
            // domain: app.globalData.qiniuImgUrl,
            key: 'uploads/_tmp/' + imgName,
            uptoken: that.data.qiniuToken
          })

      }
    })
  },
  // 打电话
  contact() {
    wx.makePhoneCall({
      phoneNumber: '15222684638' // 仅为示例，并非真实的电话号码
    })
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