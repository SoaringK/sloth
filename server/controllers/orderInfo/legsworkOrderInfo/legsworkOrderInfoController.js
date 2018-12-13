var legsworkOrder = require('../../../api/legsworkOrder.js')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await legsworkOrder.get_legsworkOrder_Info(order_id)
  ctx.state.data = res
}
