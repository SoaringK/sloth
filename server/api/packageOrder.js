const { mysql } = require('../qcloud');

async function add_packageOrder(open_id, order_time, get_pack_addr, package_num, complete_time, profit, weight, sex_require, shipping_address, contact_name, contact_tel, contact_wechat, order_time) {
  var order_type = 2
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: -1
  }
  var res = await mysql("orderList").insert(order)
  var res1 = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type })
  var order_id = res1[res1.length - 1].order_id
  var packageOrder = {
    order_id: order_id,
    open_id: open_id,
    get_pack_addr: get_pack_addr,
    package_num: package_num,
    complete_time: complete_time,
    profit: profit,
    weight: weight,
    sex_require: sex_require,
    shipping_address: shipping_address,
    contact_name: contact_name,
    contact_tel: contact_tel,
    contact_wechat: contact_wechat,
    order_state: -1,
    order_time: order_time
  }
  var res2 = await mysql("packageOrder").insert(packageOrder)
  return res2
}


module.exports = {
  add_packageOrder
}

