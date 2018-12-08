const { mysql } = require('../qcloud')

module.exports = async ctx => {
  var order_id=ctx.request.query.order_id
  var order_type=ctx.request.query.order_type
  if(order_type==1){ 
    var res1 = await mysql("foodOrder").update({ order_state: 2 }).where({ order_id })
  }else{
    if(order_type==2){ 
      var res1 = await mysql("legsworkOrder").update({ order_state: 2 }).where({ order_id })
    }else{
      if(order_type==3){
        var res1 = await mysql("packageOrder").update({ order_state: 2 }).where({ order_id })
      }else{
        if(order_type==4){
          var res1 = await mysql("substituteOrder").update({ order_state: 2 }).where({ order_id })

        }
      }
    }
  }
  var res2 = await mysql("orderinfo").update({ state: 2 }).where({ order_id })
  var res3 = await mysql("orderList").update({ order_state: 2 }).where({ order_id })
  ctx.state.data = res1 && res2 && res3 
}