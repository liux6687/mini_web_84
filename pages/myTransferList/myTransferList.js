// pages/myTransferList/myTransferList.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelShow: false,
    statusArr: ["全部订单","等待接单","已经接单","已发货","已完成","已取消","已下架"],
    item: "全部订单",
    status: 0,
    goodsList: []
  },
  // 设置
  gotoSet() {
    wx.navigateTo({
      url: '/pages/setTransfer/setTransfer',
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
    var idx = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    var that = this;
    that.setData({
      modelShow: false,
      item,
      status: idx
    })
    that.getList();  
  },
  // 按钮点击事件
  btnClick(e) {
    // 点击的第几个商品
    var index = e.currentTarget.dataset.index;
    // 点击的第几个按钮
    var id = e.currentTarget.dataset.id;
    var goods = this.data.goodsList[index];
    if(id == 1) {
      // 同步订单信息
    } else if(id == 2) {
      //取消调货
    } else if (id == 3) {
      //修改调货价格
      this.setPrice(goods.id)
    } else if (id == 4) {
      //开始调货
      this.setPrice(goods.id)
    }
    
  },
  // 修改的事件
  setPrice(goods_id) {
    console.log(111)
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/demand/profit/autoCalculation',
        data: {
          token,
          goods_id
        },
        success: function(res) {
          console.log(res)
          // if(res.data.status == 403) {
          //   wx.showToast({
          //     title: res.data.message,
          //     icon: "none"
          //   })
          // }else {
            wx.navigateTo({
              url: '/pages/startTransfer/startTransfer?goods_id=' + goods_id,
            })
          // }
        }
      })
    })
  },
  // 获取商品列表参数
  getList() {
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/order/demand/list',
        data: {
          token,
          status: that.data.status
        },
        success: function (res) {
          console.log(res.data.data)
          if(res.data.status == 200) {
            that.setData({
              goodsList: res.data.data
            })
          }
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
    this.getList();
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
  onShareAppMessage: function () {

  }
})