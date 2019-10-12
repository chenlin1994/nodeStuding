const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    //指定文件路径
    cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    //指定文件名
    let ext = file.originalname.split('.')
    ext = ext[ext.length-1]
    let tmpname = new Date().getTime()

    cb(null,`${tmpname}.${ext}`)
  }
})
var upload = multer({
  storage:storage
})
router.post('/upload',upload.single('img'),(req,res)=>{ //heheb要上传图片数据的key值，必须前后端同意
  let {size,mimetype,filename} = req.file
  console.log(mimetype)
  let types = ['png','jpg','jpeg','gif']
  let tmptype = mimetype.split('/')[1]
  if(size>40000){
    res.send({code:-1,msg:'图片过大'})
  }else if(types.indexOf(tmptype)==-1){
    res.send({code:-2,msg:'类型错误'})
  }
  res.send({img:`/images/${filename}`})
  console.log(req.file)
})

module.exports = router