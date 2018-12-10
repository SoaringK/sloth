const { mysql } = require('../qcloud');

async function add_substituteOrder(open_id, order_time, class_address, class_time, class_name, profit, sex_require, other_require, other_require, contact_name, contact_tel, contact_wechat, order_time) {
  var order_type = 4
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: -1
  }
  var res = await mysql("orderList").insert(order)
  var res1 = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type })
  var order_id = res1[res1.length - 1].order_id
  var substituteOrder = {
    order_id: order_id,
    open_id: open_id,
    class_address: class_address,
    class_time: class_time,
    class_name: class_name,
    profit: profit,
    sex_require: sex_require,
    other_require: other_require,
    contact_name: contact_name,
    contact_tel: contact_tel,
    contact_wechat: contact_wechat,
    order_state: -1,
    order_time: order_time
  }
  var res2 = await mysql("substituteOrder").insert(substituteOrder)
}

async function get_substituteOrder_Info_All() {
  var res = await mysql("substituteOrder")
  return res
} 

async function get_substituteOrder_Info(order_id) {
  var res = await mysql("substituteOrder").where({ order_id })
  return res
} 

module.exports = {
  get_substituteOrder_Info_All,
  add_substituteOrder,
  get_substituteOrder_Info
}

