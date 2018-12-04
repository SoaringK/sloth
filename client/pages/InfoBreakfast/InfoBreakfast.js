var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    status:true,
    customer:{},
    menu:{},
    userId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      url: config.service.order_info_breakfastUrl+"?order_id="+options.order_id,
      method:"GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(options.order_id)
        console.log(res)
        that.setData({
          menu: res.data.data.menu,
          customer: res.data.data.customer,
          status: res.data.data.status
        });
      }
    })
  }

  

})