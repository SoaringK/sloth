var legsworkOrder = require('../api/legsworkOrder.js')
var order = require('../api/order.js')

module.exports = async ctx => {
  var res = await legsworkOrder.get_legsworkOrder_Info_All()
  var num = res.length
  var str = "{\"data\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var legorder_type = res[i].legswork_type
    var profit = res[i].profit
    var start_point = res[i].start_point
    var destination = res[i].destination
    var complete_time = res[i].complete_time
    var order_time = res[i].order_time

    var res1 = await order.get_Order_Info(order_id)
    if (res1.length > 0)
      continue

    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type\":\"跑腿\","
    str += "\"order_id\":\"" + order_id + "\","
    str += "\"legorder_type\":\"" + legorder_type + "\","
    str += "\"profit\": \"" + profit + "\","
    str += "\"complete_time\": \"" + complete_time + "\","
    str += "\"start_point\": \"" + start_point + "\","
    str += "\"destination\": \"" + destination + "\","
    str += "\"order_time\": \"" + order_time + "\""
    str += "}"
    count += 1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
