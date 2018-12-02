var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

// pages/order_info/order_info.js
Page({

  /**
   * 页面的初始数据
   */
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
      url: config.service.order_infoUrl+"?order_id="+options.order_id,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})