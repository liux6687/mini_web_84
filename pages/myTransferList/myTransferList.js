// pages/myTransferList/myTransferList.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGoNavigate: false,
    isImgShow: false,
    modelShow: false,
    shareModel: false,
    shareArr: ["分享到朋友圈","分享到聊天群"],
    statusArr: ["全部订单","等待接单","已经接单","已发货","已完成","已取消","已下架"],
    item: "全部订单",
    status: 0,
    goodsList: [],
    lock: true,
    page: 1,
    imgURL: ""
  },
  // 设置
  gotoSet() {
    wx.navigateTo({
      url: '/pages/setTransfer/setTransfer',
    })
  },
  // 分享按钮
  shareModel() {
    this.setData({
      shareModel: true
    })
  },
  no_share() {
    this.setData({
      shareModel: false
    })
  },
  // 生成图片
  make_img() {
    let that = this;
    let width = wx.getSystemInfoSync().windowWidth;
    let url = "https://cwa.tosneaker.com/m/screenshot/shareImg.html";
    console.log(width,  url)
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand/share/image',
        method: "POST",
        data: {
          width,
          url
        },
        success(res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              imgURL: res.data.extra.filename,
              isImgShow: true
            })
          }
        }
      })
    })
  },
  close_img() {
    this.setData({
      isImgShow: false
    })
  },
  down(e) {
    let that = this;
    let src = e.currentTarget.dataset.src;
        wx.saveImageToPhotosAlbum({
          filePath: src,
          success(res) {
            if (res.errMsg == "saveImageToPhotosAlbum:ok") {
              wx.showToast({
                title: '保存成功',
                success(res) {
                  that.setData({
                    isImgShow: false
                  })
                }
              })
            }
          }
        })

  },
  // 点击弹出选项弹出框
  showModel(e) {
    this.setData({
      modelShow: true,
    })
  },
  // 弹出框选择事件
  click(e) {
    let that = this;
    wx.showLoading({
      title: '加载中 。。。',
    })
    var idx = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    that.setData({
      modelShow: false,
      item,
      status: idx,
      lock: false
    })
    that.getList();
  },
  // 按钮点击事件
  btnClick(e) {
    let that = this;
    // 点击的第几个商品
    let index = e.currentTarget.dataset.index;
    // 点击的第几个按钮
    let id = e.currentTarget.dataset.id;
    let goods = that.data.goodsList[index];
    if(id == 1) {
      // 同步订单信息
      wx.showLoading();
      app.isToken(function goNext(token) {
        wx.request({
          url: app.globalData.apiURL + '/api/dms/order',
          data: {
            token,
            order_id: goods.order_id,
            raw_oid: goods.raw_oid,
            is_update: 1
          },
          success(res) {
            console.log(res)
            if(res.data.status == 201) {
              if (res.data.data.validate) {
                wx.hideLoading();
                wx.showToast({
                  title: '同步成功',
                })
                return
              }
              wx.showToast({
                title: res.data.message,
                icon: "none"
              })
              return
            }
            wx.showToast({
              title: '请求失败',
              icon: "none"
            })
          }
        })
      })
    } else if(id == 2) {
      wx.showModal({
        title: '提示',
        content: '是否取消发货',
        success(res) {
          if (res.confirm) {
            wx.showLoading();
            app.isToken(function goNext(token) {
              wx.request({
                url: app.globalData.apiURL + '/api/dms/demand/cancel',
                method: "PUT",
                data: {
                  token,
                  demand_id: goods.demand_id
                },
                success(res) {
                  console.log(res)
                  if (res.data.status == 201) {
                    that.getList();
                    wx.hideLoading();
                    return
                  }
                  wx.showToast({
                    title: res.data.message,
                    icon: "none"
                  })
                }
              })
            })
          } else if (res.cancel) {

          }
        }
      })
      //取消调货
    } else if (id == 3) {
      //修改调货价格
      that.setPrice(goods.id, goods.order_id, goods.deliver_amount)
      wx.hideLoading();
    } else if (id == 4) {
      //开始调货
      that.setPrice(goods.id, goods.order_id, goods.deliver_amount)
      wx.hideLoading();
    } else if (id == 5) {
     
      wx.showModal({
        title: '提示',
        content: '是否确认收货',
        success(res) {
          if (res.confirm) {
            wx.showLoading();
            app.isToken(function goNext(token) {
              wx.request({
                url: app.globalData.apiURL + '/api/dms/demand/confirm',
                method: "PUT",
                data: {
                  token,
                  demand_id: goods.demand_id
                },
                success(res) {
                  console.log(res)
                  if(res.data.status == 201) {
                    wx.hideLoading();
                    wx.showToast({
                      title: '已确认收货',
                    })
                    that.getList();
                    return
                  }
                  wx.showToast({
                    title: res.data.message,
                  })
                }
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },
  // 修改的事件
  setPrice(id, order_id, deliver_amount) {
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand/profit/autoCalculation',
        data: {
          token,
          goods_id: id
        },
        success: function(res) {
          if(res.data.status == 403) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }else {
            if (that.data.isGoNavigate == true) {
              wx.navigateTo({
                url: '/pages/startTransfer/startTransfer?id=' + id + "&order_id=" + order_id + "&deliver_amount=" + deliver_amount,
              })
              that.setData({
                isGoNavigate: false
              })
            }
          }
        }
      })
    })
  },
  // 获取商品列表参数
  getList() {
    let that = this;
    let time = new Date();
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/order/synchronization',
        method: "POST",
        data: {
          token
        },
        success(res) {
          let newTime = new Date();
          console.log(newTime - time)
          wx.request({
            url: app.globalData.apiURL + '/api/dms/order/demand/list',
            data: {
              token,
              status: that.data.status
            },
            success: function (res) {
             
              if (res.data.status == 200) {
                that.setData({
                  goodsList: res.data.data
                })
                wx.hideLoading()
              }
            }
          })
        }
      })
    })
  },
  // 单号复制
  copy(e) {
    var idx = e.currentTarget.dataset.index;
    var num = this.data.goodsList[idx].raw_oid;
    app.copy(num)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中 。。。',
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
    this.getList();
    this.setData({
      isGoNavigate: true
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
    let that = this;
    let page = that.data.page;
    page = page + 1
    console.log(page)
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/order/demand/list',
        data: {
          token,
          status: that.data.status,
          page: page,
          limit: 10
        },
        success: function (res) {
          if (res.data.status == 200) {
            let newArr = res.data.data;
            if (newArr.length == 0 ) {
              // 说明没有数据了
              wx.hideLoading()
              page = page - 1;
              console.log(page)
              wx.showToast({
                title: '已经到底了。',
                icon: "none"
              })
              that.setData({
                page
              })
              return
            }
            let goodsList = that.data.goodsList.concat(newArr);
            that.setData({
              goodsList,
              page
            })
            wx.hideLoading()
          }
        }
      })
    })
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
        var that = this;
        var shareObj = {
              title: "明价求货, 有货的大哥直接给我发货",
              path: '/pages/mine/mine',    
              imageUrl: '../../images/share_bg.png',     
      　};
    　　if(options.from == 'button'){
          var eData = options.target.dataset;
          shareObj.path = '/pages/shareAfter/shareAfter?userId=' + wx.getStorageSync("store_base").unique_id
  　　  }
　　    return shareObj;
  }
})