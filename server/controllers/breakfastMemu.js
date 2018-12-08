var foodMenu = require('../api/foodMenu.js')
var foodShop = require('../api/foodShop.js')

module.exports = async ctx => {
  var shop_id = ctx.request.query.id
  var catalog = await foodMenu.get_Food_Catalog(shop_id)
  var num = catalog.length
  var shop = await foodShop.get_Foodshop_Info(shop_id)
  var str = "{\"id\":" + shop_id + ",\"shop\":{\"src\":\"../../images/breakfastMenu/shop.png\",\"deli\":" + shop[0].mini_delivery_fee + ",\"delifee\":" + shop[0].shipping_fee + ",\"addr\":\""+shop[0].shop_intro+"\",\"notice\": \""+shop[0].shop_notice+"\"},"
  for(var i=0;i<num;i++){
    if(i==0)
      str += "\"menu\":[{"
    else
      str += ",{"
    var typeName = catalog[i].good_catalog
    var menuContent = await foodMenu.get_Menu_Content(shop_id,typeName)
    str += "\"typeName\":\"" + typeName + "\",\"menuContent\": ["
    for (var j = 0; j < menuContent.length;j++){
      var good_id = menuContent[j].good_id
      var foodcontent = await foodMenu.get_Food_Content(good_id)
      if(j==0)
        str += "{"
      else 
        str += ",{"
      str += "\"src\":\"" + foodcontent[0].good_img_url +"\","
      str += "\"foodid\":\"" + foodcontent[0].good_id + "\","
      str += "\"name\":\"" + foodcontent[0].good_name+"\","
      str += "\"intr\":\"" + foodcontent[0].good_intro +"\","
      str += "\"gsale\":\"" + foodcontent[0].good_sale + "\","
      str += "\"price\":" + foodcontent[0].good_price +","
      str += "\"total\":0,"
      str += "\"numb\":0"
      str += "}"
    }
    str += "]}"
  }
  str += "]}"
  ctx.state.data = JSON.parse(str)
}
