var packageOrder = require('../../../api/packageOrder.js')
var order = require('../../../api/order.js')

module.exports = async ctx => {
  var res = await packageOrder.get_packageOrder_Info_All()
  var num = res.length
  var str = "{\"data\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var get_pack_addr = res[i].get_pack_addr
    var profit = res[i].profit
    var sex_require = res[i].sex_require
    var shipping_address = res[i].shipping_address
    var complete_time = res[i].complete_time
    var order_time = res[i].order_time

    var res1 = await order.get_Order_Info(order_id)
    if (res1.length > 0)
      continue

    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type\":\"快递\","
    str += "\"order_id\":\"" + order_id + "\","
    str += "\"get_pack_addr\":\"" + get_pack_addr + "\","
    str += "\"profit\": \"" + profit + "\","
    str += "\"sex_require\": \"" + sex_require + "\","
    str += "\"shipping_address\": \"" + shipping_address + "\","
    str += "\"complete_time\": \"" + complete_time + "\","
    str += "\"order_time\": \"" + order_time + "\""
    str += "}"
    count += 1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
