var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

// pages/breakfastMenu/breakfastMemu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoComfirmed:false,
    logged:false,
    userinfo:{},
    shop: [],
    menu: [],
    selected: 0,
    cost: 0,
    total_item_numb: 0,
    tapCart: false,
    id: 0,
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

  // addCart: function (id) {
  //   var num = this.data.cart.list[id] || 0;
  //   this.data.cart.list[id] = num + 1;
  //   this.countCart();
  // },
  // reduceCart: function (id) {
  //   var num = this.data.cart.list[id] || 0;
  //   if (num <= 1) {
  //     delete this.data.cart.list[id];
  //   } else {
  //     this.data.cart.list[id] = num - 1;
  //   }
  //   this.countCart();
  // },
// 隐藏浮窗
  hideCartDetail: function () {
    this.setData({
      tapCart: false
    });
  },
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
  // 这个submit是确定订单页的submit？？？？为啥在这
  // submit: function (e) {
  //   server.sendTemplate(e.detail.formId, null, function (res) {
  //     if (res.data.errorcode == 0) {
  //       wx.showModal({
  //         showCancel: false,
  //         title: '恭喜',
  //         content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
  //         success: function (res) {
  //           if (res.confirm) {
  //             wx.navigateBack();
  //           }
  //         }
  //       })
  //     }
  //   }, function (res) {
  //     console.log(res)
  //   });
  // },

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
 
  submit: function(e){
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
        console.log("list setStorage success");
      }
    });
    // 设置cost,其实不传也可以的，看基基怎么要数据
    wx.setStorage({
      key: "cost",
      data: that.data.cost,
      success: function (res) {
        console.log("cost setStorage success");
      }
    });
    wx.setStorage({
      key: "shop",
      data: shop,
      success: function (res) {
        console.log("shop setStorage success");
      }
    });
    wx.setStorage({
      key: "id",
      data: that.data.shop_id,
      success: function (res) {
        console.log("id setStorage success");
      }
    });
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
        console.log(res)
        that.setData({
          menu: res.data.data.menu,
          shop: res.data.data.shop,
          shop_id: options.canId
        });
        // console.log(res.data)
      }
    })
  },

  checkLogin: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userinfo: res.data,
          logged: true
        })
        wx.getStorage({
          key: 'user_myinfo',
          success: function (res) {
            console.log("从缓存读取信息： " + res.data)
            if (res.data.user_name != 0) {
              that.setData({
                infoComfirmed: true
              })
              console.log("已完善信息")
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
              // console.log("还未完善信息！")
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
                console.log("从数据库读取: " + res.data.data.data)
                if (res.data.data.data.user_name != 0) {
                  that.setData({
                    infoComfirmed: true
                  })
                  wx.setStorage({
                    key: 'user_myinfo',
                    data: res.data.data.data,
                  })
                  console.log("已完善信息")
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

  onShow: function () {
    this.checkLogin()
  },

  bindGetUserInfo: function () {
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
          console.error(err)
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
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }

  },

  emptyOrder: function(){
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