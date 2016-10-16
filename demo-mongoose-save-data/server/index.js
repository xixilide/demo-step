var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var  app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use(cors());
//开放同源策略

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/new');
var Post = require('./posts/post');

var data = {
  title:"one",
  content:"content"
}
app.get('/',function(req,res){
  res.send("this is a api page")
})
app.post('/posts',function(req,res){
console.log(req.body);
post = new Post(data)
post.save(function(err){
  if (err) console.log(err)
  console.log("saved");
})
});



app.listen(3000, function() {
  console.log('running on port 3000..')
})
