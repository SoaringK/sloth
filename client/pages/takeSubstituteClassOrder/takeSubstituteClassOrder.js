const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    infoComfirmed:false,
    logged:false,
    userinfo:[],
    typeID: 0,
    isLoading: true,
    loadOver: false,
    order: [],
    districtList: [{
      key: 1,
      value: "男"
    }, {
      key: 2,
      value: "女"
    }, {
      key: 3,
      value: "全部"
    }],
    sortingList: [{
      key: 1,
      value: "A1"
    }, {
      key: 2,
      value: "A2"
    }, {
      key: 3,
      value: "A3"
    }, {
      key: 4,
      value: "A4"
    }, {
      key: 5,
      value: "A5"
    }, {
      key: 6,
      value: "全部"
    }],
    chioceDistrict: false,
    chioceSorting: false,
    activeDistrictIndex: -1,
    activeDistrictName: "性别要求",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "代课地点",
    district_all:false,
    sorting_all:false
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.service.take_order_home_substitueteUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            order: res.data.data.data
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
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true,
      chioceDistrict: false,
      chioceSorting: false,
      activeDistrictIndex: -1,
      activeDistrictName: "性别要求",
      scrollTop: 0,
      scrollIntoView: 0,
      activeSortingIndex: -1,
      activeSortingName: "代课地点",
      district_all:false,
      sorting_all:false
    })
    var that = this;
    wx.request({
      url: config.service.take_order_home_substitueteUrl,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            order: res.data.data.data
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
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
      //this.getProductList();
    }
  },
  //条件选择
  choiceItem: function(e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        } else {
          this.setData({
           
            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        } else {
          this.setData({
           
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
    }
  },
  hideAllChioce: function() {
    this.setData({
     
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  getDistrictList: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function(resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },
  districtSorting: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chioceDistrict: false,
      activeDistrictIndex: index,
      activeDistrictName: this.data.districtList[index].value,
      district_all:(this.data.districtList[index].value != '全部'),
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //综合排序
  selectSorting: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      sorting_all:( this.data.sortingList[index].value != '全部'),
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  confirmTakeOrder: function (e) {
    var that = this;
    wx.showModal({
      title: '确认订单',
      content: '点击确定接受订单',
      success: function (res) {
        if (res.confirm) {
          var item = that.data.order.splice(e.currentTarget.dataset.index, 1);
          var data = that.data.order;
          that.setData({
            order: data
          }),
            wx.request({
            url: config.service.take_orderUrl + "?order_id=" + item[0].order_id + "&user_id=" + that.data.userinfo.openId + "&order_type=3",
              method: "GET",
              header: {
                "content-type": "application/json"
              },
              success: function (res) {
                if(res.data.code==0){
                  wx.navigateTo({
                    url: "../InfoSubstitute/InfoSubstitute?order_id=" + item[0].order_id
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

        } else {
        }
      }
    })
  },
  bindGetUserInfo: function () {
    var that = this
    if (this.data.logged) {
      if (!this.data.infoComfirmed) {
        that.showinfowarning()
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
  checklogin: function () {
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
              that.showinfowarning()
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
                if(res.data.code==0){
                  if (res.data.data.data.user_name != 0) {
                    that.setData({
                      infoComfirmed: true
                    })
                    wx.setStorage({
                      key: 'user_myinfo',
                      data: res.data.data.data,
                    })
                  } else {
                    that.showinfowarning()
                  }
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
              },
            })
          }
        })
      }
    })

  },

  onShow: function () {
    this.checklogin()
  },

  showinfowarning: function () {
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

})