// pages/breakfastMenu/breakfastMemu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: [],
    menu: [],
    selected: 0,
    cost: 0,
    total_item_numb: 0,
    tapCart: false
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 试着用easy-mock测试
    var that = this;
    // 用店铺id去get数据
    wx.request({
      url: "https://easy-mock.com/mock/5bbeefa27b8b103aa6c7dd32/example/breakfast",
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      data:{
        shopId:options.canId
      },
      success: function (res) {
        console.log(res)
        that.setData({
          menu: res.data.menu,
          shop: res.data.shop
        });
        // console.log(res.data)
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