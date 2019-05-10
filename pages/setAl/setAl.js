// pages/setAl/setAl.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    userName:'',//支付宝账号
    inputCode: '',//用户输入的验证码
    textStatus: 0,
    num: 60,
    disabled: 1
  },
  // 获取支付宝账号
  getAlUserName(e) {
    var userName = e.detail.value;
    this.setData({
      userName
    })
  },
  // 清空input框
  close() {
    this.setData({
      userName: ''
    })
  },
  // 获取验证码
  getCode() {
    let that = this;
    let userName = this.data.userName;
    let reg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
    var num = this.data.num;
    if(userName == '') {
      wx.showModal({
        title: '提示',
        content: '请输入支付宝账户',
      })
      return
    } 
    if (!reg.test(userName)) {
      wx.showToast({
        title: '请输入正确的支付宝账号',
        icon: "none"
      })
      return
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/captcha/sms',
        data: {
          mobile: that.data.mobile,
          tpl: "ali_bind"
        },
        success(res) {
          console.log(res)
          if(res.data.status == 200) {
            that.setData({
              disabled: 2
            })
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }else {
            wx.showToast({
              title: '请求失败',
              icon: "none"
            })
          }
        }
      })
    })
    
    this.setData({
      textStatus: 1
    })
    var time = setInterval(function () {
      num -= 1
      this.setData({
        num
      })
      if (num == 0) {
        this.setData({
          textStatus: 0,
          num: 60
        })
        clearInterval(time)
      }
    }.bind(this), 1000)
  },
  // 验证码输入
  code(e) {
    var inputCode = e.detail.value;
    this.setData({
      inputCode
    })
  },
  // 最后的确认
  submit() {
    let that = this;
    var { userName, inputCode, code } = this.data;
    if (userName == "" || inputCode == '') {
      wx.showModal({
        title: '提示',
        content: '请完整输入。。。',
      })
    }
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/wallet/bind-alipay',
        method: "PUT",
        data: {
          token,
          mobile: that.data.mobile,
          alipay_realname: that.data.userName,
          captcha: that.data.inputCode
        },
        success(res) {
          if(res.data.status == 201) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
            wx.navigateBack({
              delta: 1
            })
            return
          }
          wx.showToast({
            title: res.data.message,
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mobile = wx.getStorageSync("userInfo").mobile;
    this.setData({
      mobile
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
  onShareAppMessage: function (options) {
    let shareObj = app.shareFunction(options);
    return shareObj;
  }
})