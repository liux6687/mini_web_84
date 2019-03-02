// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息
    goodsList: [],//商品列表
    store_grade: {},
    caution_money: {},
    service: {}
  },
  // 规则
  gotoRElus() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  },
  // 搜索
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 我的服务
  gotoMyService() {
    wx.navigateTo({
      url: '/pages/myService/myService',
    })
  },
  // 我的担保
  gotoMyGuarantee() {
    wx.navigateTo({
      url: '/pages/myGuarantee/myGuarantee',
    })
  },
  // 我的保证金
  gotoMySecurityDeposit() {
    wx.navigateTo({
      url: '/pages/mySecurityDeposit/mySecurityDeposit',
    })
  },
  // 点击商品
  gotoGoodsInfo(e) {
    var idx = e.currentTarget.dataset.index;
    var goods = this.data.goodsList[idx]
    wx.navigateTo({
      url: '/pages/goodsInfo/goodsInfo?goods=' + JSON.stringify(goods),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: 'https://cwa.tosneaker.com/api/user?token=' + token,
        success: function (res) {
          var userInfo = res.data.data;
          that.setData({
            userInfo
          })
          wx.setStorageSync("userInfo", userInfo)
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
    var that = this;
    app.isToken(function goNext(token) {
      // 获取增加信用表格内容
      wx.request({
        url: app.globalData.apiURL + '/api/dms/credit/rule?token=' + token,
        success: function (res) {
          var data = res.data.data;
          if (res.data.status == 200) {
            that.setData({
              caution_money: data.caution_money,
              service: data.service,
              store_grade: data.store_grade
            })
          }
        }
      })
      // 获取用户信息
      //----------------------------------------------------------这里可能有问题-----------------------------------------
      wx.request({
        url: 'https://cwa.tosneaker.com/api/user?token=' + token,
        success: function (res) {
          var userInfo = res.data.data;
          that.setData({
            userInfo
          })
          wx.setStorageSync("userInfo", userInfo)
        }
      })
      //  获取商品列表
      wx.request({
        // https://cwa.tosneaker.com/api/dms/demand/assemble
        url: app.globalData.apiURL + '/api/dms/demand/assemble',
        data: {
          token: token,
          search: app.globalData.homeSearchValue
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 200) {
            if (res.data.data == null) {
              wx.showModal({
                title: '提示',
                content: '搜索的商品不存在',
                success: function () {
                  wx.request({
                    url: app.globalData.apiURL + '/api/dms/demand/assemble',
                    data: {
                      token: token,
                    },
                    success: function (res) {
                      console.log(res.data)

                      if (res.data.status == 200) {
                        that.setData({
                          goodsList: res.data.data
                        })
                      }
                    }
                  })
                }
              })
            }
          }
          app.globalData.homeSearchValue = "";
          if (res.data.status == 200) {
            that.setData({
              goodsList: res.data.data
            })
          }
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
    console.log(1111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})