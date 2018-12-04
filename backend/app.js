const express = require('express')
const bodyParser = require('body-parser')
<<<<<<< HEAD
const indexRouter = require('./routes/index')
const path = require('path');
require('./db/mongo') //connect db
const user = require('./routes/user')
const deadline = require('./routes/deadline')

=======
//const indexRouter = require('./routes/index')
const path = require('path');
require('./db/mongo') //connect db
>>>>>>> 8ec70af51aecb82082550664037b9a9b9a36f51a

const login = require('./routes/login')
const user = require('./routes/user')
const deadline = require('./routes/deadline')
const major = require('./routes/major')
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
<<<<<<< HEAD
app.use('/user', user)
app.use('/',indexRouter)
app.use('/home', deadline)

module.exports = app
=======
app.use('/login', login)
app.use('/user', user)
//app.use('/',indexRouter)
app.use('/home', deadline)
app.use('/regist', major)

module.exports = app
>>>>>>> 8ec70af51aecb82082550664037b9a9b9a36f51a
