const express = require('express')
const router = express.Router()
const user = require('../model/userModel')
const Mail = require('../../../utils/mail')
const JWT = require('../../../utils/jwt')
let codes = {}
/**
 * @api {post} /user/reg   用户注册
 * @apiName reg
 * @apiGroup User
 * @apiParam {string} us 用户名
 * @apiParam {string} ps 用户密码
 * @apiParam {string} code 验证码
 * @apiSuccess {string} firstname firstname of the user
 * @apiSuccess {string} lastname lastname of the user
 * 
 * 
 */
router.post('/reg',(req,res)=>{
  let {us,ps,code} = req.body
  if(us&&ps&&code){
    if(codes[us]!=code){return res.send({err:-5,msg:'验证码错误'})}
    user.find({us}).then((data)=>{
      if(data.length == 0){
        return user.insertMany({us:us,ps:ps})
      }else{
        res.send({err:-3,msg:'用户名已存在'})
      }
    })
    .then(()=>{
      res.send({err:0,msg:'注册ok'})
    }).catch((err)=>{
      res.send({err:-2,msg:'注册失败'})
    })
  }else{
    return res.send({err:-1,msg:'参数错误'})
  }
})
/**
 * @api {post} /user/login   用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} us 用户名
 * @apiParam {string} ps 用户密码
 * @apiSuccess {string} firstname firstname of the user
 * @apiSuccess {string} lastname lastname of the user
 * 
 * 
 */
router.post('/login',(req,res)=>{
  let {us,ps} = req.body
  if(us && ps){
    user.find({us,ps}).then((data)=>{
      if(data.length){
        req.session.login=true;
        req.session.name=us
        let token = JWT.createToken({login:true,name:us})
        res.send({err:0,msg:'登录ok',token:})
      }else{
        res.send({err:-2,msg:'用户名或密码错误'})
      }
    }).catch((err)=>{
      return res.send({err:-1,msg:'内部错误'})
    })
  }else{
    return res.send({err:-1,msg:'参数错误'})
  }
})
router.post('/logOut',(req,res)=>{
  req.session.destroy()
  res.send({err:0,msg:'退出'})
})
/**
 * @api {post} /user/getMailCode   发送邮箱
 * @apiName getMailCode
 * @apiGroup User

 * @apiParam {string} mail 验证码
 * @apiSuccess {string} firstname firstname of the user
 * @apiSuccess {string} lastname lastname of the user
 * 
 * 
 */
router.post('/getMailCode',(req,res)=>{
  let {mail} = req.body
  let code = parseInt(Math.random()*10000)
   Mail.send(mail,code).then(()=>{
    codes[mail] = code
    res.send({err:0,msg:'发送验证码成功'})
  }).catch((err)=>{
    res.send({err:-1,msg:'验证码发送失败'})
  })
})
module.exports = router