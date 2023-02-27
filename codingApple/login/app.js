//Session based authentication 예제

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended : true }));


//Mongodb 라이브러리 세팅
//Mongodb 4.x 버전 라이브러리 사용
const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
const dbURL = 'mongodb+srv://luckyyou123:R4w7j2yNgEhShF2l@cluster0.pdr9saa.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }

  db = result.db('login');
  console.log('DB connected.');

});


//이하 세션 라이브러리 세팅
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: 'secreteKey', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/http/main.html');
});


app.post('/login', passport.authenticate('local', { 
  successRedirect: '/' ,
  failureRedirect: '/fail' 
}), (req, res) => {

});


// passport.use(new LocalStrategy({
//   usernameField: 'id',
//   passwordField: 'pw',
//   session: true,
//   passReqToCallback: false,
// }, async (inputID, inputPW, done) => {
//   //console.log(inputID, inputPW);
//   try {
//     const result = await db.collection('userdata').findOne({ id: inputID });

//       if (!result) return done(null, false, { message: '존재하지않는 아이디요' });
//       if (inputPW == result.pw) {
//         return done(null, result)
//       } else {
//         return done(null, false, { message: '비번틀렸어요' });
//       }

//   } catch(에러) {
//     return done(에러);
//   }

// }));


passport.use(new LocalStrategy({
  usernameField: 'id',  //form name id
  passwordField: 'pw',  //form name pw
  session: true,  //로그인 후 세션 저장할 것인지
  passReqToCallback: false, //아이디 비번 말고 다른 정보 검증 시 사용
  //콜백 함수에 인자 추가 ex (req, inputID, inputPW, done)
  //req.body로 다른 정보 체크가능
}, async (inputID, inputPW, done) => {
  //done(error, user_DB_data, message)
  console.log(done);
  console.log(inputID, inputPW);

  try {
    const result = await db.collection('userdata').findOne({ id: inputID });
    if(!result) {
      return done(null, false, { message : 'ID does not exist.' });
    }

    //암호화 처리
    if (inputPW == result.pw) {
      return done(null, result);
    } else {
      return done(null, false, { message: 'PW does not match.' });
    }
  } catch(err) {
    return done(err);
  }
  
}));

//user.id로 session제작 후 session store에 저장 후 쿠키로 만들어 클라이언트로 보냄
//passport.use 미들웨어 결과값인 result가 user로 들어감
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//session store와 클라이언트의 session 정보 비교
passport.deserializeUser((id, done) => {
  done(null, {});
});



app.listen(8080, () => {
  console.log('listening on 8080');
});

