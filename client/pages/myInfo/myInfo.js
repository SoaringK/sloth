var app = getApp();
var config = require('../../config');

Page({
  data: {
    height: 20,
    focus: false,
    user_id: 0,
    user_wechat: [],
    user_name: [],
    user_phone: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          user_id: res.data.openId,
        })
      },
    })

    wx.getStorage({
      key: 'user_myinfo',
      success: function(res) {
        that.setData({  
          user_name:res.data.user_name,
          user_phone:res.data.user_tel,
          user_wechat:res.data.user_wechat
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  formSubmit: function (e) {

    var warn = "";
    var that = this;
    var flag = false
    
    if (e.detail.value.namearea == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phonearea == "") {
      warn = "请填写您的手机号！";
    } else if (e.detail.value.wechatarea == "") {
      warn = "请输入您的微信号！";
    } else {
      flag = true
    }

      wx.request({
        url: config.service.changeUserInfoUrl + "?user_id=" + that.data.user_id + "&name=" + e.detail.value.namearea + "&phone=" + e.detail.value.phonearea + "&wechat=" + e.detail.value.wechatarea,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success(res) {
          if(res.data.code==0){
            wx.setStorage({
              key: 'user_myinfo',
              data: {
                user_id:that.data.user_id,
                user_name: e.detail.value.namearea,
                user_tel: e.detail.value.phonearea,
                user_wechat: e.detail.value.wechatarea
              },
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
            wx.showToast({
              title: '修改信息成功',
              icon: 'success',
              duration: 2000
            }),
            setTimeout(function () {
              wx.switchTab({
                url: '../homeMy/homeMy',
              })
            }, 1200)
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
      })
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },

})