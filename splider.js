/*
  1.请求网站数据
  2.将数据保持
*/
var http = require('http')
var http1 = require('https')
var fs = require('fs')
var cheerio = require('cheerio')
const Bagpipe = require('bagpipe')
const request = require('request')
const url = 'http://nodejs.org/dist/index.json'
const url1 = 'https://www.qunar.com/?kwid=50426967|26378290102&cooperate=baidu50'
const url2 = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1570781432545_R&pv=&ic=&nc=1&z=&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&sid=&word=一个人&f=3&oq=Uncaught+SyntaxError%3A+Invalid+or+unexpected+token&rsp=-1'
let rawData = ''
http1.get(url2,(res) => {
  const {statusCode}=res;
  const contentType = res.headers['content-type']
  console.log(statusCode)
  let err = null
  if(statusCode == !200){
    err = new Error('请求状态码错误')
  }
  if(err){
    console.log(err)
    res.resume();
    return false;
  }
  res.on('data',(chunk)=>{
    // console.log(chunk.toString('utf8'))
    // console.log('数据传输ing')
    rawData += chunk.toString('utf8')
  })
  res.on('end',()=>{
    // console.log('数据传输完毕')
    fs.writeFile('./index.html',rawData,(err)=>{
    })
    return
    let arr = []
    let $ = cheerio.load(rawData)
    $('img').each((index,item)=>{
      arr.push('http:'+$(item).attr('src'))
    })
    var downloadPic = function(src,dest){
      request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        console.log('pic saved')
      })
    }
    const bagpipe = new Bagpipe(10,{timeout:100})
    for(var i=0;i<arr.length;i++){
      bagpipe.push(downloadPic,arr[i],'./imgs/'+i+'.jpg',function(err,data){

      })
    }
    
  })
}).on('error',(err)=>{
  console.log('请求错误')
})