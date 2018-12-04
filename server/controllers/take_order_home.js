const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var res = await mysql("foodOrder")
  var num = res.length
  var str = "{\"data1\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id
    if (res[i].order_id != undefined)
      order_id = res[i].order_id
    else
      continue
    var res1 = await mysql("foodOrderDetail").where({ order_id })
    var order_total_item = res1.length
    var good_id
    if (res1.length != 0)
      good_id = res1[0].good_id
    else
      continue
    var res4 = await mysql("foodMenu").where({ good_id })
    var order_good_name
    if (res4.length != 0)
      order_good_name = res4[0].good_name
    else
      continue
    var shop_id = good_id.substr(1, 1)
    var res2 = await mysql("foodShop").where({ shop_id })

    var order_shop_address
    if (res2.length != 0)
      order_shop_address = res2[0].shop_intro
    else
      continue
    var order_deli_fee = res2[0].shipping_fee

    var order_good_num = res1[0].good_order_num
    var open_id = res[i].open_id
    var res3 = await mysql("foodContactInfo").where({ open_id })
    var order_address_building, order_address_room
    if (res3.length != 0){
      order_address_building = res3[0].user_address_building
      order_address_room = res3[0].user_address_room
    }
    else
      continue
    var res5
    if (res[i].order_time != undefined)
      res5 = res[i].order_time
    else
      continue

    order_time = res5.substr(5)
    var order_sum
    if (res[i].total_cost != undefined)
      order_sum = res[i].total_cost
    else
      continue
    var res6 = await mysql("orderinfo").where({ order_id })
    if (res6.length > 0)
      continue

    if (count == 0)
      str += "{"
    else
      str += ",{"
    str += "\"order_type\":\"早餐\","
    str += "\"order_id\":\"" + order_id + "\","
    str += "\"order_address_building\":\"" + order_address_building + "\","
    str += "\"order_address_room\":\"" + order_address_room + "\","
    str += "\"order_deli_fee\": \"" + order_deli_fee + "\","
    str += "\"order_total_item\": \"" + order_total_item + "\","
    str += "\"order_good_name\": \"" + order_good_name + "\","
    if (order_total_item <= 1)
      str += "\"order_good_num\": \"" + order_good_num + "\","
    else
      str += "\"order_good_num\": \"" + order_good_num + "等\","
    str += "\"order_address\": \"" + order_address + "\","
    str += "\"order_deli_time\": \"明早7: 00 - 8: 00送达\","
    str += "\"order_time\": \"" + order_time + "\","
    str += "\"order_sum\": \"" + order_sum + "\""
    str += "}"
    count += 1
    if (count == 2)
      break;
  }
  str += "],"

  var res = await mysql("legsworkOrder")
  num = res.length
  str += "\"data2\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var legorder_type = res[i].legswork_type
    var profit = res[i].profit
    var start_point = res[i].start_point
    var destination = res[i].destination
    var complete_time = res[i].complete_time
    var order_time = res[i].order_time

    var res1 = await mysql("orderinfo").where({ order_id })
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
    if (count == 2)
      break;
  }
  str += "],"

  var res = await mysql("packageOrder")
  num = res.length
  str += "\"data3\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var get_pack_addr = res[i].get_pack_addr
    var profit = res[i].profit
    var sex_require = res[i].sex_require
    var shipping_address = res[i].shipping_address
    var complete_time = res[i].complete_time
    var order_time = res[i].order_time

    var res1 = await mysql("orderinfo").where({ order_id })
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
    if (count == 2)
      break;
  }
  str += "],"

  var res = await mysql("substituteOrder")
  num = res.length
  str += "\"data4\":["
  var count = 0
  for (var i = 0; i < num; i++) {
    var order_id = res[i].order_id
    var class_time = res[i].class_time
    var profit = res[i].profit
    var sex_require = res[i].sex_require
    var class_address = res[i].class_address
    var class_name = res[i].class_name
    var order_time = res[i].order_time

    var res1 = await mysql("orderinfo").where({ order_id })
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
    if (count == 2)
      break;
  }
  str += "]}"
  ctx.state.data =JSON.parse(str)
}
