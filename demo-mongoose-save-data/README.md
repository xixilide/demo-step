## 实现功能，用mongoose 在服务器端保存数据的操作

### 在服务器端保存数据

```js

var data = {
  title:"one",
  content:"content"
}

app.post('/posts',function(req,res){
console.log(req.body);
post = new Post(data)
post.save(function(err){
  if (err) console.log(err)
  console.log("saved");
})
});
```

### 后台数据测试：

  curl --request POST http://localhost:3000/posts
  可在服务器端测试保存是否成功

### mongoDB

1. 创建保存数据的数据库的文件夹
  mkdir -p data/db
   -p  ----同时创建子文件夹和父文件夹

2. 启动数据库
```
 mongod --dbpath=./data/db
```
3. 启动操作界面
    - 用户图形接口GUI
    - 命令行接口 CU
    对于mongodb 我们使用 mongo shell 这个命令行来操作
4. 启动 mongo shell
```
$ mongo
```
5. 创建一个数据库
```
  $ use digiticy
```
数据库是 mongoDB 中的高级存储单位
之下一级就是 **集合**
6. 创建一个集合
```
$ db.createCollection('posts')
```
一个集合，里面可以插入多个数据记录
7.  插入一条记录
```
$ db.posts.insert({title:'my title'})
```
8. 列出当前记录的详情
```
$ db.posts.find()
```
9. 修改一条记录
```
$ db.posts.update({_id: ObjectId('xxx')}, {$set: {title: 'mongodb'}})
```
10. 刪除一条记录
```
 $ db.posts.remove({_id: ObjectId('xxx')})
```
11. 删除 posts 集合中的所有记录

```
 $ db.posts.remove({})
```
12. 删除数据库
```
use digicity-express-api
db.dropDatabase()
```

### 为什么记录电子版笔记
  一. 使用markdown 格式美观
      Beauty is your ablity to tame complexity
  二. 便于更新
  三. 又github 控制，不会丢失
  四. 便于搜索

### 全局搜索
ctrl shift +f
### 用 JS 代碼操作 mongodb
我們主要基於一個 JS 庫的幫助，Mongoose ，它可以 作為一個 npm 的包來安裝。

解釋一下，一個 JS 庫 就是一組 JS 接口 的集合。庫，英文對應 library 。

![](https://github.com/happypeter/digicity-express-api/blob/master/doc/img/002-mongoose.png?raw=true)
下面我们来动手做一个 express+mongoose 的小 demo 。

### 先写一个最简单的 express 程序
index.js 如下：
```
var express = require('express');
var app = express();

// 下面这个就是路由代码
app.post('/posts', function(req, res){
  console.log('hello');
});

app.listen(3000, function(){
  console.log('running on port 3000.....');
});
```
相应的 curl 测试命令是

```
curl --request POST localhost:3000/posts
```
如果可以在运行 node index.js 的后台位置看到 hello 表示我们这一步胜利完成。
![](https://github.com/happypeter/digicity-express-api/blob/master/doc/img/003-curl.png?raw=true)

### 安装 mongoose

作为一个 npm 包进行安装，link
```
npm install --save mongoose
```
在 js 代码中导入 mongoose
```js
var mongoose = require('mongoose');
```
进行数据库的连接
```js
mongoose.connect('mongodb://localhost:27017/digicity-express-api');
```

mongoose.connect 接口用来连接我们系统上安装的 mongodb 数据库。

如何定位数据库的所在位置？

  - 一种逻辑上可行的方案，就是用数据存储的文件夹的位置（比如我们前面采用的 data/db 文件夹），但是实际上 Mongodb 有其他方法
  - mongodb 的软件，运行起来类似一个网站，用链接来访问。（ mongodb://localhost:27017 ）
但是，链接之后，要跟上具体的数据库名字。我们每次链接，都是链接到一个数据库。比如我们这里， 就是 digicity-express-api （一般与项目名同名）。

如何验证链接成功呢？用下面的代码
```
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success!')
});
```
看到 success 字样表示链接成功。

### 定义数据的概要 Schema
数据天然的具有一定的结构，比如，人员名单中，自然的会涉及姓名，年龄，籍贯等信息。 在 mongodb 这里，一个人员的信息会被作为一条记录来保存。所有信息的类型会对应成字段名， 由于是跟计算机打交道，每个字段还要涉及它的数据类型（ num，string ...) 。

那么 Schema 就是用来规定一个记录的各个字段的，字段名+数据类型的。
```js
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: String,
    content: String
  }
);
```

### 创建数据模型 model
数据库的结构是，一个数据库，里面会包含多个集合，一个集合会包含多条数据记录。

那么现在，我们数据要往哪个数据库中存？这个问题通过前面的 mongoose.connect(xxx) 的语句指定了。

但是数据要保存到哪个集合还没有指定。所有我们的 model 创建语句如下：

var Post = mongoose.model('Post', PostSchema);
上面 .model() 的第一个参数，Post 就为我们指定了集合的名字，会对应数据库中的 posts 这个集合。第二个参数是数据 schema ，就是前面我们定义的。

到这里，所有数据存储的基础设施全部就绪。

###实例化 model 得到数据对象

现在我们要把实际要存储的数据，放到一个 model 的实例（对象）之中了。
```
var post = new Post({title:"myTitle", content: "myConent"})
```
post.js代码如下：
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    title:String,
    content:String
},
{ timestamps: true }
);
module.exports = mongoose.model('Post',PostSchema)
```
对象之上呼叫 save()
```js
app.post('/posts',function(req,res){
  post = new Post(data);
  post.save()
})
```
这样可以把数据保存到数据库中
![](http://cache.house.sina.com.cn/citylifehouse/citylife/50/92/20090716_54787_1.jpg)
