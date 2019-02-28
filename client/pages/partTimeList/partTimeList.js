var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    typeID: 0,
    isLoading: true,
    loadOver: false,
    pt_info: [],
    districtList: [{
      key: 1,
      value: "校内兼职"
    }, {
      key: 2,
      value: "实验室兼职"
    }, {
      key: 3,
      value: "校企合作"
    }, {
      key: 4,
      value: "全部"
    }],
    chioceDistrict: false,
    activeDistrictIndex: -1,
    activeDistrictName: "兼职类型",
    scrollTop: 0,
    scrollIntoView: 0,
    district_all:false,
    sorting_all:false
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.service.take_ptjobUrl,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      data: {
        userId: options.userId
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            pt_info: res.data.data.data
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
  },
  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
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
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            chioceDistrict: false
          });
        } else {
          this.setData({
            chioceDistrict: true
          });
        }
        break;
    }
  },
  hideAllChioce: function () {
    this.setData({
      chioceDistrict: false
    });
  },

  districtSorting: function (e) {
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


})