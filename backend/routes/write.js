const Router = require('express')
const router = Router()
const boardModel = require('../db/models/board')


router.post('/', (req,res) => {
    var boards = new boardModel({
        title: req.body.title,
        content: req.body.content
        // userId : req.body.userId,
    });

    boards.save(function(err){
        if(err) return console.log('save error')
        return res.end();
    })
})

module.exports = router
