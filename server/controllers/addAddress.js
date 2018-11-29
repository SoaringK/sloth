const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.cust_name
  var phone = ctx.request.query.cust_phone
  var cust_wechat = ctx.request.query.cust_wechat
  var cust_addr_building = ctx.request.query.cust_addr_building
  var cust_addr_room = ctx.request.query.cust_addr_room
  
  var open_id = ctx.request.query.user_id
  var ret = await mysql("foodContactInfo").where({ open_id})
  var addr_id = (ret.length==0?0:parseInt(ret[ret.length-1].address_id)+1)
  var person = {
    open_id: open_id,
    user_name :  name,
    user_tel : phone,
    user_address_building: cust_addr_building,
    user_address_room: cust_addr_room,    
    user_wechat: cust_wechat,
    address_id: addr_id,
    default_address : 0
  }
  var res = await mysql("foodContactInfo").insert(person)
  ctx.state.data = res
}