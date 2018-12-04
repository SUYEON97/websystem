const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongo') //connect db
const user = require('./routes/user')
const board = require('./routes/board')
const comment = require('./routes/comment')
const write = require('./routes/write')
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/user', user)
app.use('/board', board)
app.use('/comment', comment)
app.use('/write', write)




module.exports = app