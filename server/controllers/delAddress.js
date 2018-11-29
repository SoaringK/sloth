const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr_room = ctx.request.query.preaddr_room
  var preaddr_building = ctx.request.query.preaddr_building
  var open_id = ctx.request.query.user_id
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address_room: preaddr_room, user_address_building: preaddr_building}).del()
  ctx.state.data = res
}