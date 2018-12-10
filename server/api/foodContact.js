const { mysql } = require('../qcloud');

async function get_FoodContact_Info(open_id) {
  var res = await mysql("foodContactInfo").where({ open_id }).select("open_id as cust_id", "user_name as cust_name", "user_tel as cust_phone", "user_address_room as cust_addr_room", "user_address_building as cust_addr_building", "user_Wechat as cust_Wechat", "address_id as addr_id", "default_address as default_id")
  return res
}

async function add_FoodContact(open_id, user_name, user_tel, user_address_building, user_address_room, user_wechat, address_id) {
  var person = {
    open_id: open_id,
    user_name: user_name,
    user_tel: user_tel,
    user_address_building: user_address_building,
    user_address_room: user_address_room,
    user_wechat: user_wechat,
    address_id: address_id,
    default_address: 0
  }
  var res = await mysql("foodContactInfo").insert(person)
  return res
}

async function update_FoodContact_Info(open_id, prename, prephone, preaddr_building, preaddr_room, name, phone, addr_building, addr_room) {
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address_building: preaddr_building, user_address_room: preaddr_room }).update({ user_name: name, user_tel: phone, user_address_building: addr_building, user_address_room: addr_room })
  return res
}

async function del_FoodContact(open_id,prename,prephone,preaddr_building,preaddr_room){
  var res = await mysql("foodContactInfo").where({ open_id: open_id, user_name: prename, user_tel: prephone, user_address_room: preaddr_room, user_address_building: preaddr_building }).del()
}

async function change_Default_Addr(open_id,addr_id){
  var res = await mysql("foodContactInfo").where({ open_id: open_id, default_address: 1 }).update({ default_address: 0 })
  var res1 = await mysql("foodContactInfo").where({ open_id: open_id, address_id: addr_id }).update({ default_address: 1 })
  return res1
}

module.exports = {
  get_FoodContact_Info,
  add_FoodContact,
  update_FoodContact_Info,
  del_FoodContact,
  change_Default_Addr
}

