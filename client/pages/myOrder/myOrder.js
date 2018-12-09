var app = getApp();
var config = require('../../config');

Page({
  data: {
    userId:0,

    tabList: ['进行中', '已完成'],
    current: 0,//当前选中的Tab项
    currentorder:[],
    runningorder: [],
    finishedorder:[], 

    typeID: 0,
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
    },{
      key:3,
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
    
    if(this.data.current==0){
      this.setData({
        currentorder:this.data.runningorder
      })
    }else{
      this.setData({
        currentorder: this.data.finishedorder
      })
    }
  },
  /*
  arrive_confirm:function(e)
  {
    var index=e.currentTarget.dataset.index
    //console.log(this.data.currentorder[index])
    var order_id=this.data.currentorder[index].order_id
    var order_type=this.data.currentorder[index].order_type+1
    //console.log(order_id)
    if(this.data.currentorder[index].order_state==1){
      wx.request({
        url: config.service.state_changeUrl+'?order_id='+order_id+'&order_type='+order_type,
        method:'GET',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log("已完成")
          this.onLoad()
          
        }
      })
    }

  },*/

  onShow:function(){
    var that=this

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log("读入userinfo")
        console.log(res)
        that.setData({
          userId: res.data.openId
        })
        wx.request({
          url: config.service.my_orderUrl + "?user_id=" + that.data.userId,
          method: "GET",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            that.setData({
              currentorder: res.data.data.data
            });
            console.log(res.data.data)
            console.log("hi")
            var tmp_run = [], tmp_fis = []
            var item
            for (item in res.data.data.data) {
              // console.log(item)
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
  //楼栋
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
    //this.getProductList();
  },
  //购买店铺
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
    //this.getProductList();
  },
   /*
  checkinfo1: function (e) {
    var that = this;
    var item = that.data.currentorder[e.currentTarget.dataset.index];
    //console.log(order_id)
    wx.navigateTo({
      url: '../InfoPackage/InfoPackage?order_id=' + item.order_id + '&infotype=1',
    })
  },
 */
  check_order: function(e){
    // console.log(e);
    var that = this;
    var item = that.data.currentorder[e.currentTarget.dataset.index];

    var des
    if (item.order_type == 0) des = '../InfoBreakfast/InfoBreakfast?order_id='
    else{
      if (item.order_type == 1) des = '../InfoPackage/InfoPackage?order_id='
      else{
        if (item.order_type == 2) des = '../InfoLegwork/InfoLegwork?order_id='
        else des = '../InfoSubstitute/InfoSubstitute?order_id='
      }
    }
    wx.navigateTo({
      url: des + item.order_id + '&infotype=0',
    })
  }
  
})


