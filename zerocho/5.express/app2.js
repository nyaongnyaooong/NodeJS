//morgan cookie-parser body-parser express-session

//기본 익스프레스 서버 실행
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const multer = require('multer')

const app = express();

//express 포트 환경변수에 3000번 입력
app.set('port', process.env.PORT || 3000);

//morgan사용시 서버 요청, 응답에 대한 자세한 시간 등의 내용이 콘솔에 표시
//개발시
app.use(morgan('dev'));
//배포시
//app.use(morgan('combined'));

//클라이언트 요청 경로를 실제 서버상의 경로로 변경
app.use('/', express.static(path.join(__dirname, 'public')));
//쿠키를 쉽게 넣을 수 있음
app.use(cookieParser('cookiepassword'));
//개개인의 저장 공간 할당
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiepassword',
  cookie: {
    httpOnly: true,
  },
  name: 'connext.sid',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  //개개인의 저장 공간 할당
  req.session.id = 'id';
  req.cookies;
  req.signedCookies;
  res.cookies('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly:true,
    path: '/',
  });
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  });

  res.send('hello express');
  //res.status(200).send('hello express');
});

app.post('/', (req, res) => {
  res.send('hello express!!!!');
});


//하드에서 html파일 읽어와서 보여줌
app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



//라우트 매개변수 사용 route parameter (다른 라우터보다 아래에 둘 것)
app.get('/category/:name', (req, res) => {
  //res.send(`hello ${req.params.name}`);
  res.send('hello ' + req.params.name);
});


//에러 미들웨어 (4개의 매개변수(err, req, res, next)를 모두 사용할 것)
//에러 발생시 실행됨
app.use((err, req, res, next) => {
  console.error(err);
  res.send('error 발생');
});

//3000번 포트로 서버 실행
app.listen(app.set('port'), () => {
  console.log('익스프레스 서버 실행');
});

//한 라우터에 응답은 한번씩만