var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    status: true,
    orderInfoDetail: {},
    userId: 0
  },
  onLoad: function (options) {
    var that = this;
    // 从缓存中得到订单信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log("读入userinfo")
        console.log(res)
        that.setData({
          userId: res.data.openId
        })
      },
    });
    wx.request({
      url: config.service.order_info_packageUrl + "?order_id=" + options.order_id,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(options.order_id)
        console.log(res)
        that.setData({
          orderInfoDetail: res.data.data,
          status: res.data.data[0].order_state
        });
      }
    })
  }

})