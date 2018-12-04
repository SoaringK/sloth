const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_id = ctx.request.query.order_id
  var res1 = await mysql("foodOrder").where({ order_id })
  /*if(res1.length == 0)
    continue*/
  var user_id = res1[0].user_id
  var res2 = await mysql("cSessionInfo").where({ open_id: user_id })
  /*if (res2.length == 0)
    continue*/
  var userinfo = res2[0].user_info
  var json = JSON.parse(userinfo)
  var img = json.avatarUrl
  var address_id = res1[0].address_id
  var res3 = await mysql("contactInfo").where({ user_id, address_id })
  /*if (res3.length == 0)
    continue*/
  var res4 = await mysql("foodOrderDetail").where({ order_id })
  /*if (res4.length == 0)
    continue*/
  var shop_id = (res4[0].good_id).substr(1, 1)
  var res5 = await mysql("shop").where({ shop_id })
  /*if (res5.length == 0)
    continue*/
  var shop_name = res5[0].shop_name
  var user_name = res3[0].user_name
  var phone = res3[0].tel
  var address = res3[0].address

  var str = "{\"customer\":{\"userid\":\"" + user_id + "\","
  str += "\"img\":\"" + img + "\","
  str += "\"name\":\"" + user_name + "\","
  str += "\"phone\":" + phone + ","
  str += "\"address\":\"" + address + "\","
  str += "\"time\": \"明日早上7:30-8:00内送达\","
  str += "\"remark\": \"暂无\""
  str += "},\"status\":true,\"menu\":{\"name\":\"" + shop_name + "\",\"order\":["
  var count = 0
  for (var i = 0; i < res4.length; i++) {
    if (count == 0)
      str += "{"
    else
      str += ",{"
    var good_id = res4[i].good_id
    var res6 = await mysql("catalog_good").where({ good_id })
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
