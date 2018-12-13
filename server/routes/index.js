/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')
const loginController = require('../controllers/my/login/loginController')
const userController = require('../controllers/my/user/userController')
const canteenSelectController = require('../controllers/order/breakfastOrder/canteenSelectController')
const breakfastMemuController = require('../controllers/order/breakfastOrder/breakfastMemuController')
const addAddressController = require('../controllers/order/breakfastOrder/addAddressController')
const addressSelectController = require('../controllers/order/breakfastOrder/addressSelectController')
const settleOrderController = require('../controllers/order/breakfastOrder/settleOrderController')
const changeAddressController = require('../controllers/order/breakfastOrder/changeAddressController')
const delAddressController = require('../controllers/order/breakfastOrder/delAddressController')

const takeOrderHomeController = require('../controllers/takeOrder/takeOrderHome/takeOrderHomeController')
const takeOrderController = require('../controllers/takeOrder/takeOrderHome/takeOrderController')

const myOrderController = require('../controllers/my/myOrder/myOrderController')
const orderStateChangeController = require('../controllers/my/myOrder/orderStateChangeController')
const getTakeOrderUserInfoController = require('../controllers/my/myOrder/getTakeOrderUserInfoController')

const myTakeOrderController = require('../controllers/my/myTakeOrder/myTakeOrderController')

const packageOrderController = require('../controllers/order/packageOrder/packageOrderController')
const legsworkOrderController = require('../controllers/order/legsworkOrder/legsworkOrderController')
const substituteOrderController = require('../controllers/order/substituteOrder/substituteOrderController')

const takeOrderHomeBreakfastController = require('../controllers/takeOrder/breakfastTakeOrder/takeOrderHomeBreakfastController')
const takeOrderHomePackageController = require('../controllers/takeOrder/packageTakeOrder/takeOrderHomePackageController')
const takeOrderHomeLegsworkController = require('../controllers/takeOrder/legsworkTakeOrder/takeOrderHomeLegsworkController')
const takeOrderHomeSubstitueteController = require('../controllers/takeOrder/substitueteTakeOrder/takeOrderHomeSubstitueteController')

const takePtJobController = require('../controllers/ptJob/takePtJobController')
const takePtJobDetailController = require('../controllers/ptJob/takePtJobDetailController')

const breakfastOrderInfoController = require('../controllers/orderInfo/breakfastOrderInfo/breakfastOrderInfoController')
const packageOrderInfoController = require('../controllers/orderInfo/packageOrderInfo/packageOrderInfoController')
const legsworkOrderInfoController = require('../controllers/orderInfo/legsworkOrderInfo/legsworkOrderInfoController')
const substituteOrderInfoController = require('../controllers/orderInfo/substituteOrderInfo/substituteOrderInfoController')

const changeUserInfoController = require('../controllers/my/myInfo/changeUserInfoController')
const getUserInfoController = require('../controllers/my/myInfo/getUserInfoController')
// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/login', authorizationMiddleware, loginController)
router.get('/user', validationMiddleware, userController)
router.get('/canteen_select', canteenSelectController)
router.get('/breakfastMemu', breakfastMemuController)
router.get('/addAddress', addAddressController)
router.get('/address_select', addressSelectController)
router.get('/settleOrder', settleOrderController)
router.get('/changeAddress', changeAddressController)
router.get('/delAddress', delAddressController)
router.get('/take_order_home', takeOrderHomeController)
router.get('/my_order',myOrderController)
router.get('/my_take_order',myTakeOrderController)
router.get('/take_order', takeOrderController)
router.get('/state_change',orderStateChangeController)
router.get('/order_package', packageOrderController)
router.get('/legsworkOrder', legsworkOrderController)
router.get('/substituteOrder', substituteOrderController)
router.get('/take_order_home_breakfast', takeOrderHomeBreakfastController)
router.get('/take_order_home_package',takeOrderHomePackageController)
router.get('/take_order_home_legswork', takeOrderHomeLegsworkController)
router.get('/take_order_home_substituete',takeOrderHomeSubstitueteController)
router.get('/take_ptjob', takePtJobController)
router.get('/take_ptjob_detail', takePtJobDetailController)
router.get('/order_info_breakfast', breakfastOrderInfoController)
router.get('/order_info_package', packageOrderInfoController)
router.get('/order_info_legwork', legsworkOrderInfoController)
router.get('/order_info_substitute', substituteOrderInfoController)
router.get('/changeUserInfo',changeUserInfoController)
router.get('/getUserInfo',getUserInfoController)
router.get('/getTakeorder_user_info', getTakeOrderUserInfoController)

module.exports = router
