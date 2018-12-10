var foodOrder = require('../api/foodOrder.js')
var foodContact = require('../api/foodContact.js')

module.exports = async ctx => {
  var addr_id = ctx.request.query.addr_id
  var orders = JSON.parse(ctx.request.query.orders)
  var cost = ctx.request.query.cost
  var shop_id = ctx.request.query.shop_id

  var open_id = ctx.request.query.user_id
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  if(hour<10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if(minute<10)
    minute = '0' + minute
  var order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute 
  //修改默认地址
  var res = await foodContact.change_Default_Addr(open_id, addr_id)
  var res1 = await foodOrder.add_foodOrder(open_id, order_time, cost, addr_id, JSON.stringify(orders)) 


  ctx.state.data = res1
}