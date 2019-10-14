const svgCaptcha = require('svg-captcha')
let code = ''
function getCaptcha(req,res,next){
  req.session.code = null
  var captcha = svgCaptcha.create({
    inverse:false,
    fontSize:36,
    noise:2,
    width:80,
    height:30
  })
  req.session.code =captcha.text.toLowerCase()
  console.log(req.session.code)
  res.setHeader('Content-Type','image/svg+xml')
  // res.send({err:1,msg:'hahah'})
  res.send(String(captcha.data))
  // res.end();
}
exports.code = code
exports.getCaptcha = getCaptcha