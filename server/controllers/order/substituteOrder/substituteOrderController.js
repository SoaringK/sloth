var substituteOrder = require('../../../api/substituteOrder.js')

module.exports = async ctx => {
  var order_info = JSON.parse(ctx.request.query.order_info)
  var open_id = ctx.request.query.user_id

  var sex = ['男', '女']
  var class_time_arr = [
      ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  ]

  var class_address = order_info.class_address
  var class_time = class_time_arr[0][order_info.class_time[0]] + ' ' + class_time_arr[1][order_info.class_time[1]] + ':' + class_time_arr[2][order_info.class_time[2]]
  var class_name = order_info.class_name

  var profit = order_info.profit
  var sex_require = sex[order_info.sex_require]
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

  var res = substituteOrder.add_substituteOrder(open_id, order_time, class_address, class_time, class_name, profit, sex_require, other_require, other_require, contact_name, contact_tel, contact_wechat, order_time)
  ctx.state.data = res
}