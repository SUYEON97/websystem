const Router = require('express')
const router = Router()
const workCommentModel = require('../db/models/workComment')

router.post('/create', (req,res) => {
    console.log(req.body.userId)
    var workComments = new workCommentModel({
        userId: req.body.userId,
        content: req.body.content,
        boardId : req.body.boardId
    });

    workComments.save(function(err){
        if(err) return console.error(err)
        return res.end()
    })
})

router.get('/list', (req,res) => {
    workCommentModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})
router.post('/', (req,res) =>{
    workCommentModel.find({userId: req.body.userId}, function (err, result){
        if(err) return res.console.log('list error');
        console.log(result)
        return res.json(result)
    })
})

module.exports = router
