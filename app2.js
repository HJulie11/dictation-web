var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');
  
var expressErrorHanlder = require('express-error-handler');

var expressSession = require('express-session');

var multer = require('multer')
var fs = require('fs');

var cors = require('cors'); // 다중 서버 접속 (CORS) 지원 - 클라이언트에서 ajax로 요청했을 때

var app = express();

// app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, '/public')));
app.use('/uploads', static(path.join(__dirname, '/uploads')));

app.use(cookieParser());

app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use(cors());

var storage = multer.diskStorage({
  distination: function(req, file, callback){
    callback(null, 'uploads')
  },
  filename: function(req, file, callback){
    callback(null, file.originalname + Date.now())
  }
});

var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

var router = express.Router();

app.listen(3000, function(req,res){
  console.log("서버가 실행되고 있다!");
})