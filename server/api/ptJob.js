const { mysql } = require('../qcloud');

async function get_ptJob_List() {
  var res = await mysql("partTimeList")
  return res
}

module.exports = {
  get_ptJob_List
}
