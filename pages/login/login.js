// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneModal: false,
    nameModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 手机立即验证 
  verifyPhone(e) {
    var that = this;
    that.setData({
      phoneModal: true
    })
  },
  // 手机取消验证
  phoneOther() {
    this.setData({
      phoneModal: false
    })
  },
  // 实名立即验证
  verifyName() {
    this.setData({
      nameModal: true
    })
  },
  // 实名取消验证
  nameOther() {
    this.setData({
      nameModal: false
    })
  },
  // 获取手机号事件
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.showToast({
        title: '',
        duration: 100000,
        icon: 'loading',
        mask: true
      })
      var detail = e.detail;
      wx.login({
        success: function (res) {
          if (res.code) {
            var loginDataAgain = res;
            wx.request({
              url: app.globalData.url + '/api/wechat/ma/auth/bind-mobile',
              method: 'POST',
              data: {
                miniapp_name: "care",
                js_code: loginDataAgain.code,
                user_info: that.data.userInfoData,
                mobile_info: detail
              },
              success: function (res) {
                console.log(res)
                // if (res.data.data.token != '') {
                //   wx.hideToast();
                //   var timestamp = Date.parse(new Date());
                //   timestamp = timestamp / 1000;
                //   wx.setStorageSync('time', timestamp)
                //   wx.setStorageSync('token', res.data.data.token)
                //   wx.setStorageSync('phone', res.data.data.user_info.profile.mobile)
                //   // wx.setStorageSync('openId', res.data.data.openid)
                //   wx.setStorageSync('im_staff_tid', res.data.data.user_info.profile.im_staff_tid)
                //   wx.setStorageSync('prompt', true)
                //   // 美洽登陸數據
                //   wx.setStorageSync('avatar', res.data.data.user_info.profile.avatar);
                //   wx.setStorageSync('age', res.data.data.user_info.profile.age);
                //   wx.setStorageSync('name', res.data.data.user_info.name);
                //   wx.setStorageSync('userid', res.data.data.user_info.id);
                //   wx.setStorageSync('address', res.data.data.user_info.profile.location_name);
                //   wx.setStorageSync('gender', res.data.data.user_info.profile.sex);

                //   // 网易云信
                //   // wx.setStorageSync('account', res.data.data.user_info.profile.im_user)
                //   // wx.setStorageSync('password', res.data.data.user_info.profile.im_token)
                //   wx.navigateBack({
                //     delta: 1
                //   });
                //   app.globalData.isToken = 1;
                //   wx.showToast({
                //     title: '绑定成功',
                //     duration: 1500,
                //     icon: 'none',
                //     mask: true
                //   })
                //   setTimeout(function () {
                //     wx.navigateBack({
                //       delta: 1
                //     });
                //   }, 1500);
                //   // 发送pid
                //   var pid = wx.getStorageSync('pid');
                //   if (pid) {
                //     wx.request({
                //       url: that.data.url + '/api/wechat/ma/parent/bind',
                //       method: 'POST',
                //       data: {
                //         token: res.data.data.token,
                //         miniapp_name: 'care',
                //         pid: pid
                //       },
                //       success: function (res) {
                //         if (res.data.status == 201) {
                //           wx.removeStorageSync('pid');
                //         }
                //       },
                //       fail: function (error) {
                //         console.log(error)
                //       }
                //     })
                //   }
                //   wx.hideToast();
                // }
              },
              fail: function (e) {
                console.log(e)
              }
            })
          }
        }
      })

    }
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