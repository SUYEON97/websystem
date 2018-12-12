const Router = require('express')
const router = Router()
const commentModel = require('../db/models/comment')
const boardModel = require('../db/models/board')
var Num=[]

router.post('/create', (req,res) => {
    console.log(req.body.userId)
    var comments = new commentModel({
        
        userId: req.body.userId,
        content: req.body.content,
        boardId : req.body.boardId
    });

    comments.save(function(err){
        if(Num[req.body.boardId]==null){
            Num[req.body.boardId]=0;
        }
        Num[req.body.boardId]++;
        boardModel.findOneAndUpdate({boardId: req.body.boardId},{commentNum:Num[req.body.boardId]}, function (err, result) {

            if(err) return console.log(err)
        }).catch((err)=>{
            console.error(err);
        })
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
