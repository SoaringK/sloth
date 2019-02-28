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
    packagenum:'',
    contactname:'',
    contacttel:'',
    contactwechat:'',
  },

  checkLogin:function(){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userinfo: res.data,
          logged: true
        })
        wx.getStorage({
          key: 'user_myinfo',
          success: function (res) {
            if (res.data.user_name != 0) {
              that.setData({
                infoComfirmed: true
              })
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
          fail: function () {
            wx.request({
              url: config.service.getUserInfoUrl + '?user_id=' + that.data.userinfo.openId,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success(res) {
                if (res.data.data.data.user_name != 0) {
                  that.setData({
                    infoComfirmed: true
                  })
                  wx.setStorage({
                    key: 'user_myinfo',
                    data: res.data.data.data,
                  })
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
              }
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
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  bindMultiPickerChange1: function(e) {
    this.setData({
      multiIndex1: e.detail.value
    })
  },
  bindMultiPickerColumnChange1: function(e) {
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };
    data.multiIndex1[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  packageNum: function(e){
    this.setData({
      packagenum: e.detail.value,
    })
  },

  emptypackageNum: function(){
    wx.showModal({
      title: '您还未输入取件码!',
      content: '请先输入您的取件码',
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

  packageOrderSubmit: function(e) {
    var that = this;
    wx.request({
        url: config.service.order_packageUrl + "?order_info=" + JSON.stringify(e.detail.value) + "&user_id=" + that.data.userinfo.openId,
        method: "GET",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
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