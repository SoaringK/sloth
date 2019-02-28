var foodShop = require('../../../api/foodShop.js')

module.exports = async ctx => {
  var foodShop_list = await foodShop.get_Foodshop_List()
  ctx.state.data = foodShop_list
}


