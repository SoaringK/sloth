var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    modules: []
  },
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: config.service.canteen_selectUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res){
        that.setData({
          modules:res.data.data
        });
        console.log(res.data)
      }
    })
  },
})