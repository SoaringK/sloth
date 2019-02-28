const { mysql } = require('../qcloud');

async function get_Foodshop_List() {
  var res = await mysql("foodShop").select("shop_img_url as src", "shop_id as id", "shop_name as name", "shipping_fee as delivery_fee", "mini_delivery_fee as cost", "shop_intro as address")
  return res
}

async function get_Foodshop_Info(shop_id) {
  var res = await mysql("foodShop").where({ shop_id })
  return res
}

module.exports = {
  get_Foodshop_List,
  get_Foodshop_Info
}

