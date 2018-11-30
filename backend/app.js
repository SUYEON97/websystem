const express = require('express')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const path = require('path');
require('./db/mongo') //connect db
const user = require('./routes/user')
const deadline = require('./routes/deadline')


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
app.use('/user', user)
app.use('/',indexRouter)
app.use('/home', deadline)

module.exports = app
