//주소 관련 코드
const express = require('express');
const router = express.Router();

router.get("/", function(req,res){
  //그림파일 전달
  res.render('indextest')
})

router.get("/about", function(req,res){
  res.send('About Page');
}) 

router.post("/postapi", function(req,res){
  let body = req.body;
  console.log(body);
  res.send('POST API')
})

module.exports = router;