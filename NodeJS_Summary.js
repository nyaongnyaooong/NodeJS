Promise
  실행은 되었지만 결과값을 반환하지 않은 객체
  then을 붙이면 결과를 반환함

	const condition = true;
	const a = new Promise((resolve, reject) => {
    if (condition) {
      resolve('성공');
    } else {
      reject('실패');
    }
	});

	a
    .then(() => {
      //성공한 경우 실행
    })
    .catch((error) => {
      //실패한 경우 실행
    });

Promise.all(배열)
  여러개의 promise를 동시에 실행

	const promise1 = Promise.resolve('성공1');
	const promise2 = Promise.resolve('성공2');

	Promise.all([promise1, promise2])
    then((result) => {
      //1, 2 둘다 성공 시
    })
    .catch((error) => {
      //하나라도 실패 시
    });
	
	//Promise.allSettled를 사용하면 실패한 것을 추려낼 수 있음

Async/await
  여러개의 Promise.then을 축약 가능

Axios
  Promise API를 사용하는 HTTP 통신 라이브러리
  AJAX 요청 등을 사용할 때 쓰면 좋음
  이하 라이브러리 추가 방법
	
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script>
		//코드 입력

	</script>
    
axios.get(URL)
요청 보내기

	axios.get('https://www.zerocho.com/api.get')
    .then((result) => {
      console.log(result);
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
    });

post요청하기

  (async () => {
    try {
      const result = await axios.post('https://www.zerocho.com/api/post.json', {
        name: 'zerocho',
        birth: 1994,

      });
      console.log(result);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  })();

FormData
  axios로 이미지 등의 데이터를 보낼 경우 사용

  const formData = new FormData();
  formData.append('name', 'zerocho'); //데이터 추가
  formData.append('item', 'orange');
  formData.append('item', 'melon');

  formData.has('item'); //데이터 존재 확인 => true
  
  formData.get('item'); //데이터 조회 => orange

  formData.getAll('item'); //데이터 모두 조회 => ['orange', 'melon'];

  formData.set('item', 'apple'); //데이터 수정

  formData.delete('item'); //데이터 삭제

encodeURIComponent / decodeURIComponent
  주소창에 한글이 들어있을 경우 encodeURIComponent 처리
  반대로 해석은 decodeURIComponent로 원래 한글로 되돌림

모듈화

  //JS1.js 코드
  const odd = '홀수';
  const even = '짝수';

  //js파일 내에서 한번만 사용가능
  module.exports = {
    odd,  //구조분해할당
    even,
  };

  //JS2.js 코드
  const value = require('./JS1');

  console.log(value); //객체로 odd, even값이 반환

자바스크립트에서의 모듈화
  
  //JS1.js 코드
  const odd = '홀수';
  const even = '짝수';

   export default {
    odd,  //구조분해할당
    even,
  };

import { pbkdf2 } from 'crypto'
import { NOTIMP } from 'dns'
import { deprecate, promisify } from 'util'
  //JS2.js 코드
  import value from './JS1';

  console.log(value); //객체로 odd, even값이 반환


비동기 타이머 코드
  
  const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
  }, 1500);

  const interval = setInterval(() => {
    console.log('1초마다실행');
  }, 1000);

  const imediate = setImmediate(() => {
    console.log('즉시 실행');
  });

  clearTimeout(timeout);
  clearInterval(interval);
  clearImmediate(imediate);


환경변수

  console.log(__filename);  //현재 파일 경로
  console.log(__dirname); //현재 디렉토리 경로
  //double underscore 던더스코어 = __


노드에서의 this
  JS와는 다르게 window/global이 module.exports


require 모듈 동작
  require.main 노드 실행 시 첫 모듈을 가리킴
  require.cache에 require한 모듈에 대한 캐슁 정보가 들어있음


순환참조
  서로 require로 참조할 때 무한 반복되므로 실행되지않음


