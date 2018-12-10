const { mysql } = require('../qcloud');

async function add_legsworkOrder(open_id, order_time, legswork_type, complete_time, good_type, start_point, destination, profit, other_require, contact_name, contact_tel, contact_wechat, order_time) {
  var order_type = 3
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: -1
  }
  var res = await mysql("orderList").insert(order)
  var res1 = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type })
  var order_id = res1[res1.length - 1].order_id
  var legsworkOrder = {
    order_id: order_id,
    open_id: open_id,
    legswork_type: legswork_type,
    complete_time: complete_time,
    good_type: good_type,
    start_point: start_point,
    destination: destination,
    profit: profit,
    other_require: other_require,
    contact_name: contact_name,
    contact_tel: contact_tel,
    contact_wechat: contact_wechat,
    order_state: -1,
    order_time: order_time
  }
  var res2 = await mysql("legsworkOrder").insert(legsworkOrder)
  return res2
}

async function get_legsworkOrder_Info_All() {
  var res = await mysql("legsworkOrder")
  return res
}

async function get_legsworkOrder_Info(order_id) {
  var res = await mysql("legsworkOrder").where({ order_id })
  return res
}  



module.exports = {
  get_legsworkOrder_Info_All,
  add_legsworkOrder,
  get_legsworkOrder_Info
}

