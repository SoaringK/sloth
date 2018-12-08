const { mysql } = require('../qcloud');

async function get_Food_Catalog(shop_id) {
  var res = await mysql("foodMenu").where({ shop_id }).select("good_catalog").distinct()
  return res
}

async function get_Menu_Content(shop_id, typeName) {
  var res = await mysql("foodMenu").where({ shop_id, good_catalog: typeName })
  return res
}

async function get_Food_Content(good_id) {
  var res = await mysql("foodMenu").where({ good_id })
  return res
}


module.exports = {
  get_Food_Catalog,
  get_Menu_Content,
  get_Food_Content
}

