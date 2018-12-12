const Router = require('express')
const router = Router()
const commentModel = require('../db/models/comment')

router.post('/create', (req,res) => {
    console.log(req.body.userId)
    var comments = new commentModel({
        
        userId: req.body.userId,
        content: req.body.content,
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
router.post('/', (req,res) =>{
    commentModel.find({userId: req.body.userId}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

module.exports = router