process
  실행중인 노드 프로세스에 대한 정보 확인시 사용하는 메서드


os
  운영체제에 대한 정보를 담고 있는 모듈 (process와 어느정도 겹침)


path
  경로처리할 때 사용하기 좋은 모듈

  const path = requir('path');

  //사용하는 운영체제에 맞추어 경로를 자동으로 변환함
  path.join(__dirname, 'test.js');

  //  ..\backEnd\NodeJS\test.js   윈도우 경로
  //  ../backEnd/NodeJS/test.js   POSIX (MAC) 경로

url
  인터넷 주소를 쉽게 조작할 수 있게하는 모듈
  참조 https://nodejs.org/dist/latest-v18.x/docs/api/url.html

  /*
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                              href                                              │
  ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
  │ protocol │  │        auth         │          host          │           path            │ hash  │
  │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
  │          │  │                     │    hostname     │ port │ pathname │     search     │       │
  │          │  │                     │                 │      │          ├─┬──────────────┤       │
  │          │  │                     │                 │      │          │ │    query     │       │  ↑ 기존 노드 방식
  "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "    
  │          │  │          │          │    hostname     │ port │          │                │       │  ↓ WHATWG 방식
  │          │  │          │          ├─────────────────┴──────┤          │                │       │
  │ protocol │  │ username │ password │          host          │          │                │       │
  ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
  │   origin    │                     │         origin         │ pathname │     search     │ hash  │
  ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
  │                                              href                                              │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
  */

  //이하 예시
  const url = require('url');

  const { URL } = url;
  
  //WHATWG 방식
  const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
  console.log('new URL():', myURL);
  console.log('url.format():', url.format(myURL));
  console.log('--------------------------------');
  //기존 Node 방식
  const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
  console.log('url.parse():', parsedUrl);
  console.log('url.format():', url.format(parsedUrl));

url.searchParams
  WHATWG 방식에서 쿼리스트링 부분 처리를 도와주는 객체

querystring
  기존 node 방식에서 쿼리스트링 부분 처리를 도와주는 모듈

crypto
  암호화 모듈 -> 멀티스레딩으로 동작

  
  단방향 암호화 기법(복호화가 거의 불가능함)(해시 기법)
  createHash(알고리즘)
  md5, sha1, sha256, sha512 등이 가능하지만, md5와 sha1은 취약점이 발견 됨
  현재는 pbkdf2, bcrypt, scrypt 등의 알고리즘으로 비밀번호를 암호화
  Node는 pbkdf2, scrypt 지원

    //pbkdf2를 이용한 해시 예제
    const crypto = require('crypto');

    crypto.randomBytes(64, (err, buf) => {
      const salt = buf.toString('base64');
      console.log('salt:', salt);
      crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
      });
      
    });


  양방향 암호화 기법
  key가 사용되며 암호화 및 복호화에 같은 key를 사용해야 함
    
    //대칭형 암호화 예시 AES
    const crypto = require('crypto');

    const algorithm = 'aes-256-cbc';
    const key = 'abcdefghijklmnopqrstuvwxyz123456';
    const iv = '1234567890123456';
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let result = cipher.update('암호화할 문장', 'utf8', 'base64');
    result += cipher.final('base64');
    console.log('암호화:', result);
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let result2 = decipher.update(result, 'base64', 'utf8');
    result2 += decipher.final('utf8');
    console.log('복호화:', result2);


util
  각종 편의 기능을 모아둔 모듈

    deprecate 
    기존의 잘못된 코드를 수정할 때 배포하기 전 경고

    promisify
    콜백 함수를 promise로 바꿀 때 사용


worker_thread
  노드에서 멀티 스레드 방식으로 작업할 수 있음

    const { isMainThread } = require('worker_threads');

    if (isMainThread) {
      //메인스레드 
    } else {
      //워커스레드
    }


  
