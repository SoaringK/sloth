const { mysql } = require('../qcloud')

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
  var orderinfo = {
    open_id: open_id,
    order_id: order_id,
    state: 1,
    take_order_time: take_order_time
  }
  if (order_type == 0)
    await mysql("foodOrder").update({ order_state: 1 }).where({ order_id })
  else 
  if (order_type == 1)
    await mysql("packageOrder").update({ order_state: 1 }).where({ order_id })
  else
  if (order_type == 2)
    await mysql("legsworkOrder").update({ order_state: 1 }).where({ order_id })
  else
  if (order_type == 3) 
    await mysql("substituteOrder").update({ order_state: 1 }).where({ order_id })
  await mysql("orderList").update({ order_state: 1 }).where({ order_id })
  var res = await mysql("orderinfo").insert(orderinfo)
  ctx.state.data = order_type
}