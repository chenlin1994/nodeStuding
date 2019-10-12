const express = require('express')
const app = express()
app.use('/',(req,res,next)=>{
  let {token} = req.query
  if(token){
  next() //是否继续放下执行
  }else{
    res.send('is not token')
  }
})

app.get('/test1',(req,res)=>{
  console.log('test1')
  let {token} = req.query
  if(token){
    res.send('ok')
  }else{
    res.send('not ok')
  }
})

