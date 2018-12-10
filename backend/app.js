const express = require('express')
const bodyParser = require('body-parser')
//const indexRouter = require('./routes/index')
const path = require('path');
require('./db/mongo') //connect db

const login = require('./routes/login')
const user = require('./routes/user')
const deadline = require('./routes/deadline')
const major = require('./routes/major')
const board = require('./routes/board')
const comment = require('./routes/comment')
const write = require('./routes/write')
const workBoard = require('./routes/workBoard')
const writeWorkBoard = require('./routes/writeWorkBoard')
const workComment = require('./routes/workComment')
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', login)
app.use('/user', user)
//app.use('/',indexRouter)
app.use('/home', deadline)
app.use('/regist', major)
app.use('/board', board)
app.use('/comment', comment)
app.use('/write', write)
app.use('/workBoard', workBoard)
app.use('/writeWorkBoard', writeWorkBoard)
app.use('/workComment', workComment)

module.exports = app
