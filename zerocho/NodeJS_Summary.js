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

  const path = require('path');

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

라우터

메서드 체이닝

mySQL
    설치경로 C:\Program Files\MySQL\MySQL Server 8.0\bin
    C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql -uroot -p
    mysql -u root -p
    mysql -h localhost root -p

    show databases;
    create schema 'nodejs' default character set utf8;



관리자 권한으로 접속
=> mysql -uroot -p

  C:\Bitnami\wampstack-8.1.11-0\mariadb\bin>mysql -uroot -p
  Enter password: ******
  Welcome to the MariaDB monitor.  Commands end with ; or \g.
  Your MariaDB connection id is 8
  Server version: 10.4.25-MariaDB mariadb.org binary distribution

  Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

  Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.



Database 생성
=> create schema 이름

  mysql> create schema nodejs default character set utf8;   
  Query OK, 1 row affected, 1 warning (0.00 sec)



Database 목록 확인
=> Show databases;

    MariaDB [(none)]> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | allyce             |
    | information_schema |
    | mysql              |
    | performance_schema |
    | test               |
    +--------------------+
    5 rows in set (0.009 sec)



Database 선택
=> Use 데이터베이스

    MariaDB [(none)]> use allyce;
    Database changed



Table 생성
=> Create Table 테이블명(Column명1, Column명2, ....)
=> Column명 이후에 해당 Column의 부가 형식을 설정
=> 변수형 설정 (n)은 길이 제한(자릿수)을 의미하는 듯 https://blog.martinwork.co.kr/mysql/2020/01/17/mysql-data-type.html
=> NULL값을 허용하는가? NULL / NOT NULL
=> 고유 식별값 설정(주소설정같은) Primary Key(위에서 언급한 Column중 하나));
=> 자동으로 1씩 올라감 Auto_Increment
=> date 날짜 기록, datetime 날짜+시간
=> 자주 검색할 것 같은 것은 index를 걸면 검색 성능이 빨라짐
    index commenter_idx (commenter ASC),
    commenter 컬럼을 오름차순으로 indexing하겠다
=> constraint 컬럼 > 해당 컬럼에 제약을 둔다

    //생활코딩
    MariaDB [allyce]> create table topic(
        -> id INT(11) not null auto_increment,
        -> title VARCHAR(100) not null,
        -> description TEXT null,
        -> created datetime not null,
        -> author varchar(30) null,
        -> primary key(id));
    Query OK, 0 rows affected (0.018 sec)

    //노드
    create table nodejs.users (
    id int not null auto_increment,
    name varchar(20) not null,
    age int unsigned not null,
    married tinyint not null,
    comment text null,
    created_at datetime not null default now(),
    primary key(id),
    unique index name_unique (name ASC))
    comment = '사용자 정보'
    default charset=utf8
    engine=innodb;

    create table nodejs.comments (
    id int not null auto_increment,
    commenter int not null,
    comment varchar(100) not null,
    created_at datetime not null default now(),
    primary key(id),
    index commenter_idx (commenter ASC),
    constraint commenter
    foreign key (commenter)
    references nodejs.users (id)
    on delete cascade
    on update cascade)
    comment = '댓글'
    default charset=utf8mb4
    engine=innodb;


Table List 보기
=> Show Tables;

    MariaDB [allyce]> show tables;
    +------------------+
    | Tables_in_allyce |
    +------------------+
    | topic            |
    +------------------+
    1 row in set (0.000 sec)



해당 Table의 Column List 확인
=> Desc 테이블명;

    MariaDB [allyce]> desc topic;
    +-------------+--------------+------+-----+---------+----------------+
    | Field       | Type         | Null | Key | Default | Extra          |
    +-------------+--------------+------+-----+---------+----------------+
    | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
    | title       | varchar(100) | NO   |     | NULL    |                |
    | description | text         | YES  |     | NULL    |                |
    | created     | datetime     | NO   |     | NULL    |                |
    | author      | varchar(30)  | YES  |     | NULL    |                |
    +-------------+--------------+------+-----+---------+----------------+
    5 rows in set (0.008 sec)

