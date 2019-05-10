// pages/me/me.js
// var meiqiaPlugin = requirePlugin("meiqia");
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_info: {},
    user_info: {},
    lock: false,
    taobao_score: 0,
    lvNum: 0
  },
  // 我的服务
  gotoMyService() {
    wx.navigateTo({
      url: '/pages/myService/myService',
    })
  },
  // 跳转到我的调货单页面
  gotoMyTransferList() {
    wx.navigateTo({
      url: '/pages/myTransferList/myTransferList',
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
  // 我的钱包
  gotoMyWallet() {
    wx.navigateTo({
      url: '/pages/myWallet/myWallet',
    })
  },
  gotoShopHome() {
    wx.navigateTo({
      url: '/pages/myHome/myHome?unique_id=' + this.data.store_info.unique_id,
    })
  },
  weChat(e) {
    let that = this;
    wx.showToast({
      title: '正在刷新...',
      icon: "loading",
      mask: true,
      success(res) {
        app.isToken(function goNext(token) {
          wx.request({
            url: app.globalData.apiURL + '/api/dms/my/homepage',
            data: {
              token
            },
            success(res) {
              if (res.data.status == 200) {
                that.setData({
                  store_info: res.data.data.store_info,
                  user_info: res.data.data.user_info,
                  lock: true
                })
                wx.showToast({
                  title: '已刷新',
                  icon: "none"
                })
              } else {
                wx.showToast({
                  title: '获取数据失败',
                  icon: "none"
                })
              }
            }
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/my/homepage',
        data: {
          token
        },
        success(res) {
          if (res.data.status == 200) {
            wx.hideLoading();
            let taobao_score = res.data.data.store_info.taobao_score;
            let lvNum = that.lv(taobao_score);
            that.setData({
              taobao_score,
              lvNum,
              store_info: res.data.data.store_info,
              user_info: res.data.data.user_info
            })
          } else {
            wx.showToast({
              title: '获取数据失败',
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
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  lv(num) {
    if (4 <= num && num <= 10) {
      return 1;
    }
    else if (11 <= num && num <= 40) {
      return 2;
    }
    else if (41 <= num && num <= 90) {
      return 3;
    }
    else if (91 <= num && num <= 150) {
      return 4;
    }
    else if (151 <= num && num <= 250) {
      return 5;
    }
    else if (251 <= num && num <= 500) {
      return 1;
    }
    else if (501 <= num && num <= 1000) {
      return 2;
    }
    else if (1001 <= num && num <= 2000) {
      return 3;
    }
    else if (2001 <= num && num <= 5000) {
      return 4;
    }
    else if (5001 <= num && num <= 10000) {
      return 5;
    }
    else if (10001 <= num && num <= 20000) {
      return 1;
    }
    else if (20001 <= num && num <= 50000) {
      return 2;
    }
    else if (50001 <= num && num <= 100000) {
      return 3;
    }
    else if (100001 <= num && num <= 200000) {
      return 4;
    }
    else if (200001 <= num && num <= 500000) {
      return 5;
    }
    else if (500001 <= num && num <= 1000000) {
      return 1;
    }
    else if (1000001 <= num && num <= 2000000) {
      return 2;
    }
    else if (2000001 <= num && num <= 5000000) {
      return 3;
    }
    else if (5000001 <= num && num <= 10000000) {
      return 4;
    }
    else if (10000001 <= num) {
      return 5;
    }else {
      return 0
    }
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
    var that = this;
    wx.showNavigationBarLoading()
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/my/homepage',
        data: {
          token
        },
        success(res) {
          console.log("我的数据", res)
          if (res.data.status == 200) {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            let taobao_score = res.data.data.store_info.taobao_score;
            let lvNum = that.lv(taobao_score);
            that.setData({
              taobao_score,
              lvNum,
              store_info: res.data.data.store_info,
              user_info: res.data.data.user_info
            })
          } else {
            wx.showToast({
              title: '获取数据失败',
              icon: "none"
            })
          }
        }
      })
    })
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