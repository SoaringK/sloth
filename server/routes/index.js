/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 测试接口
router.get('/hello', controllers.hello)

// 测试接口
router.get('/canteen_select', controllers.canteen_select)
router.get('/breakfastMemu', controllers.breakfastMemu)
router.get('/mysql', controllers.mysql)
router.get('/addAddress', controllers.addAddress)
router.get('/address_select', controllers.address_select)
router.get('/settleOrder', controllers.settleOrder)
router.get('/order_confirm', controllers.order_confirm)
router.get('/changeAddress', controllers.changeAddress)
router.get('/delAddress', controllers.delAddress)
router.get('/take_order_home', controllers.take_order_home)
router.get('/my_order',controllers.my_order)
router.get('/my_take_order',controllers.my_take_order)
router.get('/take_order', controllers.take_order)
router.get('/order_info', controllers.order_info)
router.get('/state_change',controllers.state_change)
router.get('/order_package', controllers.order_package)
router.get('/legsworkOrder', controllers.legsworkOrder)
router.get('/substituteOrder', controllers.substituteOrder)
router.get('/take_order_home_breakfast', controllers.take_order_home_breakfast)
router.get('/take_order', controllers.take_order)
router.get('/take_order_home_package', controllers.take_order_home_package)
router.get('/take_order_home_legswork', controllers.take_order_home_legswork)
router.get('/take_order_home_substituete', controllers.take_order_home_substituete)
router.get('/take_ptjob', controllers.take_ptjob)
router.get('/order_info_breakfast', controllers.order_info_breakfast)
router.get('/order_info_package', controllers.order_info_package)
router.get('/order_info_legwork', controllers.order_info_legwork)
router.get('/order_info_substitute', controllers.order_info_substitute)
router.get('/changeUserInfo',controllers.changeUserInfo)
router.get('/getUserInfo',controllers.getUserInfo)
router.get('/getTakeorder_user_info',controllers.getTakeorder_user_info)

module.exports = router
