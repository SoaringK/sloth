var user = require('../../../api/user.js')

module.exports = async ctx => {
  var name = ctx.request.query.name
  var phone = ctx.request.query.phone
  var wechat = ctx.request.query.wechat
  var open_id = ctx.request.query.user_id
  var res = await user.change_User_Other_Info(open_id, name, phone, wechat)
  ctx.state.data = res
}