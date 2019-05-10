// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息
    goodsList: [],//商品列表
    loadModel: false,
    store_grade: {},
    caution_money: {},
    service: {},
    page: 1
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
    console.log("首页")
    let that = this;
    // that.setData({
    //   loadModel: true
    // })
    that.getData();
  },
  // 获取数据
  getData() {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
    app.isToken(function goNext(token) {
      // 获取增加信用表格内容
      wx.request({
        url: app.globalData.apiURL + '/api/dms/credit/rule',
        data: {
          token
        },
        success: function (res) {
          var data = res.data.data;
          if (res.data.status == 200) {
            that.setData({
              caution_money: data.caution_money,
              service: data.service,
              store_grade: data.taobao_level
            })
          }
        }
      })
      // 获取用户信息
      wx.request({
        url: app.globalData.apiURL + '/api/user',
        data: {
          token
        },
        success: function (res) {
          let userInfo = res.data.data;
          that.setData({
            userInfo: userInfo
          })
          wx.setStorageSync("userInfo", userInfo)
        }
      })
      //  获取商品列表
      if (app.globalData.homeSearchValue == "") {
        wx.request({
          url: app.globalData.apiURL + '/api/dms/demand/assemble',
          data: {
            token
          },
          success(res) {
            if (res.data.status == 200) {
              that.setData({
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
        return
      } else {
        wx.request({
          url: app.globalData.apiURL + '/api/dms/demand/assemble',
          data: {
            token: token,
            search: app.globalData.homeSearchValue
          },
          success: function (res) {
            console.log("search", res)
            if (res.data.status == 200 ) {
              if (res.data.data.length == 0) {
                wx.showModal({
                  title: '提示',
                  content: '搜索的商品不存在',
                  success: function () {
                    wx.request({
                      url: app.globalData.apiURL + '/api/dms/demand/assemble',
                      data: {
                        token
                      },
                      success(res) {
                        if (res.data.status == 200) {
                          that.setData({
                            goodsList: res.data.data
                          })
                        } else {
                          wx.showToast({
                            title: '获取数据失败',
                            icon: "none"
                          })
                        }
                      }
                    })
                  }
                })
              }else {
                that.setData({
                  goodsList: res.data.data
                })
                wx.showToast({
                  title: '刷新完成',
                })
              }
              
            } else {
              wx.showToast({
                title: '请求失败',
                icon: "none"
              })
            }
            app.globalData.homeSearchValue = "";
          }
        })
      }
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
    let that = this;
    that.getData();
    // this.setData({
    //   loadModel: true
    // })
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
    var that = this;
    app.isToken(function goNext(token) {
      // 获取用户信息
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
      setTimeout(function(){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.showToast({
          title: '刷新完成',
          icon: "none"
        })
      },1000)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.userInfo.store_info.credit > 10) {
      let that = this;
      let page = that.data.page;
      let goodsList = that.data.goodsList;
      page++
      console.log(page)
      wx.showLoading({
        title: '正在加载',
      })
      app.isToken(function goNext(token) {
        //  获取商品列表
        wx.request({
          url: app.globalData.apiURL + '/api/dms/demand/assemble',
          data: {
            token: token,
            page: page,
            limit: 10
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.status == 200) {
              let newArr = res.data.data;
              if (newArr.length == 0) {
                // 说明已经没数据了
                page = page - 1;
                that.setData({
                  page
                })
                wx.hideLoading()
                wx.showToast({
                  title: '已经到底了',
                  icon: "none"
                })
                return
              }
              goodsList = goodsList.concat(newArr)
              that.setData({
                goodsList,
                page
              })
              wx.hideLoading({
                success() {
                  wx.showToast({
                    title: '加载完成',
                    icon: "none"
                  })
                }
              })
            }
          }
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})