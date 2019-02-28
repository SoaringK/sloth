const { mysql } = require('../qcloud');

async function get_ptJob_List() {
  var res = await mysql("partTimeList")
  return res
}

async function get_ptJob_Detail(pt_id) {
  var res = await mysql("partTimeList").where({pt_id})
  return res
}

module.exports = {
  get_ptJob_List,
  get_ptJob_Detail
}
