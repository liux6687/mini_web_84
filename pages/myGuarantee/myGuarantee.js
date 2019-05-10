// pages/myGuarantee/myGuarantee.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    guarantee: [],
    vouchee: [],
    id: '',//愿意担保的id
    modelShow: false,
    selected: 1,
    tb_logo: ""
  },
  // 点击担保他人
  showModel() {
    this.setData({
      modelShow: true
    })
  },
  // 导航条切换
  select(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      selected: idx
    })
  },
  // 获取担保他人ID
  getValue(e) {
    var id = e.detail.value
    this.setData({
      id
    })
  },
  // 确定担保
  yes() {
    var that = this;
    if(that.data.id == "") {
      wx.showModal({
        title: '提示',
        content: '请输入对方ID....',
      })
      return
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/guarantee',
        method: "POST",
        data: {
          unique_id: that.data.id,
          token: token
        },
        success: function (res) {
          if (res.data.status == 201) {
            wx.showToast({
              title: "担保成功",
            })
            wx.request({
              url: app.globalData.apiURL + '/api/dms/guarantee/list',
              data: {
                token: token
              },
              success: function (res) {
                console.log(res.data)
                if (res.data.status == 200) {
                  that.setData({
                    guarantee: res.data.data.guarantee,
                    vouchee: res.data.data.vouchee
                  })
                }
              }
            })
            that.setData({
              modelShow: false,
              id: ""
            })
          } else if (res.data.status == 403) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        }
      })
    })
  },
  // model取消按钮
  no() {
    this.setData({
      modelShow: false
    })
  },
  // 取消担保
  remove(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    var unique_id = that.data.guarantee[idx].unique_id;
    console.log(unique_id)
    app.isToken(function goNext(token){
      wx.request({
        url: app.globalData.apiURL + '/api/dms/guarantee/cancel',
        data: {
          token,
          unique_id
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          if (res.data.status == 201) {
            wx.showToast({
              title: '已取消担保',
            })
            that.getList();
          }
        }
      })
    })
  },
  // 请求参数
  getList() {
    var that = this;
    app.isToken(function goNext(token){
      wx.request({
        url: app.globalData.apiURL + '/api/dms/guarantee/list',
        data: {
          token: token
        },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              guarantee: res.data.data.guarantee,
              vouchee: res.data.data.vouchee
            })
          }
        }
      })
    })
  },
  lookInfo(e) {
    console.log(11111)
    let that = this;
    let idx = e.currentTarget.dataset.index;
    let userId = that.data.vouchee[idx].unique_id;
    wx.navigateTo({
      url: '/pages/shareAfter/shareAfter?userId=' + userId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tb_logo = app.globalData.tb_logo;
    this.setData({
      tb_logo
    })
    var userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
    this.getList()
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