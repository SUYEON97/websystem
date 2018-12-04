const Router = require('Express')
const router = Router()
const boardModel = require('../db/models/board')
const commentModel = require('../db/models/comment')
const userModel = require('../db/models/user')
const mongoose = require('mongoose');




router.get('/list', (req,res) => {
    boardModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

router.get('/:boardId', (req,res) =>{
    boardModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

// router.post('/write',(req,res) => {
//     var newTitle = req.body.newTitle;
//     var newContent = req.body.newContent;
//
// })

module.exports = router