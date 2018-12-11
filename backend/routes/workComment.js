const Router = require('express')
const router = Router()
const workCommentModel = require('../db/models/workComment')

router.post('/create', (req,res) => {
    var workComments = new workCommentModel({
        content: req.body.content,
        boardId : req.body.boardId
    });

    workComments.save(function(err){
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
