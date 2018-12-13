var foodOrder = require('../../../api/foodOrder.js')
var legsworkOrder = require('../../../api/legsworkOrder.js')
var packageOrder = require('../../../api/packageOrder.js')
var substituteOrder = require('../../../api/substituteOrder.js')
var foodContact = require('../../../api/foodContact.js')
var foodMenu = require('../../../api/foodMenu.js')
var foodShop = require('../../../api/foodShop.js')
var order = require('../../../api/order.js')

module.exports = async ctx => {
  var order_state = -1
  var ret = await order.get_Order_List(order_state)
  var ret_length = ret.length
  var str = "{\"data\":["
  var count = 0
  var length
  if (ret_length>=10)
    length = 10
  else
    length = ret_length
    
  for (var i = 0; i < length;i++){
    var order_id = ret[ret_length - i - 1].order_id
    var order_type = ret[ret_length - i - 1].order_type
    if (order_type == 1) {
      var res = await foodOrder.get_FoodOrder_Info(order_id)
      var res1 = await foodOrder.get_FoodOrder_Detail(order_id)
      var order_total_item = res1.length
      var good_id= res1[0].good_id
      var res4 = await foodMenu.get_Food_Content(good_id)
      var order_good_name = res4[0].good_name
      var shop_id = good_id.substr(1, 1)
      var res2 = await foodShop.get_Foodshop_Info(shop_id)

      var order_shop_address = res2[0].shop_intro
      var order_deli_fee = res2[0].shipping_fee

      var order_good_num = res1[0].good_order_num
      var open_id = res[0].open_id
      var address_id = res[0].address_id;
      var res3 = await foodContact.get_FoodContact_Info(open_id, address_id)

      var order_address_building = res3[0].user_address_building
      var order_address_room = res3[0].user_address_room
      var res5 = res[0].order_time

      order_time = res5.substr(5)
      var order_sum = res[0].total_cost
      var res6 = await order.get_Order_Info(order_id)
      if (res6.length > 0)
        continue
      if (res1.length == 0 || res2.length == 0 || res3.length == 0 || res4.length == 0 || res5.length == 0)
        continue
      
      if (count == 0)
        str += "{"
      else
        str += ",{"
      str += "\"order_type\":\"0\","
      str += "\"order_id\":\"" + order_id + "\","
      str += "\"order_shop_address\":\"" + order_shop_address + "\","
      str += "\"order_address_building\":\"" + order_address_building + "\","
      str += "\"order_address_room\":\"" + order_address_room + "\","
      str += "\"order_deli_fee\": \"" + order_deli_fee + "\","
      str += "\"order_total_item\": \"" + order_total_item + "\","
      str += "\"order_good_name\": \"" + order_good_name + "\","
      if (order_total_item <= 1)
        str += "\"order_good_num\": \"" + order_good_num + "\","
      else
        str += "\"order_good_num\": \"" + order_good_num + "等\","
      str += "\"order_deli_time\": \"明早7: 00 - 8: 00送达\","
      str += "\"order_time\": \"" + order_time + "\","
      str += "\"order_sum\": \"" + order_sum + "\""
      str += "}"
      count += 1
      }
      
      else
    if(order_type==2){
      var res = await packageOrder.get_packageOrder_Info(order_id)
        var get_pack_addr = res[0].get_pack_addr
        var profit = res[0].profit
        var sex_require = res[0].sex_require
        var shipping_address = res[0].shipping_address
        var complete_time = res[0].complete_time
        var order_time = res[0].order_time

       var res1 = await order.get_Order_Info(order_id)
        if (res1.length > 0)
          continue

        if (count == 0)
          str += "{"
        else
          str += ",{"
        str += "\"order_type\":\"1\","
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
    else
    if (order_type == 3) {
      var res = await legsworkOrder.get_legsworkOrder_Info(order_id)
      var legorder_type = res[0].legswork_type
      var profit = res[0].profit
      var start_point = res[0].start_point
      var destination = res[0].destination
      var complete_time = res[0].complete_time
      var order_time = res[0].order_time

      var res1 = await order.get_Order_Info(order_id)
      if (res1.length > 0)
        continue

      if (count == 0)
        str += "{"
      else
        str += ",{"
      str += "\"order_type\":\"2\","
      str += "\"order_id\":\"" + order_id + "\","
      str += "\"legorder_type\":\"" + legorder_type + "\","
      str += "\"profit\": \"" + profit + "\","
      str += "\"complete_time\": \"" + complete_time + "\","
      str += "\"start_point\": \"" + start_point + "\","
      str += "\"destination\": \"" + destination + "\","
      str += "\"order_time\": \"" + order_time + "\""
      str += "}"
      count += 1
    }
    else
    if(order_type==4){
      var res = await substituteOrder.get_substituteOrder_Info(order_id)
        var class_time = res[0].class_time
        var profit = res[0].profit
        var sex_require = res[0].sex_require
        var class_address = res[0].class_address
        var class_name = res[0].class_name
        var order_time = res[0].order_time

        var res1 = await order.get_Order_Info(order_id)
        if (res1.length > 0)
          continue

        if (count == 0)
          str += "{"
        else
          str += ",{"
        str += "\"order_type\":\"3\","
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
  }
  
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
