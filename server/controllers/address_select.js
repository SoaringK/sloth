var foodContact = require('../api/foodContact.js')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var res = await foodContact.get_FoodContact_Info_All(open_id)
  ctx.state.data = res
}