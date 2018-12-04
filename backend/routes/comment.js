const Router = require('Express')
const router = Router()
const boardModel = require('../db/models/board')
const commentModel = require('../db/models/comment')
const userModel = require('../db/models/user')
const mongoose = require('mongoose');



router.post('/create', (req,res) => {
    var comments = new commentModel({
        content: req.body.content,
        // userId : req.body.userId,
        boardId : req.body.boardId
    });

    comments.save(function(err){
        console.log(comments)
        if(err) return console.log('save error')
        return res.end()
    })
})

router.get('/list', (req,res) => {
    commentModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

module.exports = router