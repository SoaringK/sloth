const { mysql } = require('../qcloud');

async function add_FoodOrder(open_id, order_time, cost, addr_id, orders){
  var orders = JSON.parse(orders)
  var length = orders.length
  var order_type = 1
  var order = {
    open_id: open_id,
    order_type: order_type,
    order_time: order_time,
    order_state: -1
  }
  await mysql("orderList").insert(order)
  var orderinfo = await mysql("orderList").select("order_id").where({ order_time, open_id, order_type })
  var order_id = orderinfo[orderinfo.length - 1].order_id
  var foodOrder = {
    order_id: order_id,
    order_time: order_time,
    open_id: open_id,
    total_cost: cost,
    order_state: -1,
    address_id: addr_id
  }
  var res = await mysql("foodOrder").insert(foodOrder)
  for (var i = 0; i < length; i++) {
    var good_id = orders[i].foodid
    var foodOrderDetail = {
      order_id: order_id,
      good_id: good_id,
      good_order_num: orders[i].numb
    }
    var ret = await mysql("foodOrderDetail").insert(foodOrderDetail)
  }
  return res
}

async function get_FoodOrder_Info_All(){
  var res = await mysql("foodOrder")
  return res
}

async function get_FoodOrder_Info(order_id) {
  var res = await mysql("foodOrder").where({ order_id })
  return res
}

async function get_FoodOrder_Detail(order_id){
  var res = await mysql("foodOrderDetail").where({ order_id })
  return res
}

async function update_FoodOrder(order_id,order_state) {
  var res = await mysql("foodOrder").update({ order_state }).where({ order_id })
  return res
}



module.exports = {
  add_FoodOrder,
  get_FoodOrder_Info_All,
  get_FoodOrder_Info,
  get_FoodOrder_Detail,
  update_FoodOrder
}

