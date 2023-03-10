const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');


//express 모듈에 body-parser내장
app.use(express.urlencoded({ extended : true }));

//methodOverride - For RESTFUL API
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//const { Script } = require('vm');
//app.set('view engine', 'ejs');
 


const { MongoClient, ServerApiVersion } = require('mongodb');
let db;
const dbURL = 'mongodb+srv://luckyyou123:R4w7j2yNgEhShF2l@cluster0.pdr9saa.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }

  db = result.db('todoapp');
  console.log('DB connected.');

});


//basic head
const BS_Head = fs.readFileSync(__dirname + '/bootstrapHTML/head.html');

//basic body
const BS_Navbar = fs.readFileSync(__dirname + '/bootstrapHTML/navber.html');
const BS_JS = fs.readFileSync(__dirname + '/bootstrapHTML/js.html');
const BS_WriteBody = fs.readFileSync(__dirname + '/bootstrapHTML/writeBody.html');
console.log('HTML file loaded.');










const fullHTML = (head, body) => {
  // let fullHTML = '<head>' + head + '</head><body>' + body + '</body>';
  const fullHTML = '<!doctype html><html><head>' + head + '</head><body>' + body + '</body></html>';
  return fullHTML
}

const basicHTML = (addBody = "") => {

  const head = BS_Head;
  const body = BS_Navbar + BS_JS + addBody;
  const HTML = fullHTML(head, body);

  return HTML;
}





//Main Router
app.get('/', (req, res) => {

  res.send(basicHTML());
  // res.sendFile(__dirname + '/index.html');
});


//생성 Router
app.get('/write', (req, res) => {
  const head = BS_Head;
  let body;

  body = BS_Navbar + BS_WriteBody + BS_JS;
  const HTML = fullHTML(head, body);
  res.send(HTML);
});


//Read Router
app.get('/list', async (req, res) => {

  try {

    const result = await db.collection('post').find().toArray();

    //add search box
    let bodyList = `
    <div class="input-group m-5 w-auto">
      <input type="text" class="form-control" placeholder="Search Todo" aria-label="Search Todo" aria-describedby="button-addon2" id="input_search">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="btn_search">Search</button>
      </div>
    </div>
    `;


    //add todo list
    bodyList = bodyList + `<ul class="list-group">`;

    for(let i in result) {
      bodyList = bodyList + 
      `
        <li class="list-group-item">
          <a href="/detail/${ result[i]._id }" class="text-decoration-none">
            <h5>List ${ parseInt(i) + 1 }</h5>
            <span>할일 : ${ result[i].title }</span><br>
            <span>날짜 : ${ result[i].date }</span></p>
          </a>
          <button class="btn_delete" data-id="${ result[i]._id }">삭제</button>
          <a href="/edit/${ result[i]._id }"><button class="btn_edit" data-id="${ result[i]._id }">수정</button></a>
        </li>
      `;
    }


    //to add delete request, use ajax by jquery
   
    bodyList += `</ul>

    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>

    <script>
      const deleteBTN = document.querySelectorAll('.btn_delete');
      const searchBTN = document.querySelector("#btn_search");
      const searchInput = document.querySelector("#input_search")



      searchBTN.addEventListener('click', (event) => {
        const queryObject = {
          keyword: searchInput.value,
        };

        const queryStr = new URLSearchParams(queryObject).toString();
        console.log(queryStr);
        window.location.replace("/search?" + queryStr);

      });



      

      for(let i = 0; i < deleteBTN.length; i++) {
        deleteBTN[i].addEventListener('click', (event) => {
          let listID = event.target.dataset.id;
          $.ajax({
            method: 'DELETE',
            url: '/list/delete',
            data: { _id: listID },
          }).done((result) => {
            console.log(event.target.parentNode);
            $( event.target.parentNode ).fadeOut();
          }).fail(() => {

          });
        });
      }
    </script>
    `;


    res.send(basicHTML(bodyList));
    // console.log(result);
    // res.render('list.ejs', { posts : result });
      
  } catch (err) {
    console.error(err)
  }

});