테이블 삭제
=> drop table;



CRUD 중 Create
=> Insert Into 테이블명(Column1, Column2, ...) Values('Value1', 'Value2', ...)
=> 현재시간 입력함수 Now()

    MariaDB [allyce]> insert into topic (title, description, created, author) values('MySQL', 'About MySQL', Now(), 'Allyce');
    Query OK, 1 row affected (0.021 sec)

    //Node
    //유저 입력
    insert into nodejs.users (name, age, married, comment) values ('bobo', 26, 0, '귀여움');
    //댓글 입력
    insert into nodejs.comments (commenter, comment) values (1, 'bobo의 댓글');



CRUD 중 Read
=> Select *From 테이블명;
=> 애스터리스크 *은 모든 컬럼을 선택한다는 의미

  MariaDB [allyce]> select *from topic;
  +----+-------+-------------+---------------------+--------+
  | id | title | description | created             | author |
  +----+-------+-------------+---------------------+--------+
  |  1 | MySQL | About MySQL | 2022-11-11 11:44:10 | Allyce |
  +----+-------+-------------+---------------------+--------+
  1 row in set (0.000 sec)

  //Node
  mysql> select *from nodejs.comments; 
  +----+-----------+-------------+---------------------+
  | id | commenter | comment     | created_at          |
  +----+-----------+-------------+---------------------+
  |  1 |         1 | bobo의 댓글 | 2023-02-08 16:56:29 |
  +----+-----------+-------------+---------------------+
  1 row in set (0.00 sec)

=> where로 조건을 주어 선택 가능

  mysql> select name, age from nodejs.users where married = 0 and age > 25;
  +------+-----+
  | name | age |
  +------+-----+
  | bobo |  26 |
  +------+-----+
  1 row in set (0.00 sec)

=> or로 조건 중 하나 이상 만족하는 것을 찾음

=> order by로 특정 칼럼 순으로 정렬 가능
=> desc 내림차순 asc 오름차순
  
  mysql> select name, age from nodejs.users order by age desc;
  +------+-----+
  | name | age |
  +------+-----+
  | bobo |  26 |
  +------+-----+
  1 row in set (0.00 sec)

=> limit로 조회할 개수 제한

  mysql> select name, age from nodejs.users order by age desc limit 1;
  +------+-----+
  | name | age |
  +------+-----+
  | bobo |  26 |
  +------+-----+
  1 row in set (0.00 sec)



CRUD 중 Update
=> update 테이블명 set 컬럼=새값 where 조건

  mysql> update nodejs.users set comment = '캡숑 귀여움' where id = 1;
  Query OK, 1 row affected (0.00 sec)
  Rows matched: 1  Changed: 1  Warnings: 0



CRUD 중 Delete
=> delete from 테이블 where 조건

  delete from nodejs.users where id = 1;



Sequelize ORM
=> 공식 문서 https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
=> SQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
=> mySQL 이외 다른 RDB(Maria, postgre, SQLite, MSSQL)와도 호환됨
=> 자바스크립트 문법으로 데이터베이스 조작 가능

  //mysql2는 node와 mysql을 이어주는 드라이버
  npm i express morgan nunjucks sequelize sequelize-cli mysql2
  npm i -d nodemon
  //시퀄라이즈 구조 생성
  npx sequelize init

  public, views, routes 폴더 및  app.js 파일 생성

  models/index.js 파일 내용을 다음으로 바꿈

    //mysql, node, sequelize간 연결해주는 코드
    const Sequelize = require('sequelize');

    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};
    
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
    module.exports = db;

  config/config.json파일 내용 중 development 부분에 sql schema와 password 넣을 것

    "development": {
      "username": "root",         << default root
      "password": "nodejsbook",   << schema password
      "database": "nodejs",       << schema name
      "host": "127.0.0.1",
      "dialect": "mysql"
    },



=> sequelize의 model = mySQL의 table
=> model폴더내부에 model명으로 js파일 만들어서 설정해준 후 index js파일로 불러옴
=> 예제의 해당 파일에 자세한 설명 첨부



