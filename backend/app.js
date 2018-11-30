const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongo') //connect db

const login = require('./routes/login')
const user = require('./routes/user')
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/login', login)
app.use('/user', user)

module.exports = app