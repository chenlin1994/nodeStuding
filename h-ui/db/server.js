const express = require('express')
const db = require('./connect')
const bodyParser = require('body-parser')
const app =express()

const request = require('request')
const path = require('path')
const cors = require('cors')
const cookieParser  = require('cookie-parser')
const session = require('express-session')
const  JWT = require('../../utils/jwt')
app.use(cors())
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')
const codeRouter = require('./router/codeRouter')
var  Geetest = require('gt3-sdk')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//session 整体配置
app.use(session({
  secret:'dfjlaejeki',
  cookie:{maxAge:60*1000},
  resave:true,
  saveUninitialized:false
}))
app.use('/user',userRouter)
app.use('/food',(req,res,next)=>{
  console.log(req.body)
  console.log(req.session)
  let {token} = req.body
  // JWT.checkToken(token).then((data)=>{
  //   next()
  // }).catch((e)=>{
  //   res.send({code:'999',msg:'token验证失败'})
  // })
  if(req.session.login){
    next()
  }else{
    res.send({err:11,msg:'未登录'})
  }
},foodRouter)
app.use('/code',codeRouter)
app.use('/file',fileRouter)
app.get('/',(req,res)=>{
  res.redirect(302,'/login.html')
})
app.use(express.static(path.join(__dirname,'./static')))
app.use('/images',express.static(path.join(__dirname,'./uploads')))
app.use('/public',express.static(path.join(__dirname,'./images')))
app.use('/apidoc',express.static(path.join(__dirname,'./apidoc')))
app.get('/checkSeccion',(req,res)=>{
  if(!req.session.login){
    res.json({code:-1})
  }
 
})
app.get('/cors',(req,res)=>{
  res.send('ok')
  request('',(err,res,body)=>{
    console.log(body)
  })
})
app.listen(3105,()=>{
  console.log('server start')
})


