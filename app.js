const express = require('express');
const helmet = require('helment');
const app = express();
app.use(helmet());

app.get("/", function(req,res){
  res.send('Hello World');
})

app.get("/about", function(req,res){
  res.send('About page');
})

app.listen(3000, function(req,res){
  console.log("서버가 실행되고 있다!")
})