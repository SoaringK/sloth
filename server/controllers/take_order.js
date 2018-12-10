var order = require('../api/order.js')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var order_id = ctx.request.query.order_id
  var order_type = ctx.request.query.order_type
  var order_database 
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  if (hour < 10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if (minute < 10)
    minute = '0' + minute
  var take_order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
  var res = await order.set_Order(order_type, open_id, order_id, take_order_time)

  ctx.state.data = res
}