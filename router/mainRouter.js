//주소 관련 코드
const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get("/", function(req,res){
  //그림파일 전달
  res.render('indextest', {title:"경청 Gyeong-cheong"});
})

router.get("/Calendar", function(req,res){
  res.render('calendar');
}) 

router.get("/News", function(req,res){
  res.render('news_test');
}) 

router.get("/MyAudio", function(req,res){
  res.render('myaudio_test_2');
}) 

router.post("/postapi", function(req,res){
  let body = req.body;
  console.log(body);
  res.send('POST API')
})

//데이터 생성 API
router.get('/data/create', function(req,res){
  let user_id = parseInt(Math.random() * 10000);
  db.users.create({user_id:user_id}).then(function(result){
    res.send({success:200})
  })
})

//데이터 조회 API
router.get('/data/read', function(req,res){
  db.users.findAll().then(function(result){
    res.send({success:200, data:result})
  })
})

//데이터 변경 API
router.post('/data/update', function(req,res){
  let target_id = req.body.target_id;
  db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
    res.send({success:200});
  })
})

router.post('/data/delete', function(req,res){
  let target_id = req.body.target_id;
  db.users.destroy({where:{user_id:target_id}}).then(function(result){
    res.send({success:200});
  })
})

module.exports = router;