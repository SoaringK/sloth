const { mysql } = require('../qcloud');

async function get_User_Base_Info(open_id) {
  var res = await mysql("cSessionInfo").where({ open_id })
  return res
}

module.exports = {
  get_User_Base_Info
}
