const express = require('express')
const router = express.Router()
const getCode = require('../../../utils/code.js')
router.get('/getCaptcha',(req,res,next)=>{

  return getCode.getCaptcha(req,res,next)
})


module.exports = router