const express = require('express')
const router = express.Router()
const foodModel = require('../model/foodModel')

/**
 * 
 * @api {post} /food/add 添加菜品
 * @apiName add
 * @apiGroup food
 * 
 * @apiParam {String} name 用户名
 * @apiParam {String} price 用户名
 * @apiParam {String} desc 用户名
 * @apiParam {String} typename 用户名
 * @apiParam {String} typeid 用户名
 * @apiParam {String} img 用户名
 * 
 * @apiSuccess {String} firstname   姓氏
 * @apiSuccess {String} lastname    名字
 */
router.post('/add',(req,res)=>{
  let { name,price,desc,typename,typeid,img}  = req.body
  foodModel.insertMany({ name,price,desc,typename,typeid,img} ).then((data)=>{
    res.send({err:0,msg:'添加成功'})
  }).catch(()=>{
    res.send({err:-1,msg:'添加失败'})
  })
})

/**
 * 
 * @api {post} /food/findbytypeId 添加菜品
 * @apiName add
 * @apiGroup food
 * 
 * @apiParam {String} name 用户名
 * @apiParam {String} price 用户名
 * @apiParam {String} desc 用户名
 * @apiParam {String} typename 用户名
 * @apiParam {String} typeid 用户名
 * @apiParam {String} img 用户名
 * 
 * @apiSuccess {String} firstname   姓氏
 * @apiSuccess {String} lastname    名字
 */
router.get('/findbytypeId',(req,res)=>{
  let {typeid} = req.query
  if(typeid==0){
    foodModel.find({typeid})
    .then((data)=>{
      res.send({err:0,msg:'查询ok',info:{data:data}})
    })
    .catch(()=>{
      res.send({err:-1,msg:'查询失败'})
    })
  }else{
    foodModel.find()
    .then((data)=>{
      res.send({err:0,msg:'查询ok',info:{data:data}})
    })
    .catch(()=>{
      res.send({err:-1,msg:'查询失败'})
    })
  }
  
})
/**
 * 
 * @api {post} /food/add 添加菜品
 * @apiName add
 * @apiGroup food
 * 
 * @apiParam {String} name 用户名
 * @apiParam {String} price 用户名
 * @apiParam {String} desc 用户名
 * @apiParam {String} typename 用户名
 * @apiParam {String} typeid 用户名
 * @apiParam {String} img 用户名
 * 
 * @apiSuccess {String} firstname   姓氏
 * @apiSuccess {String} lastname    名字
 */
router.get('/find/kw',(req,res)=>{
  let {kw} = req.query
  let reg = new RegExp(kw)
  // foodModel.find({name:{$regex:reg}})
  foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
  .then((data)=>{
    res.send({code:1,msg:'成功',info:{data:data}})
  })
  .catch(()=>{
    res.send({code:-1,msg:'错误'})
  })
})

router.post('/delete',(req,res)=>{
  let {_id} = req.body
  foodModel.remove({_id})
  .then((data)=>{
    res.send({code:1,msg:'删除成功'})
  })
  .catch((data)=>{
    res.send({code:-1,msg:'删除失败'})
  })
})

router.post('/update',(req,res)=>{
  let {_id,name,price,desc,typename,typeid,img} = req.body
  foodModel.updateOne({_id},{name,price,desc,typename,typeid,img})
  .then((data)=>{
    res.send({code:1,msg:'修改成功'})
  })
  .catch((data)=>{
    res.send({code:-1,msg:'修改失败'})
  })
})


router.post('/getInfoByPage',(req,res)=>{
  let {pageSize=5,page=1} = req.body
  let count = 0
  foodModel.find()
  .then((list)=>{
    count=list.length
    return foodModel.find().limit(Number(pageSize)).skip((page-1)*pageSize)
  })
  .then((data)=>{
    let allpage = Math.ceil(count/pageSize)
    res.send({code:1,msg:'查询成功',info:{data:data,count,allpage}})
  })
  .catch((data)=>{
    res.send({code:-1,msg:'查询失败'})
  })
})
module.exports = router