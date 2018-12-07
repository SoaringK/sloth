const {
  mysql
} = require('../qcloud')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var order_type_
  var order_type
  var order_id, order_shop_address, order_deli_fee, order_total_item, order_good_name, order_good_num, order_address, order_time, order_state, order_sum, order_deli_time
  var res = await mysql("orderList").where({ open_id })
  //ctx.state.data=res
  var count = 0
  var num = res.length
  var str = "{\"data\":["
  for (var i = 0; i < num; i++) {
    if (res[i].order_id != undefined)
      order_id = res[i].order_id
    else
      continue
    order_type_ = res[i].order_type;
    if (order_type_ == 1) {
      order_deli_time = "明早7: 00 - 8: 00"
      order_type = '早餐'
      var res1 = await mysql("foodOrderDetail").where({
        order_id
      })
      order_total_item = res1.length
      if (res1.length != 0)
        good_id = res1[0].good_id
      else
        continue
      var res4 = await mysql("foodMenu").where({
        good_id
      })
      order_good_name
      if (res4.length != 0)
        order_good_name = res4[0].good_name
      else
        order_good_name = "不知道吃什么"
      shop_id = good_id.substr(1, 1)
      var res2 = await mysql("foodShop").where({
        shop_id
      })

      order_shop_address
      if (res2.length != 0)
        order_shop_address = res2[0].shop_intro
      else
        order_shop_address = "不知道哪里的店"
      order_deli_fee = res2[0].shipping_fee

      order_good_num = res1[0].good_order_num
      var res3 = await mysql("foodContactInfo").where({
        open_id
      })
      //ctx.state.data=res3
      var order_address_building, order_address_room
      if (res3.length != 0) {
        order_address_building = res3[0].user_address_building
        order_address_room = res3[0].user_address_room
      }
      else
        continue
      var dormitory = [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "c11",
        "c12",
        "c13",
        "c14",
        "c15",
      ]
      order_address_building = dormitory[order_address_building]
      var order_address = order_address_building + " " + order_address_room
      var res5
      var res6 = await mysql("foodOrder").where({
        order_id
      })
      if (res6[0].length != 0) {
        res5 = res6[0].order_time
        order_time = res5.substr(5)
      } else
        order_time = "不知道什么时候送到"

      order_sum
      if (res6[0].length != 0)
        order_sum = res6[0].total_cost
      else
        order_sum = "不知道多少钱"
      order_state = res[i].order_state

    } else {
      if (order_type_ == 2) {
        order_type = '快递'
        var res11 = await mysql("packageOrder").where({ order_id })
        order_shop_address = res11[0].get_pack_addr
        order_deli_fee = res11[0].profit
        order_total_item = 1
        order_good_num = 1
        order_good_name = '快递'
        order_address = res11[0].shipping_address
        order_deli_time = res11[0].complete_time
        order_time = res11[0].order_time
        order_state = res11[0].order_state
        order_sum = 0
      } else {
        if (order_type_ == 3) {
          order_type = '跑腿'
          var res12 = await mysql('legsworkOrder').where({ order_id })
          if(res12.length==0)
            continue
          order_shop_address = res12[0].start_point
          order_deli_fee = res12[0].profit
          order_total_item = 1
          order_good_num = 1
          order_good_name = res12[0].good_type
          order_address = res12[0].destination
          order_deli_time = res12[0].complete_time
          order_time = res12[0].order_time
          order_state = res12[0].order_state
          order_sum = 0
        } else {
          if (order_type_ == 4) {
            order_type = '代课'
            var res13 = await mysql('substituteOrder').where({ order_id })
            order_shop_address = res13[0].class_address
            order_deli_fee = res13[0].profit
            order_total_item = 1
            order_good_num = 1
            order_good_name = res13[0].class_name
            order_address = res13[0].other_require
            order_deli_time = res13[0].class_time
            order_time = res13[0].order_time
            order_state = res13[0].order_state
            order_sum = 0

          }
        }
      }
    }
    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type_\":\"" + order_type_ + "\","
    str += "\"order_type\":\"" + order_type + "\","
    str += "\"order_id\":\"" + order_id + "\","
    str += "\"order_shop_address\":\"" + order_shop_address + "\","
    str += "\"order_deli_fee\": \"" + order_deli_fee + "\","
    str += "\"order_total_item\": \"" + order_total_item + "\","
    str += "\"order_good_name\": \"" + order_good_name + "\","
    if (order_total_item <= 1)
      str += "\"order_good_num\": \"" + order_good_num + "\","
    else
      str += "\"order_good_num\": \"" + order_good_num + "等\","
    str += "\"order_address\": \"" + order_address + "\","
    str += "\"order_deli_time\": \"" + order_deli_time + "\","
    str += "\"order_time\": \"" + order_time + "\","
    str += "\"order_state\": \"" + order_state + "\","
    str += "\"order_sum\": \"" + order_sum + "\""
    str += "}"
    count += 1
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)

}