var foodOrder = require('../../../api/foodOrder.js')
var user = require('../../../api/user.js')
var foodContact = require('../../../api/foodContact.js')
var foodShop = require('../../../api/foodShop.js')
var foodMenu = require('../../../api/foodMenu.js')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res1 = await foodOrder.get_FoodOrder_Info(order_id)
  var open_id = res1[0].open_id
  var res2 = await user.get_User_Base_Info(open_id)
  var userinfo = res2[0].user_info
  var json = JSON.parse(userinfo)
  var img = json.avatarUrl
  var address_id = res1[0].address_id
  var res3 = await foodContact.get_FoodContact_Info(open_id,address_id)
  var res4 = await foodOrder.get_FoodOrder_Detail(order_id)
  var shop_id = (res4[0].good_id).substr(1, 1)
  var res5 = await foodShop.get_Foodshop_Info(shop_id)
  var shop_name = res5[0].shop_name
  var user_name = res3[0].user_name
  var phone = res3[0].user_tel
  var user_address_building = res3[0].user_address_building
  var user_address_room = res3[0].user_address_room
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
  user_address_building = dormitory[user_address_building]
  var user_address = user_address_building + " " + user_address_room
  var state = res1[0].order_state
  var str = "{\"customer\":{\"open_id\":\"" + open_id + "\","
  str += "\"img\":\"" + img + "\","
  str += "\"name\":\"" + user_name + "\","
  str += "\"phone\":" + phone + ","
  str += "\"address\":\"" + user_address + "\","
  str += "\"time\": \"明日早上7:30-8:00内送达\","
  str += "\"remark\": \"暂无\""
  str += "},\"status\":\""+state+"\",\"menu\":{\"name\":\"" + shop_name + "\",\"order\":["
  var count = 0
  for (var i = 0; i < res4.length; i++) {
    if (count == 0)
      str += "{"
    else
      str += ",{"
    var good_id = res4[i].good_id
    var res6 = await foodMenu.get_Food_Content(good_id)
    var good_name = res6[0].good_name
    var numb = res4[i].good_order_num
    str += "\"name\":\"" + good_name + "\","
    str += "\"numb\":" + numb + "}"
    count += 1
  }
  str += "]}}"
  ctx.state.data = JSON.parse(str)
}
