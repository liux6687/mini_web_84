// pages/myService/myService.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1: 1,
    select2: 1,
    item1: null,
  },
  switch(e) {
    var { select1, select2 } = this.data;
    var that = this;
    var idx = e.currentTarget.dataset.index;
    if(idx == 1) {
      if (select1 != 0) {
        // 说明没选中 发请求  请求选中
        that.setData({
          select1: 0
        })
        that.setService(0) 
      }else {
        // 说明选中了
        that.setData({
          select1: 1
        })
        that.setService(0) 
      }
    }else if(idx == 2) {
      if (select2 != 0) {
        // 说明没选中 发请求  请求选中
        that.setData({
          select2: 0
        })
        that.setService(1)
      } else {
        // 说明选中了
        that.setData({
          select2: 1
        })
        that.setService(1)
      }
    }
  },
  setService(service_type) {
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/service',
        method: "POST",
        data: {
          token,
          service_type: service_type
        },
        success(res) {
          if(res.data.status == 201) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          } 
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/service',
        data: {
          token
        },
        success(res) {
          if(res.data.status == 200) {
            let arr = res.data.data;
            for(let i = 0; i < arr.length; i++) {
              if (arr[i].service_type == 0) {
                that.setData({
                  select1: 0
                })
              } else if (arr[i].service_type == 1) {
                that.setData({
                  select2: 0
                })
              }
            }
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