var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    height: 20,
    focus: false,
    userId:0,
    // dormitory:保存picker中的下拉信息
    dormitory:[
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "C10",
      "c11",
      "c12",
      "c13",
      "c14",
      "c15",
    ],
    // dormitory_index：标志选中的下标
    dormitory_index:0
  },
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userId: res.data.openId
        })
      },
    });
  },
  formSubmit: function (e) {
    var that = this;
    //防止信息为空
    if (e.detail.value.namearea == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的姓名！"
      })
    }
    else if (e.detail.value.phonearea == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的手机号！"
      })
    }
    else if (e.detail.value.addressarea == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的宿舍号！"
      })
    }
    else if (e.detail.value.wechatarea == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的微信号！"
      })
    }
    else
    {
      // console.log(e)
      wx.request({
        // building信息保存的是下标
        url: config.service.addAddressUrl + "?cust_name=" + e.detail.value.namearea + "&cust_wechat="+e.detail.value.wechatarea+"&cust_phone=" + e.detail.value.phonearea + "&cust_addr_room=" + e.detail.value.addressarea +"&user_id="+that.data.userId+ "&cust_addr_building="+that.data.dormitory_index,
        method: "GET",
        header: {
          "content-type": "application/x-wwww-form-urlencoded"
        },
        success: function (res) {
          var address = {
            cust_id: that.data.userId,
            cust_name: e.detail.value.namearea,
            cust_phone: e.detail.value.phonearea,
            cust_addr_room: e.detail.value.addressarea,
            cust_Wechat: e.detail.value.wechatarea,
            cust_addr_building:that.data.dormitory_index,
            default_id:0,
            addr_id:0//稍后修改
          };
          var pages = getCurrentPages();
          var prevPage = pages[pages.length-2];
          address.addr_id = prevPage.data.customer.length;
          var customer = prevPage.data.customer;
          customer.push(address);
          prevPage.setData({
            customer:customer,
            m: 1
          });
          wx.showToast({
            title: '新增地址成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function (e) {
            // 成功后返回上一页
            wx.navigateBack({
              delta:1
            })
          }, 2000)
        }
      })
    }
  },
  dormitory_change: function(e){
    var that = this;
    that.setData({
      dormitory_index:e.detail.value
    });
  }
})