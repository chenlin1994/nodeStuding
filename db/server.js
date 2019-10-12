const express = require('express')
const db = require('./connect')
const bodyParser = require('body-parser')
const app =express()
const userRouter = require('./router/userRouter')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/user',userRouter)

app.listen(3004,()=>{
  console.log('server start')
})