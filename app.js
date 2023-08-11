const express = require('express');
const helmet = require('helmet');
const app = express();
const ejs = require('ejs');
const db = require('./model/db');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static')
    , errorHandler = require('errorhandler');

const expressErrorHandler = require('express-error-handler');

const expressSession = require('express-session');

const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
  distination:function(req, file, callback){
    callback(null, 'uploads')
  },
  filename: function(req, file, callback){
    callback(null, path.extname(file.originalname) + Date.now())
  }
});

const upload = multer({
  storage: storage,
  // limits: {
  //   files: 10,
  //   fileSize: 1024 * 1024 * 1024
  // }
})

const cors = require('cors');

// app.set('port', process.env.PORT || 3000);

//HTML,CSS 파일 보여주기
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', static(path.join(__dirname + '/uploads')));


app.use(cookieParser());

app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use(cors());

// app.use(helmet());
//post api 실행을 위한 lines
app.use(express.json());
app.use(express.urlencoded());



const router = express.Router();

const uploadRouter = require('./router/uploadRouter');
app.use('/process/audio', uploadRouter);

const mainRouter = require('./router/mainRouter');
app.use('/', mainRouter);
app.use('/Calendar', mainRouter);
app.use('/News', mainRouter);
app.use('/MyAudio', mainRouter);

app.post("/upload", upload.single("audio"), (req,res) => {
  res.send("Audio Uploaded")
});

app.listen(3000, function(req,res){
  db.sequelize.sync({force:false});
  console.log("서버가 실행되고 있다!");
})