fs
  파일 시스템에 접근하는 모듈

  파일 읽기
    const fs = require('fs');

    fs.readFile('./readme.txt', (error, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
      console.log(data.toString());
    });


    //promise로서 사용하는 예제
    const fs = require('fs').promises;

    fs.readFile('./readme.txt')
      .then((data) => {
        console.log(data);
        console.log(data.toString());
      })
      .catch((error) => {
        throw error;
      });

  파일 쓰기

    const fs = require('fs').promises;

    fs.writeFile('./writeme.txt', '입력될 텍스트')
      .then(() => {
        //쓰기 완료시 여기 코드 실행
      })
      .catch((error) => {
        throw error;
      });

  버퍼와 스트림
    버퍼 : 일정한 크기의 데이터
    스트림 : 데이터의 흐름

    const buffer = Buffer.from('버퍼로 바꿀 문자열');

    //버퍼로 바꿈
    console.log(buffer);
    console.log(buffer.length);
    console.log(buffer.toString());

    //여러 버퍼를 합치기
    const array = [Buffer.from('문자열1 '), Buffer.from('문자열2 '), Buffer.from('문자열3 ')]
    console.log(Buffer.concat(array).toString());

    //5byte짜리 버퍼 생성
    console.log(Buffer.alloc(5));

  
  스트림으로 파일 읽기
    const fs = require('fs');

    //파일 데이터를 쪼개서 가져옴 - 기본 64Kb씩 쪼갬
    //highWaterMark 인자를 통해 64byte로 지정
    const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 });

    //쪼개진 데이터를 배열에 넣음
    const data = [];
    readStream.on('data', (chunk) => {
      data.push(chunk);
      console.log('data: ', chunk, chunk.length);
    });

    //읽는 것이 끝났을 때 실행
    readStream.on('end', () => {
      console.log('end: ', Buffer.concat(data).toString());
    });

    //에러처리
    readStream.on('error', (err) => {
      console.log('error: ', err);
    });
  


    스트림으로 파일 쓰기
      const fs = require('fs');

      //파일 데이터를 쪼개서 가져옴 - 기본 64Kb씩 쪼갬
      //highWaterMark 인자를 통해 64byte로 지정
      const writeStream = fs.createWriteStream('./writeme.txt');

      //파일을 다 썼을때 실행
      writeStream.on('finish', () => {
        console.log('파일쓰기 완료');
      });

      writeStream.write('글을 씁니다\n');
      writeStream.write('한번 더 씁니다\n');
      //end시 위의 finish 코드 실행
      writeStream.end();

    

    파이프
      스트림으로 보내는 것과 받는 것을 서로 잇는다  

      const fs = require('fs');

      //파일복사
      const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 });
      const writeStream = fs.createWriteStream('./writeme.txt');
      readStream.pipe(writeStream);


에러처리
  기본적으로 try catch로 감쌈

  //try catch없이 throw만 사용할 경우 서버가 멈춘다
  //try catch로 감싸주면 에러를 반환하지만 서버가 멈추지는 않는다
  setInterval(() => {
    console.log('시작'); 
    try {
      throw new Error('서버 고장')
    } catch (err) {
      console.log(err);
    }
  }, 1000);



REST API
  서버에 요청을 보낼 때 주소를 통해 요청의 내용을 표현
  개발자 도구 network탭에서 요청 내용 실시간 확인 가능

  요청 메서드
    get : 서버 자원을 가져올 때
    post : 서버 자원을 새로 등록하고자 할 때
    put : 서버 자원을 다른 자원으로 교체
    patch : 서버 자원의 일부를 수정
    delete : 서버 자원을 삭제


