var foodContact = require('../api/foodContact.js')

module.exports = async ctx => {
  var name = ctx.request.query.cust_name
  var phone = ctx.request.query.cust_phone
  var cust_wechat = ctx.request.query.cust_wechat
  var cust_addr_building = ctx.request.query.cust_addr_building
  var cust_addr_room = ctx.request.query.cust_addr_room
  
  var open_id = ctx.request.query.user_id
  var ret = await foodContact.get_FoodContact_Info_All(open_id)
  var addr_id = (ret.length == 0 ? 0 : parseInt(ret[ret.length - 1].addr_id)+1)
  var res = foodContact.add_FoodContact(open_id, name, phone, cust_addr_building, cust_addr_room, cust_wechat, addr_id)
  ctx.state.data = res
}