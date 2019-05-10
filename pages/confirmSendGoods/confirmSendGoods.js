// pages/confirmSendGoods/confirmSendGoods.js
const qiniuUploader = require("../../utils/qiniuUploader.js");
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_obj: {},
    receive_time: 0,
    penalty_hours: 0,
    demand_addr: {},
    user_addr: {},
    companyNameArr: [],
    companyCodeArr: [],
    companyIdArr: [],
    goodsInfo: {},
    deliver_log_id: 0,
    logistics_num: "", //物流单号
    idx: '', //物流公司索引
    uploadArr: [
      {
        add: false,
        text: "物流底单",
        imageURL: "",
      },
      {
        add: false,
        text: "防掉包扣",
        imageURL: "",
      }
    ]
  },
  // 确认发货按钮
  submit() {
    if (this.data.idx == "") {
      wx.showToast({
        title: '物流公司不能为空',
        icon: "none"
      })
      return
    }
    if (this.data.logistics_num == "") {
      wx.showToast({
        title: '物流单号不能为空',
        icon: "none"
      })
      return
    }
    let is = this.data.uploadArr.every((item, index) => {
      return item.imageURL != ""
    })
    if(!is) {
      wx.showToast({
        title: '请上传图片',
        icon: "none"
      })
      return
    }
    let that = this;
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/order',
        data: {
          token,
          order_id: that.data.goodsInfo.order_id,
          raw_oid: that.data.goodsInfo.raw_oid,
          is_update: 0
        },
        success(res) {
          console.log(res)
          if (res.data.data.validate) {
          // if (true) {
            // 可以接单
            console.log(11111)
            //商品信息  上传图片 单号  物流
            let { deliver_log_id, uploadArr, logistics_num, idx, companyNameArr, companyCodeArr} = that.data;
            let images = [];
            uploadArr.forEach((item, index) => {
              images.push(item.imageURL)
            })
            app.isToken(function goNext(token) {
              wx.request({
                url: app.globalData.apiURL + '/api/dms/deliver/send',
                method: "PUT",
                data: {
                  token,
                  deliver_id: deliver_log_id,
                  images,
                  waybill_company: companyCodeArr[idx],
                  express_type: companyNameArr[idx],
                  waybill_no: logistics_num
                },
                success(res) {
                  console.log(token)
                  console.log("33333", res)
                  if (res.data.status == 201) {
                    wx.navigateBack({
                      delta: 1
                    })
                  } else {
                    wx.showToast({
                      title: '数据请求失败',
                      icon: "none"
                    })
                  }
                }
              })
            })
          } else {
            // 不可调货
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }

        }
      })
    })
  },
  // 取消发货
  cancelSend() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '取消发货后您的保证金会被扣除并且会计入个人信用记录',
      success(res) {
        if (res.confirm) {
          app.isToken(function goNext(token) {
            wx.request({
              url: app.globalData.apiURL + '/api/dms/deliver/cancel',
              method: "PUT",
              data: {
                token,
                deliver_id: that.data.deliver_log_id
              },
              success(res) {
                console.log("取消发货", res)
                if (res.data.status == 201) {
                  wx.navigateBack({
                    delta: 1
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let goodsInfo = JSON.parse(options.goodsInfo);
    app.isToken(function goNext(token) {
      wx.request({
        url: app.globalData.apiURL + '/api/dms/deliver/logistics',
        data: {
          deliver_id: options.deliver_log_id,
          token
        },
        success (res) {
          if(res.data.status == 200) {
             setInterval(function() {
              let time_obj = app.countdown(res.data.data.receive_time, Number(res.data.data.penalty_hours) * 60 * 60);
              that.setData({
                time_obj
              })
            },1000)
            that.setData({
              demand_addr: res.data.data.demand_addr,
              user_addr: res.data.data.user_addr,
              deliver_log_id: options.deliver_log_id,
              goodsInfo
            })
            return
          }
          wx.showToast({
            title: res.data.message,
          })
        }
      })
    })
    // 获取物流列表
    wx.request({
      url: app.globalData.apiURL + '/api/dms/taobao/logistics',
      success(res){
        console.log(res)
        let companyList = res.data.data;
        let companyNameArr = [];
        let companyCodeArr = [];
        let companyIdArr = [];
        companyList.forEach((item, index) => {
          console.log(item.Name)
          companyNameArr.push(item.Name);
          companyCodeArr.push(item.Code);
          companyIdArr.push(item.Id)
        })
        that.setData({
          companyNameArr,
          companyCodeArr,
          companyIdArr,
        })

      }
    })
  },
  // 选择的哪一家物流公司
  bindPickerChange(e) {
    var idx = e.detail.value;
    this.setData({
      idx
    })
  },
  // 获取手动输入的单号
  getValue(e) {
    let value = e.detail.value;
    this.setData({
      logistics_num: value
    })
  },
  // 微信扫一扫功能
  scan() {
    let that = this;
    wx.scanCode({
      success(res) {
        that.setData({
          logistics_num: res.result
        })
      }
    })
  },
  // 上传图片
  uploadImg(e) {
    let that = this;
    let uploadArr = that.data.uploadArr;
    let idx = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let tempFilePaths = res.tempFilePaths[0];
        let imgName = tempFilePaths.substr(30, 50);
        qiniuUploader.upload(tempFilePaths, (res) => {
          uploadArr.forEach((item, index) => {
            if(idx == index) {
              item.add = true;
              item.imageURL = res.imageURL
            }
          })
          that.setData({
            uploadArr
          })
        },(error) => {
          console.log(error)
        },{
            region: 'NCN',
            key: 'uploads/_tmp/' + imgName,
            uploadURL: 'https://upload-z1.qiniup.com',
            domain: "http://qncdndev.tosneaker.com",
            uptoken: wx.getStorageSync("upload_token")
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
    var that = this
    // 请求七牛token
    app.isToken(function goNext(token){
      wx.request({
        url: app.globalData.apiURL + '/api/cloud-storage/qiniu/token',
        data: {
          token
        },
        success(res) {
          wx.setStorageSync("upload_token", res.data.data.upload_token);
        }
      })
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
    let shareObj = shareFunction(options);
    return shareObj;
  }
})