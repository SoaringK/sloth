const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    infoComfirmed:false,
    logged:false,
    userinfo:[],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    userId: 0,
    date: '2018-11-17',
    sex: ['男', '女'],
    type1: ['校内跑腿','代购'],
    type2: ['文件', '钥匙', '充电宝', '手机', '鲜花', '其他',],
    multiArray: [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    ],
    multiIndex: [0, 0, 0],
    startpoint:'',
    endpoint:'',
    profit:'',
    otherrequire:'',
    contactname:'',
    contacttel:'',
    contactwechat:'',
  },

  checklogin: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userinfo: res.data,
          logged: true
        })
        wx.getStorage({
          key: 'user_myinfo',
          success: function (res) {
            console.log("从缓存读取信息： " + res.data)
            if (res.data.user_name != 0) {
              that.setData({
                infoComfirmed: true
              })
              console.log("已完善信息")
            } else {
              wx.showModal({
                title: '您的信息未完善!',
                content: '请先完善信息',
                confirmText: '去完善',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../myInfo/myInfo',
                    })
                  }
                }
              })
              // console.log("还未完善信息！")
            }
          },
          fail: function () {
            wx.request({
              url: config.service.getUserInfoUrl + '?user_id=' + that.data.userinfo.openId,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success(res) {
                console.log("从数据库读取: " + res.data.data.data)
                if (res.data.data.data.user_name != 0) {
                  that.setData({
                    infoComfirmed: true
                  })
                  wx.setStorage({
                    key: 'user_myinfo',
                    data: res.data.data.data,
                  })
                  console.log("已完善信息")
                } else {
                  wx.showModal({
                    title: '您的信息未完善!',
                    content: '请先完善信息',
                    confirmText: '去完善',
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../myInfo/myInfo',
                        })
                      }
                    }
                  })
                }
              },
            })
          }
        })
      }
    })
  },


  onShow:function()
  {
    this.checklogin()
  },

  onLoad:function(){},

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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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

  startPoint: function(e){
    this.setData({
      startpoint: e.detail.value,
    })
  },

  emptystartPoint: function(){
    wx.showModal({
      title: '您还未输入起点!',
      content: '请先输入起点',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },

  endPoint: function(e){
    this.setData({
      endpoint: e.detail.value,
    })
  },

  emptyendPoint: function(){
    wx.showModal({
      title: '您还未输入目的地!',
      content: '请先输入目的地',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },

  Profit: function(e){
    this.setData({
      profit: e.detail.value,
    })
  },

  emptyProfit: function(){
    wx.showModal({
      title: '您还未输入费用!',
      content: '请先输入费用',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },
  otherRequire: function(e){
    this.setData({
      otherrequire: e.detail.value,
    })
  },

  emptyotherRequire: function(){
    wx.showModal({
      title: '您还未输入其他要求!',
      content: '若没有要求请填“无”',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },

  contactName: function(e){
    this.setData({
      contactname: e.detail.value,
    })
  },

  emptycontactName: function(){
    wx.showModal({
      title: '您还未输入联系人!',
      content: '请先输入联系人',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },

  contactTel: function(e){
    this.setData({
      contacttel: e.detail.value,
    })
  },

  emptycontactTel: function(){
    wx.showModal({
      title: '您还未输入联系人电话!',
      content: '请先输入联系人电话',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },

  contactWechat: function(e){
    this.setData({
      contactwechat: e.detail.value,
    })
  },

  emptycontactWechat: function(){
    wx.showModal({
      title: '您还未输入联系人微信!',
      content: '请先输入联系人微信',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: config.service.legsworkOrderUrl + "?order_info=" + JSON.stringify(e.detail.value) + "&user_id=" + that.data.userinfo.openId,
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
          url: '../homeOrder/homeOrder',
        })
      }, 1200)

  },
  bindGetUserInfo: function () {
    var that = this
    if (this.data.logged) {
      if (!this.data.infoComfirmed) {
        wx.showModal({
          title: '您的信息未完善!',
          content: '请先完善信息',
          confirmText: '去完善',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../myInfo/myInfo',
              })
            }
          }
        })
        return
      }
    }

    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({
            userinfo: res,
            logged: true
          }, function () {
            that.onShow()
          })
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
          this.setData({
            userinfo: res,
            logged: true
          }, function () {
            that.onShow()
          })
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