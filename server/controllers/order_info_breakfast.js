const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res1 = await mysql("foodOrder").where({ order_id })
  /*if(res1.length == 0)
    continue*/
  var open_id = res1[0].open_id
  var res2 = await mysql("cSessionInfo").where({ open_id })
  /*if (res2.length == 0)
    continue*/
  var userinfo = res2[0].user_info
  var json = JSON.parse(userinfo)
  var img = json.avatarUrl
  var address_id = res1[0].address_id
  var res3 = await mysql("foodContactInfo").where({ open_id, address_id })
  /*if (res3.length == 0)
    continue*/
  var res4 = await mysql("foodOrderDetail").where({ order_id })
  /*if (res4.length == 0)
    continue*/
  var shop_id = (res4[0].good_id).substr(1, 1)
  var res5 = await mysql("foodShop").where({ shop_id })
  /*if (res5.length == 0)
    continue*/
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
    var res6 = await mysql("foodMenu").where({ good_id })
    //if (res6.length == 0)
    //continue
    var good_name = res6[0].good_name
    var numb = res4[i].good_order_num
    str += "\"name\":\"" + good_name + "\","
    str += "\"numb\":" + numb + "}"
    count += 1
  }
  str += "]}}"
  ctx.state.data = JSON.parse(str)
}
