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
        if(res.data.code==0){
          that.setData({
            info: res.data.data.data[0]
          });
          // console.log(res.data.data.data[0])
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
      }
    })
  },
})