var substituteOrder = require('../api/substituteOrder.js')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await substituteOrder.get_substituteOrder_Info(order_id)
  ctx.state.data = res
}