// server.js

const express = require('express')
const cookieParser = require('cookie-parser')
const {user} = require('./models/user.js')
const {createToken, createSignature} = require("./utils/jwt.js")
// const {auth} = require('./middlewares/auth.js')
const app = express()
console.log(user);

//바디파서
app.use(express.urlencoded({extended: true}))

//쿠키파서
app.use(cookieParser())

//토큰 검증
app.use((req, res, next) => {
    try {
        const {AccessToken} = req.cookies
        const header = AccessToken.split('.')[0]
        const payload = AccessToken.split('.')[1]
        const signature = AccessToken.split('.')[2]
        const sign = createSignature(header, payload)

        if (sign !== signature) throw new Error('poisoned cookie')
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        req.user = {
            ...user
        }
        next()

    } catch {
        next()
    }
})

//라우터
app.get('/', (req, res)=>{
    if(user) {
        res.sendFile(__dirname + "/index2.html")

    } else {
        res.sendFile(__dirname + "/index.html")

    }

})


//라우터
app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})


//라우터
app.post('/login', (req, res)=>{
    const {userid, userpw} = req.body
    const [ item ] = user.filter(v => v.userid == userid && v.userpw == userpw);

    try {
        if (item == undefined) throw new Error('일치하는 아이디가 존재하지 않음')
        const payload = {
            userid: item.userid,
            username: item.username,
            level: 1
        }
        // 만들어 놓은 함수를 이용해 JWT 생성
        const token = createToken(payload)
        
        // 생성한 토큰을 쿠키로 만들어서 브라우저에게 전달
        res.cookie('AccessToken', token, {
            path: '/',
            HttpOnly: true
        })
        res.redirect('/')
        
    } catch(err) {
        console.log(err)
        res.send('로그인 실패')
    }
})

app.get('/logout', (req, res)=>{
    // 쿠키 삭제
    res.clearCookie('AccessToken', {path: '/'})
    res.redirect('/')
})

app.listen(3000, ()=>{
    console.log('server onload')
})