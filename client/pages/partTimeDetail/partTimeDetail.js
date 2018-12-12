var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    info: {}
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.service.take_ptjob_detailUrl + "?pt_id=" + options.pt_id,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          info: res.data.data.data[0]
        });
        console.log(res.data.data.data[0])
      }
    })
  },
})