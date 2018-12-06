const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var name = ctx.request.query.name
  var phone = ctx.request.query.phone
  var wechat = ctx.request.query.wechat
  var open_id = ctx.request.query.user_id
  var res=await mysql("userInfo").where({ open_id:open_id })
  if(res.length==0){
    var res1 = await mysql("userInfo").insert({ open_id:open_id , user_name:name , user_tel:phone , user_wechat:wechat })
  }else{
    var res1=await mysql("userInfo").where({ open_id:open_id }).update({ open_id: open_id, user_name: name, user_tel: phone, user_wechat: wechat })
  }
  ctx.state.data = res1
}