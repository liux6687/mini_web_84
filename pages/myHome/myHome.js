// pages/myHome/myHome.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unique_id: 0,
    service1: 1,
    service2: 1,
    selected: 1,
    tb_logo: "",
    extra: {},
    data: {}
  },
  // nav切换
  select(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      selected: index
    })
  },
  getData(unique_id) {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/store/details',
        data: {
          token,
          unique_id
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            let extra = res.data.extra;//用户信息
            let data = res.data.data;// 担保信息
            let arr = extra.service;
            console.log(arr)
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].service_type == 0) {
                that.setData({
                  service1: 0
                })
              } else if (arr[i].service_type == 1) {
                that.setData({
                  service2: 0
                })
              }
            }
            that.setData({
              extra,
              data
            })
          } else {
            wx.showToast({
              title: '数据获取失败',
              icon: "none"
            })
          }
        },
        fail(res) {
          console.log("请求失败")
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let unique_id = options.unique_id;
    let tb_logo = app.globalData.tb_logo;
    this.setData({
      unique_id,
      tb_logo
    })
    this.getData(unique_id)  
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
    wx.showNavigationBarLoading();
    this.getData(this.data.unique_id);
    wx.hideNavigationBarLoading();
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