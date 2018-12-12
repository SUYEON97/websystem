const Router = require('express')
const router = Router()
const workCommentModel = require('../db/models/workComment')
const workBoardModel = require('../db/models/workBoard')
var Num=[];

router.post('/create', (req,res) => {
    console.log(req.body.userId)
    var workComments = new workCommentModel({
        userId: req.body.userId,
        content: req.body.content,
        boardId : req.body.boardId
    });

    workComments.save(function(err){
        if(Num[req.body.boardId]==null){
            Num[req.body.boardId]=0;
        }
        Num[req.body.boardId]++;
        workBoardModel.findOneAndUpdate({boardId: req.body.boardId},{commentNum:Num[req.body.boardId]}, function (err, result) {

            if(err) return console.log(err)
        }).catch((err)=>{
            console.error(err);
        })
        if(err) return console.log('save error')
        return res.end()
    })
})
router.get('/list', (req,res) => {
    workCommentModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

module.exports = router
