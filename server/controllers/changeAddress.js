const { mysql } = require('../qcloud')

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
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address_building: preaddr_building, user_address_room: preaddr_room }).update({ user_name: name, user_tel: phone, user_address_building: addr_building, user_address_room: addr_room})
  ctx.state.data = res
}