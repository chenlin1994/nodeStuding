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



function send(mail,code){
  let mailobj = {
    from:'"Fred Foo" <1045519407@qq.com>',
    to:mail,
    subject:'19012',
    text:`您的验证码是${code}，有效期五分钟`,
    // html:"<b>hello world</b>"
  }
  return new Promise((resolve,reject)=>{
    transporter.sendMail(mailobj,(err,data)=>{
      console.log(err)
      console.log(data)
      if(err){
        reject()
      }else{
        resolve()
      }

    });
  })

}
module.exports = {send}