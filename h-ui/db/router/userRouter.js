const express = require('express')
const router = express.Router()
const user = require('../model/userModel')
const Mail = require('../../../utils/mail')
const JWT = require('../../../utils/jwt')
const getCode = require('../../../utils/code')
const Geetest = require('../../../utils/gt-sdk')
const click =  require('../../../utils/click')
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
  let {us,ps,code} = req.body
  if(us && ps && code==req.session.code){
    user.find({us,ps}).then((data)=>{
      if(data.length){
        req.session.login=true;
        req.session.name=us
        
        let token = JWT.createToken({login:true,name:us})
        res.send({err:0,msg:'登录ok',token:token})
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

router.post('/validate-click',(req,res)=>{
  click.validata(req.session.fallback,{
    geetest_challenge: req.body.geetest_challenge,
    geetest_validate: req.body.geetest_validate,
    geetest_seccode: req.body.geetest_seccode
  },function(err,success){
    if(err){
      // 网络错误
      res.send({
          status: 'error',
          info: err
      })
  }else if(!success){
      // 二次验证失败
      res.send({
          status: 'fail',
          info: '登录失败'
      });
  }else{
      res.send({
          status: 'success',
          info: '登录成功'
      })
  }
  })
})
router.get('/register-click', function(req, res){
  // 向极验证申请每次验证所需的challenge
  click.register(null, function(err, data){
      if(err){
          console.error(err);
          res.status(500);
          res.send(err);
          return;
      }

      if(!data.success){
          // 进入failback，如果一直进入此模式，请检查服务器到极验证服务器是否可访问
          // 可以通过修改hosts把极验服务器api.geetest.com指定到不可访问的地址

          // 为以防万一，你可以选择以下两种方式之一：

          // 1. 继续使用极验证提供的failback备用方案
          req.session.fallback = true;
          res.send(data);

          // 2. 使用自己提供的备用方案
          // todo

      } else {
          // 正常模式
          req.session.fallback = false;
          res.send(data);
      }
  })
})








module.exports = router