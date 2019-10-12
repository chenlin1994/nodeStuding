### markdown使用
# 标题1
## 标题2
```js
 console.log(111)
```
> 引用内容
+ 列表一
  + xxx
  + xxxx
+ 列表2
  1. 111
  2. 222222
  3. hahahah
[官网里链接](http://www.baidu.com)

# node
## what
  + chrome v8 runtime
  + 事件驱动
  + 非阻塞i/o

i/o：input output 输入输出流 正常下i/o的操作是阻塞的（ajax同步)
网络请求 数据库处理 文件读写。。。
优点:高并发特别好

## why 
  1. 能够编写api
  2. 了解前后端的交互流程

### js运行环境
 + 浏览器
    + 基本语法
    + bom
    + dom
    + ajax
    + 系统问及那数据库（不能，不是语言不能，出于安全性考虑）
  + 服务器
    + 基本语法
    + 能操作数据库
    + 能操作本文文件
  
限制语言能力的不是语言本省而是语言的运行环境

~~~
npm config set registry https://registry.npm.taobao.org
配置是否成功验证   npm config get registry或npm info express
~~~

### node运行环境 REPL

### 模块化
 + 内置模块
 + 第三方模块
 + 自定义模块
    - 创建一个模块（一个js文件为一个模块）
    - 导出一个模块（module.exports=name）
    - 引用一个模块并调用


#### 打印昂前目录的目录树
  1. 实现的效果
  2. 分析功能点
      + 当前目录结构
      + 分辨是文件还是文件夹


### 内置模块 fs


### 内置模块url

URL 统一资源定位符

### 爬虫案例

  1. 获取目标网站 http模块
  2. 分析网站内容 cheerio 可以使用jq里的选择器
  3. 获取有效信息 下载或者其他操作
  4. 

### 邮箱验证码案例
  + nodemailer 可以实现发邮件
  + npm install nodemailer -S

### 网络基本知识
  + web服务器
  + api服务器
 
 ### node 02


 ### 通过express框架书写api
    1. 安装express
    2. 第三方模块的引用 从当前目录的node_modules依次向上寻找


### 服务器相关
  服务器:1.服务器就是一台电脑 2.服务器软件(apache tomcat  iis  nginx  node) 3 服务器id  端口

  局域网：服务器通过网线(无线)连接 每一个电脑都有一个ip

  外网：

  ip:确定服务器

 ### 非关系数据库  mongodb
  + mongod
  + mongoose

 ### 中间件 middlewear   use
  +  内置中间件 static
  +  自定义中间件 （拦截器)
  +  第三方中间件 body-parser 


### 注册登录 mongod
  1. 验证用户名存在
  2. 获取验证码
       + 获取邮箱验证码
  3. 自动生成api接口文档