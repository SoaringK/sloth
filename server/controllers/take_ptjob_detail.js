var ptJob = require('../api/ptJob.js')

module.exports = async ctx => {
  var pt_id = ctx.request.query.pt_id
  var res = await ptJob.get_ptJob_Detail(pt_id)
  var str = "{\"data\":["
  var job_name = res[0].pt_name
  var work_time = res[0].work_time
  var work_address = res[0].work_address
  var work_require = res[0].work_requirement
  var job_tag1 = res[0].pt_type
  var job_tag2 = res[0].time_validity
  var salary = res[0].pt_salary
  var job_description = res[0].job_description
  var contact_name = res[0].contact_name
  var cantact_tel = res[0].cantact_tel
  var contact_email = res[0].contact_email

  str += "{"
  str += "\"pt_id\":\"" + pt_id + "\","
  str += "\"job_name\":\"" + job_name + "\","
  str += "\"work_time\":\"" + work_time + "\","
  str += "\"work_address\": \"" + work_address + "\","
  str += "\"work_require\": \"" + work_require + "\","
  str += "\"job_tag1\": \"" + job_tag1 + "\","
  str += "\"job_tag2\": \"" + job_tag2 + "\","
  str += "\"salary\": \"" + salary + "\","
  str += "\"job_description\": \"" + job_description + "\","
  str += "\"contact_name\": \"" + contact_name + "\","
  str += "\"cantact_tel\": \"" + cantact_tel + "\","
  str += "\"contact_email\": \"" + contact_email + "\""
  str += "}]}"
  ctx.state.data = JSON.parse(str)
}
