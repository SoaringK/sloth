var user = require('../../../api/user.js')

module.exports = async ctx => {
  var open_id = ctx.request.query.user_id
  var res = await user.get_User_Other_Info(open_id)
  if(res.length!=0){
    var name=res[0].user_name
    var tel=res[0].user_tel
    var wechat=res[0].user_wechat
  }else{
    var name=0
    var tel=0
    var wechat=0
  }
  var str = "{\"data\":"
  str += "{" 
  str += "\"user_id\":\"" + open_id + "\","
  str += "\"user_name\":\"" + name + "\","
    str += "\"user_tel\":\"" + tel + "\","
    str += "\"user_wechat\":\"" + wechat + "\""
  str += "}"
  str += "}"
  ctx.state.data = JSON.parse(str)
}