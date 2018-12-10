const { mysql } = require('../qcloud');

async function get_Order_List(order_state) {
  var res = await mysql("orderList").where({ order_state })
  return res
}

async function get_Order_Info(order_id){
  var res = await mysql("orderinfo").where({ order_id })
  return res
}

async function set_Order(order_type, open_id,order_id, take_order_time){
  var orderinfo = {
    open_id: open_id,
    order_id: order_id,
    state: 1,
    take_order_time: take_order_time
  }
  if (order_type == 0)
    await mysql("foodOrder").update({ order_state: 1 }).where({ order_id })
  else
    if (order_type == 1)
      await mysql("packageOrder").update({ order_state: 1 }).where({ order_id })
    else
      if (order_type == 2)
        await mysql("legsworkOrder").update({ order_state: 1 }).where({ order_id })
      else
        if (order_type == 3)
          await mysql("substituteOrder").update({ order_state: 1 }).where({ order_id })
  var res = await this.updata_Order(order_id)
  var res1 = await mysql("orderinfo").insert(orderinfo)
  return res1
}

async function updata_Order(order_id){
  var res = await mysql("orderList").update({ order_state: 1 }).where({ order_id })
  return res
}

module.exports = {
  get_Order_List,
  get_Order_Info, 
  set_Order,
  updata_Order
}
