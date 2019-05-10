// pages/shareAfter/shareAfter.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tb_logo: "",
    value: "",//搜索内容
    goodsList: [], //商品列表
    unique_id: "",
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    let tb_logo = app.globalData.tb_logo;
    this.setData({
      tb_logo
    })
    let id = options.userId;
    console.log(id)
    that.setData({
      unique_id: id
    })
    that.getList(that.data.unique_id)
  },
  getList(unique_id) {
    let that = this;
    wx.request({
      url: app.globalData.apiURL + '/api/dms/guarantee/demand/list',
      data: {
        unique_id: unique_id
      },
      success(res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            extra: res.data.extra,
            goodsList: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        }
      }
    })
  },
  gotoGoodsInfo(e) {
    let that = this;
    let idx = e.currentTarget.dataset.index;
    let goodsInfo = that.data.goodsList[idx];
    let token = wx.getStorageSync("token");
    let current_store_money = wx.getStorageSync("store_base").deposit.money;
    if (token != "") {
      wx.request({
        url: app.globalData.apiURL + '/api/auth/refresh-token',
        method: 'POST',
        data: {
          token: token
        },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            // 更新时间戳 与 token
            let token = res.data.data.token;
            let newTime = Date.parse(new Date()) / 1000;
            wx.setStorageSync('timestamp', newTime)
            wx.setStorageSync('token', token);
            wx.request({
              url: app.globalData.apiURL + '/api/user',
              data: {
                token
              },
              success: function (res) {
                let userInfo = res.data.data;
                if (userInfo.mobile != "") {
                  // 说明有手机号 可以去发货
                  wx.navigateTo({
                    url: '/pages/confirmTransfer/confirmTransfer?goodsInfo=' + JSON.stringify(goodsInfo) + "&current_store_money=" + current_store_money,
                  })
                  wx.setStorageSync("userInfo", userInfo)
                } else {
                  // 没有手机号  去验证
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          } else {
            // 如果请求失败 跳转登录页重新登录
            wx.navigateTo({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    } else {
      // 没有token
      wx.redirectTo({
        url: '/pages/mine/mine',
      })
    }
  },
  goHome() {
    let that = this;
    let token = wx.getStorageSync("token");
    if (token != "") {
      wx.request({
        url: app.globalData.apiURL + '/api/auth/refresh-token',
        method: 'POST',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.status == 200) {
            // 更新时间戳 与 token
            let token = res.data.data.token;
            let newTime = Date.parse(new Date()) / 1000;
            wx.setStorageSync('timestamp', newTime)
            wx.setStorageSync('token', token);
            wx.request({
              url: app.globalData.apiURL + '/api/user',
              data: {
                token
              },
              success: function (res) {
                console.log(res)
                let userInfo = res.data.data;
                if (userInfo.mobile != "") {
                  // 说明有手机号 跳首页
                  wx.switchTab({
                    url: '/pages/home/home',
                  })
                  wx.setStorageSync("userInfo", userInfo)
                } else {
                  // 没有手机号  去验证
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          } else {
            // 如果请求失败 跳转登录页重新登录
            wx.navigateTo({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    } else {
      // 没有token
      wx.redirectTo({
        url: '/pages/mine/mine',
      })
    }
  },
  // 获取搜索内容
  getSearchValue(e) {
    let value = e.detail.value;
    this.setData({
      value
    })
  },
  // 搜索
  search() {
    let that = this;
    wx.request({
      url: app.globalData.apiURL + '/api/dms/guarantee/demand/list',
      data: {
        unique_id: that.data.unique_id,
        search: that.data.value
      },
      success(res) {
        console.log(res)
        if (res.data.status == 200) {
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '搜索的商品不存在',
            })
            return
          }
          that.setData({
            goodsList: res.data.data
          })
          wx.showToast({
            title: '请求成功',
          })
        } else {
          wx.showToast({
            title: '请求失败',
            icon: "none"
          })
        }
      }
    })
  },
  close() {
    this.setData({
      value: ""
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
    wx.showNavigationBarLoading()
    let that = this;
    let id = that.data.unique_id;
    that.getList(that.data.unique_id)
    wx.hideNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let page = that.data.page;
    page = page + 1;
    wx.request({
      url: app.globalData.apiURL + '/api/dms/guarantee/demand/list',
      data: {
        unique_id: that.data.unique_id,
        search: that.data.value,
        page: page,
        limit: 10
      },
      success(res) {
        if (res.data.status == 200) {
          let newList = res.data.data;
          if (newList.length == 0) {
            wx.showToast({
              title: '已经到底了',
              icon: "none"
            })
            page = page - 1;
            that.setData({
              page
            })
            return
          }
          let goodsList = that.data.goodsList.concat(newList);
          that.setData({
            goodsList,
          })
        }else {
          wx.showToast({
            title: '请求失败',
            icon: "none"
          })
        }
      }
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