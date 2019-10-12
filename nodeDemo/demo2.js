const fs = require('fs')
const url = require('url')
// fs.readdir('./im',(err,dirs)=>{
//   for(let index = 0;index<dirs.length;index++){
//     console.log(dirs[index])
//   }
// })
// fs.stat('./im',(err,stats)=>{
//   if(stats.isFile()){
//     console.log('is file')

//   }else{
//     console.log('is dir')
//   }
// })
let urlstring = 'https://wwww.baidu.com/path?haha=123#ehre'
let obj = {
  protocol: 'https:',
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: '#ehre',
  search: '?haha=123',
  query: 'haha=123',
  pathname: 'wwww.baidu.com/path',
  path: 'wwww.baidu.com/path?haha=123',
  href: 'https:wwww.baidu.com/path?haha=123#ehre'
}
console.log(url.parse(urlstring))
console.log(url.format(obj))