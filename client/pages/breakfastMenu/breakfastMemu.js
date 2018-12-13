var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

// pages/breakfastMenu/breakfastMemu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoComfirmed:false,//是否
    logged:false,//是否登录
    userinfo:{},//用户信息
    shop: [],//店铺信息
    menu: [],//菜单
    selected: 0,//选择的事物类别
    cost: 0,//花费
    total_item_numb: 0,//总共的商品数目，和购物车查看有关
    tapCart: false,//是否出现购物车浮窗
    // id: 0,
    shop_id: 0
  }, 

  // 自定义的函数

  // 商品页的增加商品数量
  addToTrolley: function (e) {
    var that = this;
    var info = that.data.menu;
    var index = e.currentTarget.dataset.index;
    var selected = that.data.selected;
    info[selected].menuContent[index].numb++;
    // 更新total
    info[selected].menuContent[index].total +=info[selected].menuContent[index].price;
    info[selected].menuContent[index].total = parseFloat(info[selected].menuContent[index].total.toFixed(2));
    this.setData({
      cost: parseFloat((that.data.cost + that.data.menu[selected].menuContent[index].price).toFixed(2)),
      menu: info,
      total_item_numb:that.data.total_item_numb+1,
    })
  },
  // 商品页的减少商品数量
  removeFromTrolley: function (e) {
    var that = this;
    var info = that.data.menu;
    var index = e.currentTarget.dataset.index;
    var selected = that.data.selected;
    if (info[selected].menuContent[index].numb != 0) {
      info[selected].menuContent[index].numb--;
      // 更新total
      info[selected].menuContent[index].total -=info[selected].menuContent[index].price;
      info[selected].menuContent[index].total = parseFloat(info[selected].menuContent[index].total.toFixed(2));
      this.setData({
        cost: parseFloat((that.data.cost - that.data.menu[selected].menuContent[index].price).toFixed(2)),
        menu: info,
        total_item_numb:that.data.total_item_numb-1,
      });
    }
  },
  // 切换早餐类别
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },

// 隐藏浮窗
  hideCartDetail: function () {
    this.setData({
      tapCart: false
    });
  },
  // 购物车减少商品数量
  tapReduceCart: function (e) {
    var that = this;
    var selected = e.currentTarget.dataset.class;
    var index = e.currentTarget.dataset.index;
    var info = that.data.menu;
    if (info[selected].menuContent[index].numb != 0) {
      info[selected].menuContent[index].numb--;
      // 更新total
      info[selected].menuContent[index].total -=info[selected].menuContent[index].price;
      info[selected].menuContent[index].total = parseFloat(info[selected].menuContent[index].total.toFixed(2));
      this.setData({
        cost: parseFloat((that.data.cost - that.data.menu[selected].menuContent[index].price).toFixed(2)),
        menu: info,
        total_item_numb:that.data.total_item_numb-1,
      });
    }
  },
  // 购物车增加商品数量
  tapAddCart: function (e) {
    var that = this;
    var info = that.data.menu;
    var index = e.currentTarget.dataset.index;
    var selected = that.data.selected;
    info[selected].menuContent[index].numb++;
    // 更新total
    info[selected].menuContent[index].total +=info[selected].menuContent[index].price;
    info[selected].menuContent[index].total = parseFloat(info[selected].menuContent[index].total.toFixed(2));
    this.setData({
      cost: parseFloat((that.data.cost + that.data.menu[selected].menuContent[index].price).toFixed(2)),
      menu: info,
      total_item_numb:that.data.total_item_numb+1,
    })
  },
  // 点击购物车时候切换浮窗是否显示
  showCartDetail: function () {
    this.setData({
      tapCart:!this.data.tapCart
    })
  },
// 删除购物车所有商品
  deleteAllFromCart: function(e){
    var that = this;
    var info = that.data.menu;
    for (var i = 0, len1 = info.length; i < len1; i++) {
      for (var j = 0, len2 = info[i].menuContent.length; j < len2; j++) {
        if (info[i].menuContent[j].numb != 0) {
          info[i].menuContent[j].numb=0;
        }
      }
    }
    this.setData({
      cost:0,
      total_item_numb:0,
      menu: info,
      cost: 0,
      total_item_numb: 0,
      tapCart: false
    })
  },
