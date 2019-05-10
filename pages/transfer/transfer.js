// pages/transfer/transfer.js
let app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultTimeArr:[],
    value: "",
    dataList: [],
    penalty_hours: 0, //有效时间
    page: 1,
    times:""
  },
  // 获取搜索内容
  getSearchValue(e) {
    var value = e.detail.value;
    this.setData({
      value
    })
  },
  btnClick(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let goods = that.data.dataList[index];
    if(id == 1) {
      //查看详情
      wx.navigateTo({
        url: '/pages/orderInfo/orderInfo?goods=' + JSON.stringify(goods),
      })
    } else if (id == 2) {
      //取消发货
      wx.showModal({
        title: '提示',
        content: '确认取消发货吗？？？',
        success(res) {
          if (res.confirm) {
            app.isToken(function goNext(token) {
              wx.request({
                url: app.globalData.apiURL + '/api/dms/deliver/cancel',
                method: "PUT",
                data: {
                  token,
                  deliver_id: goods.deliver_log_id
                },
                success(res) {
                  // console.log("取消发货", res)
                  if (res.data.status == 201) {
                    clearInterval(that.data.times)
                    that.getList()
                    return
                  }
                  wx.showToast({
                    title: '请求失败',
                    icon: "none"
                  })
                }
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    } else if (id == 3) {
      //催收确认
      app.isToken(function goNext(token) {
        wx.request({
          url: app.globalData.apiURL +  '/api/dms/deliver/urge',
          method: "PUT",
          data: {
            token,
            deliver_log_id: goods.deliver_log_id
          },
          success(res) {
            if(res.data.status == 201) {
              wx.showToast({
                title: '催收成功',
              })
              return
            }
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        })
      })
    }else if( id == 4) {
      // 确认发货
      wx.navigateTo({
        url: '/pages/confirmSendGoods/confirmSendGoods?deliver_log_id=' + goods.deliver_log_id + "&goodsInfo=" + JSON.stringify(goods),
      })
    }else {
      // console.log(id)
    }
  },
  // 回车搜索
  search() {
    clearInterval(this.data.times)
    let that = this;
    if(that.data.value == "") {
      wx.showToast({
        title: '请输入搜索内容...',
        icon: "none"
      })
      return
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deliver/list',
        data: {
          token,
          search: that.data.value
        },
        success(res) {
          let dataList = res.data.data;
          if (res.data.status == 200) {
            that.setData({
              penalty_hours: res.data.extra.penalty_hours,
              dataList,
            })
            if (dataList.length > 0) {
              var arr = [];
              let timeArr = [];
              dataList.forEach((item, index) => {
                arr[index] = item.receive_time;
              })
              that.setData({
                times: setInterval(function () {
                  arr.forEach((item, index) => {
                    let date = that.setTime(item, 24 * 60 * 60)
                    date = date - 1;
                    let d = parseInt(date / 60 / 60 / 24);
                    let h = parseInt(date / 60 / 60 % 24, 10);
                    let m = parseInt(date / 60 % 60, 10);
                    let s = parseInt(date % 60, 10);
                 
                    let obj = {
                      d,
                      h,
                      m,
                      s,
                    }
                    timeArr[index] = obj
                  })
                  that.setData({
                    resultTimeArr: timeArr
                  })
                }, 1000)
              })
            } else if (dataList.length <= 0) {
              wx.showToast({
                title: '没有该订单, 请下拉刷新',
                icon: "none"
              })
            }
            return
          }
          wx.showToast({
            title: '数据请求失败',
            icon: "none"
          })
        }
      })
    })
  },
  // 清空搜索内容
  close() {
    this.setData({
      value: ""
    })
  },
  // 复制
  copy(e) {
    let str = e.currentTarget.dataset.str;
    app.copy(str)
  },
  // 请求商品列表
  getList() {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL +  '/api/dms/deliver/list',
        data: {
          token
        },
        success(res) {
          if(res.data.status == 200) {
            let dataList = res.data.data;
            that.setData({
              dataList,
              penalty_hours: res.data.extra.penalty_hours
            })
            if (dataList.length > 0) {
              var arr = [];
              let timeArr = [];
              dataList.forEach((item, index) => {
                arr[index] = item.receive_time;
              })
             that.setData({
               times : setInterval(function () {
                 arr.forEach((item, index) => {
                    let date = that.setTime(item, 24 * 60 * 60)
                    date = date - 1;
                    let d = parseInt(date / 60 / 60 / 24);
                    let h = parseInt(date / 60 / 60 % 24, 10);
                    let m = parseInt(date / 60 % 60, 10);
                    let s = parseInt(date % 60, 10);
                    if(Number(d) + Number(h) + Number(m) + Number(s) <= 0) {
                      d = "00";
                      h = "00";
                      m = "00";
                      s = "00";
                    }
                   let obj = {
                     d,
                     h,
                     m,
                     s,
                   }
                   
                   timeArr[index] = obj
                 })
                 that.setData({
                   resultTimeArr: timeArr
                 })
               }, 1000)
             })
            }
            return
          }
          wx.showToast({
            title: '数据请求失败',
            icon: "none"
          })
        }
      })
    })
  },
  setTime(starTime, duration) {
    starTime = starTime.replace(/-/g, '/'); //兼容ios 
    // 当前时间
    let currentTime = Date.parse(new Date()) / 1000; 
    // 剩余时间
    let leftTime = null;
    // 结束时间 = 开始时间 + 有效期
    let endTime = Date.parse(new Date(starTime)) / 1000 + Number(duration);
    // 剩余时间 = 结束时间 - 当前时间
    return leftTime = endTime - currentTime;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      value: ''
    })
    // this.getList()
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
    clearInterval(this.data.times)
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.times)
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
    this.getList();
    setTimeout(function () {
      wx.showToast({
        title: '刷新完成',
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    clearInterval(this.data.times)
    let that = this;
    let page = that.data.page;
    page = page + 1;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL +  '/api/dms/deliver/list',
        data: {
          token,
          page,
          limit: 10
        },
        success(res) {
          if(res.data.status == 200) {
            let dataList = res.data.data;
            if (dataList.length == 0) {
              // 说明已经没有数据了
              page = page - 1;
              wx.showToast({
                title: '已经到底了',
                icon: "none"
              })
              that.setData({
                page
              })
              return
            }
            that.setData({
              dataList,
              penalty_hours: res.data.extra.penalty_hours
            })
            if (dataList.length > 0) {
              var arr = [];
              let timeArr = [];
              dataList.forEach((item, index) => {
                arr[index] = item.receive_time;
              })
              that.setData({
                times: setInterval(function () {
                  arr.forEach((item, index) => {
                    let date = that.setTime(item, 24 * 60 * 60)
                    date = date - 1;
                    let d = parseInt(date / 60 / 60 / 24);
                    let h = parseInt(date / 60 / 60 % 24, 10);
                    let m = parseInt(date / 60 % 60, 10);
                    let s = parseInt(date % 60, 10);
                    let obj = {
                      d,
                      h,
                      m,
                      s,
                    }
                    timeArr[index] = obj
                  })
                  that.setData({
                    resultTimeArr: timeArr
                  })
                }, 1000)
              })
            }
            return
          }
          wx.showToast({
            title: '数据请求失败',
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