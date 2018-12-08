var test = require('../app/test.js')
module.exports = async ctx => {
  ctx.state.data = test.test("hellotest")
}