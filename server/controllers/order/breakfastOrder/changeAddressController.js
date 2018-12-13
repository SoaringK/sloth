var foodContact = require('../../../api/foodContact.js')

module.exports = async ctx => {
  var name = ctx.request.query.name
  var phone = ctx.request.query.phone
  var addr_room = ctx.request.query.addr_room
  var addr_building = ctx.request.query.addr_building
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr_building = ctx.request.query.preaddr_building
  var preaddr_room = ctx.request.query.preaddr_room
  var open_id = ctx.request.query.user_id
  var res = await foodContact.update_FoodContact_Info(open_id,prename,prephone,preaddr_building,preaddr_room,name,phone,addr_building,addr_room)
  ctx.state.data = res
}