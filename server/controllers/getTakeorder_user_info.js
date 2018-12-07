const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res = await mysql("orderinfo").where({ order_id })
  var open_id=res[0].open_id
  var res1=await mysql("userInfo").where({ open_id })
  ctx.state.data = res1
}
