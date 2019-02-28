var substituteOrder = require('../../../api/substituteOrder.js')
var order = require('../../../api/order.js')

module.exports = async ctx => {
  var res = await substituteOrder.get_substituteOrder_Info_All()
  var num = res.length
  var str = "{\"data\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var class_time = res[i].class_time
    var profit = res[i].profit
    var sex_require = res[i].sex_require
    var class_address = res[i].class_address
    var class_name = res[i].class_name
    var order_time = res[i].order_time

    var res1 = await order.get_Order_Info(order_id)
    if (res1.length > 0)
      continue

    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type\":\"代课\","
    str += "\"order_id\":\"" + order_id + "\","
    str += "\"class_time\":\"" + class_time + "\","
    str += "\"profit\": \"" + profit + "\","
    str += "\"sex_require\": \"" + sex_require + "\","
    str += "\"class_address\": \"" + class_address + "\","
    str += "\"class_name\": \"" + class_name + "\","
    str += "\"order_time\": \"" + order_time + "\""
    str += "}"
    count += 1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
