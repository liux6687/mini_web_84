// pages/freezeInfo/freezeInfo.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, 
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getData()
  },
  getData() {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deposit/blocked/details',
        data: {
          token
        },
        success(res) {
          console.log(res)
          if(res.data.status == 200) {
            let data = res.data.data
            that.setData({
              data
            })
          } else {
            wx.showToast({
              title: '数据请求失败',
              icon: "none"
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
    console.log(page)
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deposit/blocked/details',
        data: {
          token,
          page: page,
          limit: 10
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            let newData = res.data.data
            if (newData.length == 0) {
              page = page - 1;
              wx.showToast({
                title: '没有更多数据了',
                icon: "none"
              })
              that.setData({
                page
              })
              return
            }
            let data = that.data.data.concat(newData)
            that.setData({
              data,
              page
            })
          }else {
            wx.showToast({
              title: '数据请求失败',
              icon: "none"
            })
          }
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