//  提交购物车内商品至订单确认页
  submitAll: function(e){
    var that = this;
    var info = that.data.menu;
    var shop = that.data.shop;
    var cart=[];
    for(var i=0,len1=info.length;i<len1;i++){
      for(var j=0,len2=info[i].menuContent.length;j<len2;j++){
        if(info[i].menuContent[j].numb!=0){
          cart.push(info[i].menuContent[j]);
        }
      }
    }
    // 添加缓存
    wx.setStorage({
      key: "list",
      data: cart,
      success: function (res) {
      }
    });
    wx.setStorage({
      key: "cost",
      data: that.data.cost,
      success: function (res) {
      }
    });
    wx.setStorage({
      key: "shop",
      data: shop,
      success: function (res) {
      }
    });
    wx.setStorage({
      key: "id",
      data: that.data.shop_id,
      success: function (res) {
      }
    });
  },
// 检查是否登录
checkLogin: function () {
  var that = this;
  wx.getStorage({
    key: 'userinfo',
    success: function (res) {
      that.setData({
        userinfo: res.data,
        logged: true
      })
      wx.getStorage({
        key: 'user_myinfo',
        success: function (res) {
          if (res.data.user_name != 0) {
            that.setData({
              infoComfirmed: true
            })
          } else {
            wx.showModal({
              title: '您的信息未完善!',
              content: '请先完善信息',
              confirmText: '去完善',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../myInfo/myInfo',
                  })
                }
              }
            })
          }
        },
        fail: function () {
          wx.request({
            url: config.service.getUserInfoUrl + '?user_id=' + that.data.userinfo.openId,
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success(res) {
              if (res.data.data.data.user_name != 0) {
                that.setData({
                  infoComfirmed: true
                })
                wx.setStorage({
                  key: 'user_myinfo',
                  data: res.data.data.data,
                })
              } else {
                wx.showModal({
                  title: '您的信息未完善!',
                  content: '请先完善信息',
                  confirmText: '去完善',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../myInfo/myInfo',
                      })
                    }
                  }
                })
              }
            },
          })
        }
      })
    }
  })
},
 //是否完善了个人信息
 isGetUserInfo: function () {
  var that = this
  if (this.data.logged) {
    if (!this.data.infoComfirmed) {
      wx.showModal({
        title: '您的信息未完善!',
        content: '请先完善信息',
        confirmText: '去完善',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../myInfo/myInfo',
            })
          }
        }
      })
      return
    }
  }

  util.showBusy('正在登录')

  const session = qcloud.Session.get()

  if (session) {
    // 第二次登录
    // 或者本地已经有登录态
    // 可使用本函数更新登录态
    qcloud.loginWithCode({
      success: res => {
        this.setData({
          userinfo: res,
          logged: true
        }, function () {
          that.onShow()
        })
        util.showSuccess('登录成功')
      },
      fail: err => {
        util.showModel('登录错误', err.message)
      }
    })
  } else {
    // 首次登录
    qcloud.login({
      success: res => {
        this.setData({
          userinfo: res,
          logged: true
        }, function () {
          that.onShow()
        })
        util.showSuccess('登录成功')
      },
      fail: err => {
        util.showModel('登录错误', err.message)
      }
    })
  }

},
//检查是否空单
isEmptyOrder: function(){
  wx.showModal({
    title: '您还未购买任何商品!',
    content: '请先选择您想购买的商品',
    confirmText: '确定',
    success: function (res) {
      if (res.confirm) {
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;

    // 用店铺id去get数据
    wx.request({
      url: config.service.breakfastMemuUrl + "?id=" + options.canId,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          menu: res.data.data.menu,
          shop: res.data.data.shop,
          shop_id: options.canId
        });
      }
    })
  },


  onShow: function () {
    this.checkLogin()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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