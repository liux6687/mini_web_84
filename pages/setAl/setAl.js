// pages/setAl/setAl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',//支付宝账号
    inputCode: '',//用户输入的验证码
    textStatus: 0,
    num: 5,
    code: '55555'//后台随机的验证码
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
    var userName = this.data.userName;
    var num = this.data.num;
    if(userName == '') {
      wx.showModal({
        title: '提示',
        content: '请输入支付宝账户',
      })
    }else {
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
            num: 5
          })
          clearInterval(time)
        }
      }.bind(this), 1000)
    }
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
    console.log(111)
    var { userName, inputCode, code } = this.data;
    if (userName == "" || inputCode == '') {
      wx.showModal({
        title: '提示',
        content: '请完整输入。。。',
      })
    }else if(inputCode != code) {
      wx.showModal({
        title: '提示',
        content: '验证码有误',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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