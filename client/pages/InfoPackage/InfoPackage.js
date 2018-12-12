var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    status: -1,
    orderInfoDetail: {},
    userId: 0,
    infotype: 0,
    take_order_user: {}
  },

  onLoad: function (options) {
    var that = this;
    // 从缓存中得到订单信息
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userId: res.data.openId
        })
      },
    });
    /*infotype
        0:显示接单人信息
        1:显示下单人信息
    */
    that.setData({
      infotype: options.infotype == 0 ? 0 : 1
    })
    wx.request({
      url: config.service.order_info_packageUrl + "?order_id=" + options.order_id,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          orderInfoDetail: res.data.data,
          status: res.data.data[0].order_state
        });
      }
    })
    if (that.data.infotype == 0) {
      wx.request({
        url: config.service.getTakeorder_user_info + "?order_id=" + options.order_id,
        success: function (res) {
          that.setData({
            take_order_user: res.data.data,
          })

        }
      })
    }
  },
  
  confirmOrder: function (e) {
    var that = this
    if (this.data.status == 1) {
      wx.showModal({
        title: '确认送达',
        content: '若已送达请点击确定',
        success: function () {
          wx.request({
            url: config.service.state_changeUrl + '?order_id=' + that.data.orderInfoDetail[0].order_id + '&order_type=3',
            method: 'GET',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              that.setData({
                status: 2,
              })
            }
          })
        }
      })
    }

  },

})