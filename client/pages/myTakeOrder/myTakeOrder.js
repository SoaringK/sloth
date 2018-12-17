var app = getApp();
var config = require('../../config');

Page({
  data: {
    userId: 0,

    tabList: ['进行中', '已完成'],
    current: 0,//当前选中的Tab项
    currentorder: [],
    runningorder: [],
    finishedorder: [],
    isLoading: true,
    loadOver: false,
    districtList: [{
      key: 1,
      value: "早餐"
    }, {
      key: 2,
      value: "快递"
    }, {
      key: 3,
      value: "跑腿"
    }, {
      key: 4,
      value: "代课"
    }, {
      key: 5,
      value: "全部"
    }],
    sortingList: [{
      key: 1,
      value: "未接单"
    }, {
      key: 2,
      value: "已接单"
    }, {
      key: 3,
      value: "全部"
    }],
    chioceDistrict: false,
    chioceSorting: false,
    activeDistrictIndex: -1,
    activeDistrictName: "订单类型",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "订单状态"
  },

  /**
   * Tab的点击切换事件
   */
  tabItemClick: function (e) {
    this.setData({
      current: e.currentTarget.dataset.pos
    })

    if (this.data.current == 0) {
      this.setData({
        currentorder: this.data.runningorder
      })
    } else {
      this.setData({
        currentorder: this.data.finishedorder
      })
    }
  },

  onShow:function(){
    var that=this

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userId: res.data.openId
        })
        wx.request({
          url: config.service.my_take_orderUrl + "?user_id=" + that.data.userId,
          method: "GET",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            that.setData({
              currentorder: res.data.data.data
            });
            
            var tmp_run = [], tmp_fis = []
            var item
            for (item in res.data.data.data) {
              if (that.data.currentorder[item].order_state == 2) {
                tmp_fis.push(that.data.currentorder[item])
              } else {
                tmp_run.push(that.data.currentorder[item])
              }
            }
            that.setData({
              runningorder: tmp_run,
              finishedorder: tmp_fis,
              currentorder: tmp_run
            })
          }
        })
      }
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true,
      chioceDistrict: false,
      chioceSorting: false,
      activeDistrictIndex: -1,
      activeDistrictName: "订单类型",
      scrollTop: 0,
      scrollIntoView: 0,
      activeSortingIndex: -1,
      activeSortingName: "订单状态",
      current: 0
    })
    var that=this

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          userId: res.data.openId
        })
        wx.request({
          url: config.service.my_take_orderUrl + "?user_id=" + that.data.userId,
          method: "GET",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if(res.data.code==0){
              that.setData({
                currentorder: res.data.data.data
              });
              
              var tmp_run = [], tmp_fis = []
              var item
              for (item in res.data.data.data) {
                if (that.data.currentorder[item].order_state == 2) {
                  tmp_fis.push(that.data.currentorder[item])
                } else {
                  tmp_run.push(that.data.currentorder[item])
                }
              }
              that.setData({
                runningorder: tmp_run,
                finishedorder: tmp_fis,
                currentorder: tmp_run
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
    
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
    }
  },

  //条件选择
  choiceItem: function (e) {
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
  hideAllChioce: function () {
    this.setData({
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  getDistrictList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function (resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },


  districtSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chioceDistrict: false,
      activeDistrictIndex: index,
      activeDistrictName: this.data.districtList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
  },
  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({

      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
  },
  //查看订单详情
  //根据订单类型不同跳转到不同的详情页面
  orderCheck: function (e) {
    var that = this;
    var item = that.data.currentorder[e.currentTarget.dataset.index];
    var des
    if (item.order_type == 0) des = '../InfoBreakfast/InfoBreakfast?order_id='
    else {
      if (item.order_type == 1) des = '../InfoPackage/InfoPackage?order_id='
      else {
        if (item.order_type == 2) des = '../InfoLegwork/InfoLegwork?order_id='
        else des = '../InfoSubstitute/InfoSubstitute?order_id='
      }
    }
    wx.navigateTo({
      url: des + item.order_id ,
    })
  }
})
