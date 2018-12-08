var foodContact = require('../api/foodContact.js')

module.exports = async ctx => {
  var prename = ctx.request.query.prename
  var prephone = ctx.request.query.prephone
  var preaddr_room = ctx.request.query.preaddr_room
  var preaddr_building = ctx.request.query.preaddr_building
  var open_id = ctx.request.query.user_id
  var res = await foodContact.del_FoodContact(open_id, prename, prephone, preaddr_building, preaddr_room)
  ctx.state.data = res
}