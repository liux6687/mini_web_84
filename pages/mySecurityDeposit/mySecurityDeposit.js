// pages/mySecurityDeposit/mySecurityDeposit.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    extra: {},
    modelShow: 0, //控制模态框显隐  0 都不可见 1 缴纳保证金 2转出到余额
    page: 1,
    gotoMoney: 0,// 转出金额
    goinMoney: 0 //缴纳金额
  },
  // 查看详细
  gotoLooK() {
    wx.navigateTo({
      url: '/pages/freezeInfo/freezeInfo',
    })
  },
  getValue(e) {
    let gotoMoney = e.detail.value;
    console.log(gotoMoney)
    this.setData({
      gotoMoney
    })
  },
  // 模态框显隐
  showModel(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      modelShow: idx
    })
  },
  // 确定按钮
  yes() {
    let that = this;
    var { modelShow } = that.data;
    if (modelShow == 1) {
      // 缴纳保证金
      console.log("缴纳保证金")
    }
    else if (modelShow == 2){
      // 转出至余额
      if(that.data.gotoMoney == 0) {
        wx.showToast({
          title: '请输入金额',
          icon: "none"
        })
        return
      }
      app.isToken(function goNext(token) {
        wx.request({
          url: app.globalData.apiURL + '/api/dms/deposit/to/wallet',
          method: "PUT",
          data: {
            token,
            money: that.data.gotoMoney
          },
          success(res) {
            console.log(res)
            if(res.data.status == 201) {
              wx.showToast({
                title: '已成功转至余额',
              })
              that.getData();
              return
            }
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        })
      })
    }
    this.setData({
      modelShow: false
    })
  },
  // 取消按钮
  no() {
    var { modelShow } = this.data;
    if (modelShow == 1) {
      // 缴纳保证金
      console.log("取消缴纳保证金")
    }
    else if (modelShow == 2) {
      // 转出至余额
      console.log("取消转出至余额")
    }
    this.setData({
      modelShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getData();
  },

  getData() {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deposit/details',
        data: {
          token
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              extra: res.data.extra,
              data: res.data.data,
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
        url: app.globalData.apiURL + '/api/dms/deposit/details',
        data: {
          token,
          page: page,
          limit: 10
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            let newData = res.data.data;
            if(newData.length == 0) {
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