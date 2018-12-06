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
      key: 'user_myinfo',
      success: function(res) {
        that.setData({
          user_id:res.data.user_id,
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
    } else if (e.detail.value.addressarea == "") {
      warn = "请输入您的微信号！";
    } else {
      flag = true
    }

      wx.request({
        // 请后台修改下面config.service.changeAddressUrl这个位置变为changeUserInfoUrl
        url: config.service.changeUserInfoUrl + "?user_id=" + this.data.user_id + "&name=" + this.data.user_name + "&phone=" + this.data.user_phone + "&wechat=" + this.data.user_wechat,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success(res) {
          console.log("debug")
          console.log(res)
          wx.showToast({
            title: '修改信息成功',
            icon: 'success',
            duration: 2000
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