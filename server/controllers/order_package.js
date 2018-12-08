var packageOrder = require('../api/packageOrder.js')

module.exports = async ctx => {
  var order_info = JSON.parse(ctx.request.query.order_info)
  var open_id = ctx.request.query.user_id

  var get_pack_addr_arr = ['京东', '邮局', '一饭', '二饭', '一饭蜂巢', '二饭蜂巢']
  var profit_arr = ['1', '2', '3', '4', '5', '6']
  var weight_arr = ['<1KG', '1-2KG', '2-3KG', '3-5KG', '5KG以上']
  var sex = ['不限', '男', '女']
  var complete_time_info_arr = [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '30']
  ]
  var shipping_address_arr = [
      ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8东', 'C8西', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14'],
      ['送楼下', '送上楼', '代保管']
  ]
  var get_pack_addr = get_pack_addr_arr[order_info.get_pack_addr]
  var package_num = order_info.package_num
  var complete_time = complete_time_info_arr[0][order_info.complete_time[0]] + ' ' + complete_time_info_arr[1][order_info.complete_time[1]] + ':' + complete_time_info_arr[2][order_info.complete_time[2]]

  var profit = profit_arr[order_info.profit]
  var weight = weight_arr[order_info.weight]
  var sex_require = sex[order_info.sex_require]
  var shipping_address = shipping_address_arr[0][order_info.shipping_address[0]] + ' ' + shipping_address_arr[1][order_info.shipping_address[1]]

  var contact_name = order_info.contact_name
  var contact_tel = order_info.contact_tel
  var contact_wechat = order_info.contact_wechat

  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  if (hour < 10)
    hour = '0' + hour
  var minute = date.getMinutes()
  if (minute < 10)
    minute = '0' + minute
  var order_time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute 

  var res = await packageOrder.add_packageOrder(open_id, order_time, get_pack_addr, package_num, complete_time, profit, weight, sex_require, shipping_address, contact_name, contact_tel, contact_wechat, order_time)
  ctx.state.data = res
}