//Search Router
app.get('/search', async (req, res) => {
  console.log(req.query);
  try {
    // const result = await db.collection('post').find( { $text: { $search: req.query.keyword } }).toArray();
    const condition = [
      {
        $search: {
          index: "titleSearch",
          text: {
            query: req.query.keyword,
            path: ["title"],
          },
        }
      }
    ]
    const result = await db.collection('post').aggregate().toArray();


    //add search box
    let bodyList = `
    <div class="input-group m-5 w-auto">
      <input type="text" class="form-control" placeholder="${ req.query.keyword }" aria-label="Search Todo" aria-describedby="button-addon2" id="input_search">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="btn_search">Search</button>
      </div>
    </div>
    `;


    //add todo list
    bodyList = bodyList + `<ul class="list-group">`;

    for(let i in result) {
      bodyList = bodyList + 
      `
        <li class="list-group-item">
          <a href="/detail/${ result[i]._id }" class="text-decoration-none">
            <h5>List ${ parseInt(i) + 1 }</h5>
            <span>할일 : ${ result[i].title }</span><br>
            <span>날짜 : ${ result[i].date }</span></p>
          </a>
          <button class="btn_delete" data-id="${ result[i]._id }">삭제</button>
          <a href="/edit/${ result[i]._id }"><button class="btn_edit" data-id="${ result[i]._id }">수정</button></a>
        </li>
      `;
    }


    //to add delete request, use ajax by jquery
    //to add search request, use ajax by jquery
    bodyList += `</ul>

    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>

    <script>
      const deleteBTN = document.querySelectorAll('.btn_delete');
      const searchBTN = document.querySelector("#btn_search");
      const searchInput = document.querySelector("#input_search")



      searchBTN.addEventListener('click', (event) => {
        const searchValue = searchInput.value;
        window.location.replace("/search?keyword=" + searchValue);
      });



      

      for(let i = 0; i < deleteBTN.length; i++) {
        deleteBTN[i].addEventListener('click', (event) => {
          let listID = event.target.dataset.id;
          $.ajax({
            method: 'DELETE',
            url: '/list/delete',
            data: { _id: listID },
          }).done((result) => {
            console.log(event.target.parentNode);
            $( event.target.parentNode ).fadeOut();
          }).fail(() => {

          });
        });
      }
    </script>
    `;


    res.send(basicHTML(bodyList));
    // console.log(result);
    // res.render('list.ejs', { posts : result });
      
  } catch (err) {
    console.error(err)
  }

});






//update html
app.get('/edit/:id', async (req, res) => {

  try {
    const result = await db.collection('post').findOne({ _id: parseInt(req.params.id) });
    console.log(result);

    const head = BS_Head;


    const bodyEdit = `
      <div class="container mt-3">
        <form action="/edit/${ result._id }?_method=PUT" method="POST">
          <div class="form-group">
            <label>수정할 할일</label>
            <input type="text" value="${ result.title }" class="form-control" name="title">
          </div>
          <div class="form-group">
            <label>수정할 날짜</label>
            <input type="text" value="${ result.date }" class="form-control" name="date">
          </div>
          <button type="submit" class="btn btn-outline-secondary">Edit</button>
        </form>
      </div>
    `;    
    const body = BS_Navbar + BS_JS + bodyEdit;
    const HTML = fullHTML(head, body);
    res.send(HTML);

  } catch(err) {
    console.error(err);
    res.status(400).send({ message : 'failed' });
  }
  
});




//update (put request process)
app.put('/edit/:id', async (req, res) => {
  console.log('put request');
  try {
    dbObject = {
      title: req.body.title,
      date: req.body.date,
    };
    console.log(req.body);
    const result = await db.collection('post').updateOne({ _id: parseInt(req.params.id) }, { $set: dbObject });
    
    //결과를 클라이언트한테 전송
    const head = BS_Head;
    const body = BS_Navbar + '<p>Complete</p>' + BS_JS;
    const HTML = fullHTML(head, body);
    res.redirect('/list')
    // res.send(HTML);

  } catch (err) {
      console.error(err);
      //실패했음을 클라이언트한테 전송
      const body = BS_Navbar + '<p>Failed</p>' + BS_JS;
      const HTML = fullHTML(head, body);
      res.status(400).send({ message: 'failed' });
    
  }

});






