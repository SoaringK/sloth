const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    logged:false,
    userinfo:[],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    userId: 0,
    sex: ['男', '女'],
    multiArray: [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    ],
    multiIndex: [0, 0, 0],
  },
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    // 从缓存中得到订单信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log("读入userinfo")
        console.log(res)
        that.setData({
          logged:true,
          userinfo:res.data,
          userId: res.data.openId
        })
      },
      fail:function(res){
        console.log("还没有登录")
      }
    });
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: config.service.substituteOrderUrl + "?order_info=" + JSON.stringify(e.detail.value) + "&user_id=" + that.data.userId,
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(e.detail.value)
        console.log(res)
      }
    }),
      wx.showToast({
        title: '下单成功',
        icon: 'success',
        duration: 1000
      }),
      setTimeout(function () {
        wx.switchTab({
          url: '../home/home',
        })
      }, 1200)

  },
  bindGetUserInfo: function () {
    if (this.data.logged) return
    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },

})