user model과 comment model의 관계
=>  1:N 관계
=>  sequelize에서는 1:N관계의 source model에서 hasMany로 표현 (사용자.hasMany(댓글))
    sequelize에서는 1:1관계를 source model에서 hasOne으로 표현
=>  source에 참조되는 model(table)은 belongsTo로 표현
=>  model파일의 user.js 와 comment.js 참조
=>  N:N관계 (SNS의 해쉬태그 같은)
=>  중간 테이블이 있어야 함
=>  Source모델이나 하위 모델이나 둘다 belongsToMany사용


Post                  PostHashtag           Hashtag
id  content           postID  hashTagID     id  title
1   #node #express    1       1             1   node
2   #node #good       1       2             2   express
3   #javaScript       2       1             3   javaScript
                      3       3


=>  db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });


sequelize에서 CRUD 중 Create
=>  MySQL
    insert into nodejs.users (name, age, married, comment) values ('bobo', 26, 0, '댓글');

=>  sequelize
    const { User } = require('../models');
    User.create({
      name: 'bobo',
      age: 25, 
      married: false,
      comment: '댓글',
    });

    //User.create는 promise이므로 then해야 사용할 수 있음

sequelize에서 CRUD 중 Read
=>  MySQL
    select *from nodejs.users;
=>  sequelize
    User.findAll({});

=>  MySQL
    select name, married from nodejs.users;
=>  sequelize
    User.findAll({
      attributes: ['name', 'married'],
    });

=>  MySQL
    select name, age from nodejs.users where married = 1 and age > 25;
=>  sequelize
    const { Op } = require('sequelize');
    const { User } = require('../models');
    User.findAll({
      attributes: ['name', 'age'],
      where: {
        married: true,
        //gt: > greater than
        //lt: <
        //gte: >=
        //lte: <=
        //ne: != not equel
        //in [1, 2, 3] 포함되어있는가
        age: { [Op.gt]: 25 },
      }
    });

=>  MySQL
    select id, name from nodejs.users where married = 0 or age > 30;
=>  sequelize
    const { Op } = require('sequelize');
    const { User } = require('../models');
    User.findAll({
      attributes: ['id', 'name'],
      where: {
        [Op.gt]: [{ married: false }, { age: { [Op.gt]: 25 } }],
      }
    });

**6강 시퀄라이즈 쿼리 알아보기 4:54**


sequelize에서 CRUD 중 Update
=>  MySQL
    update nodejs.users set comment = '바꿀내용' where id = 1;
=>  sequelize
    User.update({
      comment: '바꿀내용'
    }, {
      where: {id: 2},
    });


sequelize에서 CRUD 중 Delete
=>  MySQL
    delete from nodejs.users where id = 2;
=>  sequelize
    User.destroy({
      where: { id: 2},
    });



sequelize 관계쿼리

=>  ex1 : 결과값은 자바스크립트(JS) 객체
    //user model의 1번 가져옴
    const user = await User.findOne({});
    //모두 가져올 경우엔 findAll({});

    console.log(user.nick);


=>  ex2 : include로 SQL의 join과 비슷한 기능 수행 (관계 있는 것 엮을 수 있음)
    const user = await User.findOne({
      include: [{
        model: Comment,
      }]
    });
    //사용자 댓글
    console.log(User.Comments);


=>  ex3 : get 모델명 으로 관계 있는 데이터 로딩 가능
    const user = await User.fineOne({});
    const comments = await user.getComments();
    //사용자 댓글
    console.log(comments);


=>  ex4 : as로 모델명 변경 가능
    //index.js에서 관계 설정시 as로 등록
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id', as: 'Answers'});

    //쿼리시
    const user = await User.fineOne({});
    const comments = await user.getAnswers();
    //사용자 댓글
    console.log(comments);



=>  ex6 : 생성 쿼리
    const user = await User.findOne({});
    const comment = await Comment.create();
    await user.addComment(comment);
    //또는
    //await user.addComment(comment.id);



=>  ex7 : raw 쿼리로 직접 sql을 쓸 수 있음
    const [result, metadata] = await sequelize.query('select *from comments');
    console.log(result)
