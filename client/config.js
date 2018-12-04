/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://m5ebb6c1.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //选择店铺地址
    canteen_selectUrl: `${host}/weapp/canteen_select`,

    //店铺详情
    breakfastMemuUrl: `${host}/weapp/breakfastMemu`,

    //添加地址
    addAddressUrl: `${host}/weapp/addAddress`,

    //获取地址
    address_selectUrl: `${host}/weapp/address_select`,

    //提交订单
    settleOrderUrl: `${host}/weapp/settleOrder`,
    order_confirmUrl: `${host}/weapp/order_confirm`,

    //修改地址信息
    changeAddressUrl: `${host}/weapp/changeAddress`,

    //删除地址信息
    delAddressUrl: `${host}/weapp/delAddress`,

    //接受订单
    take_order_homeUrl: `${host}/weapp/take_order_home`,

    //我的下单
    my_orderUrl: `${host}/weapp/my_order`,

    //我的接单
    my_take_orderUrl: `${host}/weapp/my_take_order`,

    //接单
    take_orderUrl: `${host}/weapp/take_order`,

    //更改订单状态
    state_changeUrl: `${host}/weapp/state_change`,

    //代拿快递下单
    order_packageUrl: `${host}/weapp/order_package`,

    //跑腿下单
    legsworkOrderUrl: `${host}/weapp/legsworkOrder`,

    //代课下单
    substituteOrderUrl: `${host}/weapp/substituteOrder`,

    //早餐接单列表
    take_order_home_breakfastUrl: `${host}/weapp/take_order_home_breakfast`,

    //接单
    take_orderUrl: `${host}/weapp/take_order`,

    //快递接单列表
    take_order_home_packageUrl: `${host}/weapp/take_order_home_package`,

    //跑腿接单列表
    take_order_home_legsworkUrl: `${host}/weapp/take_order_home_legswork`,

    //代课接单列表
    take_order_home_substitueteUrl: `${host}/weapp/take_order_home_substituete`,

    //获取兼职列表
    take_ptjobUrl: `${host}/weapp/take_ptjob`,

    //早餐订单详情
    order_info_breakfastUrl: `${host}/weapp/order_infobreakfast`,
  }
};

module.exports = config;
