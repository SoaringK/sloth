var order = require('../../../api/order.js')
var user = require('../../../api/user.js')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await order.get_Order_Info(order_id)
  var open_id=res[0].open_id
  var res1 = await user.get_User_Other_Info(open_id)
  ctx.state.data = res1 
}
