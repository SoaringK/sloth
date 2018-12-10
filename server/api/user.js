const { mysql } = require('../qcloud');

async function get_User_Base_Info(open_id) {
  var res = await mysql("cSessionInfo").where({ open_id })
  return res
}

async function get_User_Other_Info(open_id){
  var res = await mysql('userInfo').where({ open_Id })
  return res
}

async function change_User_Other_Info(open_id,name,phone,wechat){
  var res = await mysql("userInfo").where({ open_id: open_id })
  var res1
  if (res.length == 0) {
    res1 = await mysql("userInfo").insert({ open_id: open_id, user_name: name, user_tel: phone, user_wechat: wechat })
  } else {
    res1 = await mysql("userInfo").where({ open_id: open_id }).update({ open_id: open_id, user_name: name, user_tel: phone, user_wechat: wechat })
  }
  return res1
}

module.exports = {
  get_User_Base_Info,
  get_User_Other_Info,
  change_User_Other_Info
}
