const express = require('express')
const router = express.Router()
router.get('/add',(req,res)=>{
  res.send('user is ok')
})
module.exports = router