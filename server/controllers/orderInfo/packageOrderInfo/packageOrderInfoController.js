var packageOrder = require('../../../api/packageOrder.js')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await packageOrder.get_packageOrder_Info(order_id)
  ctx.state.data = res
}