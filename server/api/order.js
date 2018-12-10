const { mysql } = require('../qcloud');

async function get_Order_List(order_state) {
  var res = await mysql("orderList").where({ order_state })
  return res
}

async function get_Order_Detail(order_id) {
  var res = await mysql("orderList").where({ order_id })
  return res
}


async function get_Order_List_By_User(open_id) {
  var res = await mysql("orderList").where({ open_id })
  return res
}

async function get_Order_Info(order_id){
  var res = await mysql("orderinfo").where({ order_id })
  return res
}

async function change_Order_State(order_id,order_type){
  var order_state = 2
  if (order_type == 1) {
    var foodOrder = require('./foodOrder.js')
    var res1 = foodOrder.update_FoodOrder(order_id, order_state)
  } else {
    if (order_type == 2) {
      var legsworkOrder = require('./legsworkOrder.js')
      var res1 = legsworkOrder.update_LegsworkOrder(order_id, order_state)
    } else {
      if (order_type == 3) {
        var packageOrder = require('./packageOrder.js')
        var res1 = packageOrder.update_PackageOrder(order_id, order_state)
      } else {
        if (order_type == 4) {
          var substituteOrder = require('./substituteOrder.js')
          var res1 = substituteOrder.update_SubstituteOrder(order_id, order_state)

        }
      }
    }
  }
  var res2 = await mysql("orderinfo").update({ state: 2 }).where({ order_id })
  var res3 = await mysql("orderList").update({ order_state: 2 }).where({ order_id })
  return res3
}

async function set_Order(order_type, open_id,order_id, take_order_time){
  var order_state = 1
  if (order_type == 0){
    var foodOrder = require('./foodOrder.js')
    var res = foodOrder.update_FoodOrder(order_id,order_state)
  }
  else
    if (order_type == 1){
      var packageOrder = require('./packageOrder.js')
      var res = packageOrder.update_PackageOrder(order_id, order_state)
    }
    else
      if (order_type == 2){
        var legsworkOrder = require('./legsworkOrder.js')
        var res = legsworkOrder.update_LegsworkOrder(order_id, order_state)
      }
      else
        if (order_type == 3){
          var substituteOrder = require('./substituteOrder.js')
          var res = substituteOrder.update_SubstituteOrder(order_id, order_state)
        }
  var res = await this.updata_Order(order_id)
  var res1 = await this.set_OrderInfo(open_id, order_id, take_order_time)
  return res1
}

async function updata_Order(order_id){
  var res = await mysql("orderList").update({ order_state: 1 }).where({ order_id })
  return res
}

async function set_OrderInfo(open_id, order_id, take_order_time){
  var orderinfo = {
    open_id: open_id,
    order_id: order_id,
    state: 1,
    take_order_time: take_order_time
  }
  var res = await mysql("orderinfo").insert(orderinfo)
  return res
}

module.exports = {
  get_Order_List,
  get_Order_List_By_User,
  get_Order_Detail,
  get_Order_Info, 
  set_Order,
  updata_Order,
  set_OrderInfo
}
