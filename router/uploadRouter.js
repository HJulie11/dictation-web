const express = require('express');
const router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, 'uploads')
  },
  filename: function(req, file, callback){
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage})

// router.route('/process/audio').post(upload.array('photo',1),function(req,res){
//   try{
//     var files = req.files;

//     console.dir('#=== 업로드된 첫번째 파일 정보 ===#');
//     console.dir(req.files[0]);
//     console.dir('#=====#');

//     var originalname = '',
//         filename = '',
//         mimetype = '',
//         size = 0;

//         if(Array.isArray(files)){
//           console.log("배열에 들어있는 파일의 갯수 : %d", files.length);
//           for(var index = 0; index < files.length; index++){
//             originalname = files[index].originalname;
//             filename = files[index].filename;
//             mimetype = files[index].mimetype;
//             size = files[index].size;
//           }
//         } else {
//           console.log('파일 갯수 : 1');

//           originalname = files[index].originalname;
//           filename = files[index].filename;
//           mimetype = files[index].mimetype;
//           size = files[index].size;
//         }
      
//       console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);

//       res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//       res.write('<h3>파일 업로드 성공</h3>');
//       res.write('<hr/>');
//       res.write('<p>원본 파일 이름 : ' + originalname + '-> 저장 파일명 ' + filename + '</p>');
//       res.write('<p>MIME TYPE : ' + mimetype + '</p>');
//       res.write('<p>파일 크기 : ' + size + '</p>');
//       res.end();
//     }
//     catch(err) {
//       console.dir(err.stack);
//     }
// });

module.exports = router;