쿠키
  키 = 값의 쌍
  writeHead에 Set-Cookie를 사용하여 구현

  옵션
    쿠키명=쿠키값
    Expires=날짜
    Max-age=초 (Expires와 비슷하지만 초단위로 설정가능 Expires보다 우선시 됨)
    Domain=도메인명 (쿠키가 전송될 도메인을 특정할 수 있음)
    Path=URL (쿠키가 전송될 URL을 특정할 수 있음)
    Secure (https일 경우에만 쿠키가 전송됨)
    HttpOnly (설정시 자바스크립트에서 쿠키에 접근 할 수 없음 쿠키 조작을 방지하기 위해 설정)


세션
  중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공
  서버에 session 객체 생성 후 uniqueInt(키)를 만들어 속성명으로 사용



http
  웹서버에 ssl 암호화를 추가하는 모듈
  오고가는 데이터를 암호화하여 중간에 다른 사람이 요청을 가로채더라도 내용을 확일할 수 없음
  무료 ssl 인증서 발급 사이트 - letsencrypt

    const https = require('https');
    const fs = require('fs');

    https.createServer({
      cert: fs.readFileSync('도메인 인증서 경로'),
      key: fs.readFileSync('도메인 비밀키 경로'),
      ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
      ],
    }, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>test</h1>');
      res.end('<p>test</p>');
    }).listen(443, () => {  //https는 443포트 사용
      console.log('443번 port 사용');
    });



http2
  요청 및 응답 방식이 기존 http/1.1보다 개선
  웹의 속도 개선
  https 적용

    const http2 = require('http2');
    const fs = require('fs');

    http2.createServer({
      cert: fs.readFileSync('도메인 인증서 경로'),
      key: fs.readFileSync('도메인 비밀키 경로'),
      ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
      ],
    }, (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>test</h1>');
      res.end('<p>test</p>');
    }).listen(443, () => {  //https는 443포트 사용
      console.log('443번 port 사용');
    });



클러스터
  싱글 스레드인 노드가 CPU코어를 모두 사용할 수 있게 해주는 모듈
  컴퓨터 자원 공유 못 함 -> Redis등 별도 서버로 해결

    const cluster = require('cluster');
    const http = require('http');
    const fs = require('fs');

    if (cluster.ismaster) {
      console.log(`마스터 프로세스 아이디: ${ process.pid }`);
      //CPU 개수만큼 워커를 생산
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      //워커가 종료되었을 때
      cluster.on('exit', (worker, code, signal) => {
        console.log(`${ worker.process.pid }번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();
      });
    } else {
      //워커들이 포트에서 대기
      http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>test</h1>');
        res.end('<p>test</p>');
        setTimeout(() => {  //워커 존재를 확인하기 위해 1초마다 강제 종료
          process.exit(1);
        }, 1000);
      }).listen(8080);

      console.log(`${ process.pid }번 워커 실행`);
    }




NPM
  노드 패키지 매니저

package.json
  현재 프로젝트에 대한 정보와 사용 중인 패키지에 대한 정보를 담은 파일
  노드 프로젝트 시작 전 package.json부터 만들고 시작함(npm init)

  속성 정보
    package name : 패키지의 이름
    version : 패키지의 버전
    entry point : 자바스크립트 실행 파일 진입점. 보통 마지막으로 module.exports를 하는 파일을 지정한다. package.json의 main 속성에 저장됨
    test command : 코드를 테스트할 때 입력할 명령어를 의미 package.json script 속성 안의 test 속성에 저장됨
    git repository : 코드를 저장해둔 git 저장소 주소를 의미 package.json repository 속성에 저장됨
    keywords : 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해줌. keywords 속성에 저장
    license : 해당 패키지의 라이선스

npm 설치
  
  install
    npm i express
    npm i cookie-parser body-parser

  -D 옵션 (개발할때만 사용할 패키지)
    npm i -D nodemon

  -g 옵션 (global설치)

SemVer 버저닝
  ex
  1.0.7
  Major.Minor.Patch
  Major : 하위 호환이 되지 않는 변경 사항
  Minor : 하위 호환이 되는 변경 사항
  Patch : 간단한 버그 수정