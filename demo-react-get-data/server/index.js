var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/new');
var Post = require('./post/post');

var data = {
  title:"my title",
  content:"xixilide"
}

app.post('/posts',function(req,res){
  // console.log(req.body);
  post = new Post(data);
  post.save(function(err){
    if (err) console.log(err)
    // console.log("saved");
  })
});

app.listen(3000, function() {
  console.log('running on port 3000..')
})
