var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    status: -1,
    customer: {},
    menu: {},
    userId: 0,
    infotype: 0,
    take_order_user: {},
    order_id: 0
  },

  onLoad: function(options) {
    var that = this;
    // 从缓存中得到订单信息
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          userId: res.data.openId
        })
      },
    });
    that.setData({
      infotype: options.infotype == 0 ? 0 : 1,
      order_id: options.order_id
    })
    wx.request({
      url: config.service.order_info_breakfastUrl + "?order_id=" + options.order_id,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        if(res.data.code==0){
          that.setData({
            menu: res.data.data.menu,
            customer: res.data.data.customer,
            status: res.data.data.status
          });
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
    if (that.data.infotype == 0) {
      wx.request({
        url: config.service.getTakeorder_user_info + "?order_id=" + options.order_id,
        success: function(res) {
          if(res.data.code==0){
            that.setData({
              take_order_user: res.data.data,
            })
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
    }
  },

  confirmOrder: function(options) {
    var that = this
    if (this.data.status == 1) {
      wx.showModal({
        title: '确认送达',
        content: '若已送达请点击确定',
        success: function() {
          wx.request({
            url: config.service.state_changeUrl + '?order_id=' + that.data.order_id + '&order_type=1',
            method: 'GET',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              if(res.data.code==0){
                that.setData({
                  status: 2,
                })
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
        }
      })
    }

  },

})