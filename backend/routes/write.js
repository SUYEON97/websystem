const Router = require('express')
const router = Router()
const boardModel = require('../db/models/board')


router.post('/', (req,res) => {
  var now = new Date(Date.now());
  now.setHours(28)
    console.log(req.body.userId)
    var boards = new boardModel({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        time: now
    });

    boards.save(function(err){
        if(err) return console.error(err)
        return res.end();
    })
})

module.exports = router
