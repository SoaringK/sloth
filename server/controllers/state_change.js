var order = require('../api/order.js')

module.exports = async ctx => {
  var order_id=ctx.request.query.order_id
  var order_type=ctx.request.query.order_type
  var res = await order.change_Order_State(order_id, order_type)

  ctx.state.data = res
}