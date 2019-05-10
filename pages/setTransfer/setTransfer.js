// pages/setTransfer/setTransfer.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    model1:false,
    model2: false,
    model3: false,
    model4: false,
    isLock: "",
    see_demand_way_arr: ["允许任何人查看", "仅允许完成平台验证的用户查看","仅允许您担保的用户查看"],
    can_deliver_way_arr: ["所有查看清单的用户","您担保的用户"],
    see_demand_way_text: "允许任何人查看",
    can_deliver_way_text: "所有查看清单的用户",
    profit_Pattern: ["按固定值计算", "按百分比计算"],
    moneyValue: "100", //固定利润VALUE
    percentValue: "5", //百分比value
    see_demand_way: 0, //查看您的调货列表索引
    can_deliver_way: 0, //为您调货索引
    profit_Pattern_index: 0 //利润计算方式索引值
  },
  // 提交
  submit() {
    let that = this;
    let { isLock, moneyValue, percentValue, see_demand_way, can_deliver_way, profit_Pattern_index} = that.data;
    if (isLock == true) {
      that.setData({
        isLock: false
      })
      app.isToken(function goNext(token) {
        wx.request({
          url: app.globalData.apiURL + '/api/store/setting',
          method: "PUT",
          data: {
            token,
            fixed: moneyValue,
            percentage: percentValue / 100,
            see_demand_way,
            can_deliver_way,
            auto_calculation_type: profit_Pattern_index
          },
          success(res) {
            console.log(res)
            if (res.data.status == 201) {
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
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: "设置失败",
                icon: "none"
              })
            }
          }
        })
      })
    }
  },
  // 查看列表选择
  see_demand_way_select(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      see_demand_way: idx,
      see_demand_way_text: this.data.see_demand_way_arr[idx]
    })
  },
  // 为您调货选择
  can_deliver_way_select(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({
      can_deliver_way: idx,
      can_deliver_way_text: this.data.can_deliver_way_arr[idx]
    })
  },
  // 弹出弹出框
  showModel(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      // 查看调货列表
      this.setData({
        model1: true
      })
    }else if(idx == 2) {
      // 为您调货
      this.setData({
        model2: true
      })
    }else if (idx == 3) {
      // 按固定利润
      this.setData({
        model3: true
      })
    }else if(idx == 4) {
      // 按百分比
      this.setData({
        model4: true
      })
    }
  },
  // 弹出框取消
  closeModel(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      this.setData({
        model1: false
      })
    }else if (idx == 2) {
      this.setData({
        model2: false
      })
    }else if (idx == 3) {
      this.setData({
        model3: false
      })
    }else if (idx == 4) {
      this.setData({
        model4: false
      })
    }
  },
  // 设置
  setValue(e) {
    var idx = e.currentTarget.dataset.index;
    if(idx == 3) {
      this.setData({
        moneyValue: e.detail.value
      })
    } else if (idx == 4) {
      this.setData({
        percentValue: e.detail.value
      })
    }
  },
  // 选择利润计算方式
  bindPickerChange(e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      profit_Pattern_index: index
    })
  },
  //  * 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      moneyValue: userInfo.store_info.fixed, //固定利润VALUE
      percentValue: userInfo.store_info.percentage * 100, //百分比value
      userInfo,
      see_demand_way_text: this.data.see_demand_way_arr[userInfo.store_info.see_demand_way],
      can_deliver_way_text: this.data.can_deliver_way_arr[userInfo.store_info.can_deliver_way],
      see_demand_way: userInfo.store_info.see_demand_way,
      can_deliver_way: userInfo.store_info.can_deliver_way,
      profit_Pattern_index: userInfo.store_info.auto_calculation_type
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
      this.setData({
        isLock: true
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})