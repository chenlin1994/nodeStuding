const express = require('express')
const bodyParser = require('body-parser')
const app =express()
const jwt = require('jsonwebtoken')
let  secret = 'dfsjflskflelf'  //产生tokne的私钥
let payload={
  us:123,
  ps:456
}
//产生一个token
let token = jwt.sign(payload,secret)//hs256加密 数据 载荷 screat
let token1 ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ29.eyJ1cyI6MTIzLCJwcyI6NDU2LCJpYXQiOjE1NzA4NTA3Nzh9.SGVPIsIg99qUVgt150wCVC7M8PPkh66MHhS1GOKTn7U'
//验证token的合法性
// jwt.verify(token1,secret,(err,data)=>{
//   console.log(err)
//   console.log(data)
// })
console.log(token)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get('/haha/aa.js',(req,res)=>{
  console.log(123321)
})
app.get('/user/login',(req,res)=>{
  // console.log(req.query)
  let {us,ps} =req.query
  if(us == 'ch' && ps =="ni"){
    res.send({code:200,data:[]})
  }else{
    res.send({code:500,error:'参数错误'})
  }
})
app.get('/redire',(req,res)=>{
  res.statusCode=302
  res.setHeader('location','http://www.baidu.com')
  res.end()
})
app.post('/user/register',(req,res)=>{
  //express 不能直接解析消息体 需要通过第三方插件解析
  console.log(req.body)
})




app.listen(3002,()=>{
  console.log('server start')
})