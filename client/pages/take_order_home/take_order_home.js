//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userId:0,
    food_order_id:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modules: [{
        "name": "代买早餐",
        "src": "../../images/1.png",
        "url": "../productList/productList"
      },
      {
        "name": "代拿快递",
        "src": "../../images/2.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "跑腿",
        "src": "../../images/3.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "代课",
        "src": "../../images/4.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "兼职",
        "src": "../../images/5.png",
        "url": "../canteen_select/canteen_select"
      },
      {
        "name": "其他下单",
        "src": "../../images/6.png",
        "url": "../canteen_select/canteen_select"
      }
    ],
    order: [],
    item: []
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: config.service.take_order_homeUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        that.setData({
          order: res.data.data.data
        });
        console.log(res.data)
      }
    }),
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
  },
  submit_take: function(e) {
    var that = this;
    wx.showModal({
      title: '确认订单',
      content: '点击确定接受订单',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
          var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
          var data = that.data.order;
          console.log("item")
          console.log(item)
          that.setData({
            order: data,
            item: item
          }),
          wx.request({
            url: config.service.take_orderUrl + "?food_order_id="+that.data.item[0].food_order_id+"&user_id="+that.data.userId,
            method: "GET",
            header: {
              "content-type": "application/json"
            },
            success: function (res) {
              console.log(res)
              var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
              var data = that.data.order;
              that.setData({
                order: data
              });
              wx.navigateTo({
                url: "../order_info/order_info?food_oder_id=" + item[0].food_oder_id
              })
            }
          })
          
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
          
        }
      }

    })
  }
})