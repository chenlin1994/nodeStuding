let nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host:'smtp.qq.com',
  port:465,
  secure:true,
  auth:{
    user:'1045519407@qq.com',
    pass:'uwkymfgzwavfbfcj'
  }
})
let mailobj = {
  from:'"Fred Foo" <1045519407@qq.com>',
  to:'1456557204@qq.com',
  subject:'19012',
  text:'您的验证码是44444，有效期五分钟',
  // html:"<b>hello world</b>"
}
transporter.sendMail(mailobj,(err,data)=>{
  console.log(err)
  console.log(data)
});

let err = new Error('发生错误')  //不会终止执行
throw err  //终止执行