//detail
app.get('/detail/:id', async (req, res) => { 
  console.log('detail request');
  try {
    const result = await db.collection('post').findOne({ _id: parseInt(req.params.id) });
    if(!result) {
      res.status(404).send({ message: 'failed' });
      return console.log('noDB');
    }
    console.log(result);

    const head = BS_Head;
    const bodyDetail = `
      <h4>상세페이지</h4>
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${ result.title }</h5>
          <h6 class="card-subtitle mb-2 text-muted">${ result.date }</h6>
          <form action="/detail/${ result._id }?_method=PUT" method="POST">
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Detail Context</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="context">${ result.context }</textarea>
            </div>
            <input class="btn btn-link card-link" type="submit" value="Save">
            <!--
            <a href="/list" class="card-link">Save</a>
            -->
          </form>
        </div>
      </div>
      `;
    const body = BS_Navbar + BS_JS + bodyDetail;
    const HTML = fullHTML(head, body);
    res.send(HTML);
  
  } catch (err) {
    console.error(err);
  }

});


//detail save
app.put('/detail/:id', async (req, res) => { 
  console.log('detail save request');
  try {
    dbObject = {
      context: req.body.context,
    };
    console.log(req.body);
    const result = await db.collection('post').updateOne({ _id: parseInt(req.params.id) }, { $set: dbObject });
    
    if(!result) {
      res.status(404).send({ message: 'failed' });
      return console.log('noDB');
    }
    console.log(result);

    const head = BS_Head;
    const bodyDetail = `
      <h4>상세페이지</h4>
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${ result._id }</h5>
          <h6 class="card-subtitle mb-2 text-muted">${ result.date }</h6>
          <form action="/detail/${ result._id }?_method=PUT" method="POST">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Detail Context</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">${ result.context }</textarea>
          </div>

          <a href="/list" class="card-link">Save</a>
          </form>
        </div>
      </div>
    `;

    res.redirect('/list');
  
  } catch (err) {
    console.error(err);
  }

});



//delete
app.delete('/list/delete', (req, res) => {
  const head = BS_Head;

  const deleteDataOnDB = async () => {
    try {
      /*
      const { ID } = await db.collection('counter').findOne({ name: 'lastID' });
      const updateID = await db.collection('counter').updateOne({ name: 'lastID' }, { $inc : { ID: 1} });
      */

      console.log(req.body);
      //형변환 string > int, 글번호 -> _id 매칭
      req.body._id = parseInt(req.body._id);
      console.log(req.body);

      //db삭제
      const deleteDB = await db.collection('post').deleteOne(req.body);
      res.status(200).send({ message : 'complete' });
      //res.redirect('/list');
      
      // res.send(HTML);

    } catch (err) {
      console.error(err);
      res.status(400).send({ message : 'failed' });

      // const body = BS_Navbar + '<p>Failed</p>' + BS_JS;
      // const HTML = fullHTML(head, body);
      // res.send(HTML);
    }

  }

  deleteDataOnDB();
});


//create
app.post('/write/complete', async (req, res) => {
  console.log('Create request');
  try {
    console.log('request data: ', req.body);

    //counter collection에서 ID 찾기
    const { ID } = await db.collection('counter').findOne({ name: 'lastID' });
    //counter collection ID 숫자증가
    const updateID = await db.collection('counter').updateOne({ name: 'lastID' }, { $inc : { ID: 1} });

    //넣을 DB값 object형식으로 선언
    dbObject = {
      _id: ID,
      title: req.body.title,
      date: req.body.date,
      context: '',
    }

    //object를 post collection에 저장
    const addDB = await db.collection('post').insertOne(dbObject);

    //결과를 클라이언트한테 전송
    const head = BS_Head;
    const body = BS_Navbar + '<p>Complete</p>' + BS_JS;
    const HTML = fullHTML(head, body);
    res.redirect('/write');
    //res.send({ message: 'complete' });
    
  } catch(err) {
    console.error(err);
    res.status(400).send({ message: 'failed' });
  }

});






//포트, 실행할 함수
app.listen(8080, function() {
  console.log('listening on 8080');
});