var legsworkOrder = require('../../../api/legsworkOrder.js')

module.exports = async ctx => {
  var order_info = JSON.parse(ctx.request.query.order_info)
  var open_id = ctx.request.query.user_id

  var sex_arr = ['男', '女']
  var order_type_arr = ['校内跑腿', '代购']
  var good_type_arr = ['文件', '钥匙', '充电宝', '手机', '鲜花', '其他',]

  var legswork_type = order_type_arr[order_info.legorder_type]
  var complete_time = order_info.complete_time
  var good_type = good_type_arr[order_info.good_type]
  var start_point = order_info.start_point
  var destination = order_info.destination

  var profit = order_info.profit
  var other_require = order_info.other_require

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

  var res = await legsworkOrder.add_legsworkOrder(open_id, order_time, legswork_type, complete_time, good_type, start_point, destination, profit, other_require, contact_name, contact_tel, contact_wechat, order_time)
  ctx.state.data = res
}