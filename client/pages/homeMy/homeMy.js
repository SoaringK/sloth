// client/pages/logintest/logintest.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    user_myinfo: {},
    userInfo: {},
    infoComfirmed:false,
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  bindGetUserInfo: function() {

    var that = this
    if (this.data.logged) return

    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({
            userInfo: res,
            logged: true
          },function(){
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
            userInfo: res,
            logged: true
          },function(){
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

  // 切换是否带有登录态
  switchRequestMode: function(e) {
    this.setData({
      takeSession: e.detail.value
    })
    this.doRequest()
  },

  doRequest: function() {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    }
    if (this.data.takeSession) { // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else { // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

  logout: function() {
    wx.clearStorage();
    this.setData({
      userInfo: {},
      logged: false
    });
    this.onLoad();

  },

  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          userInfo: res.data,
          logged: true
        })
        wx.getStorage({
          key: 'user_myinfo',
          success: function(res) {
            if(res.data.user_name!=0){
              that.setData({
                infoComfirmed:true,
                user_myinfo:res.data
              })
            }else{
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
          fail:function(){
            wx.request({
              url: config.service.getUserInfoUrl + '?user_id=' + that.data.userInfo.openId,
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              success(res) {
                if(res.data.code==0){
                  if(res.data.data.data.user_name!=0){
                    that.setData({
                      user_myinfo: res.data.data.data,
                      infoComfirmed:true
                    })
                    wx.setStorage({
                      key: 'user_myinfo',
                      data: res.data.data.data,
                    })
                  }else{
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
                else{
                  wx.showModal({
                    title: '请求错误',
                    content: '错误码：'+res.data.code,
                    confirmText: '确定',
                    success: function (res) {
                      if (res.confirm) {
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
})