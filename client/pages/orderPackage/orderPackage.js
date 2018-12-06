const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    logged: false,
    userinfo: [],
    infoComfirmed: false,
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    userId: 0,
    array: ['京东', '邮局', '一饭', '二饭', '一饭蜂巢', '二饭蜂巢'],
    money: ['1', '2', '3', '4', '5', '6'],
    order_weight: ['<1KG', '1-2KG', '2-3KG', '3-5KG', '5KG以上'],
    sex: ['不限', '男', '女'],
    multiArray: [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '30']
    ],
    multiArray1: [
      ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8东', 'C8西', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14'],
      ['送楼下', '送上楼', '代保管']
    ],
    multiIndex: [0, 0, 0],
    multiIndex1: [0, 0, 0],

  },

  checkLogin:function(){
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

  onLoad: function(options) {
    
  },

  onShow:function(){
    this.checkLogin()
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  bindMultiPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  bindMultiPickerColumnChange1: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };
    data.multiIndex1[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  formSubmit: function(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', JSON.stringify(that.data.info))
    wx.request({
        url: config.service.order_packageUrl + "?order_info=" + JSON.stringify(e.detail.value) + "&user_id=" + that.data.userId,
        method: "GET",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(e.detail.value)
          console.log(res)
        }
      }),
      wx.showToast({
        title: '下单成功',
        icon: 'success',
        duration: 1000
      }),
      setTimeout(function() {
        wx.switchTab({
          url: '../homeOrder/homeOrder',
        })
      }, 1200)

  },

  bindGetUserInfo: function() {
    var that = this
    if (this.data.logged){
      if(!this.data.infoComfirmed){
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