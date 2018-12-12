const Router = require('Express')
const router = Router()
const boardModel = require('../db/models/board')


router.post('/', (req,res) => {
    console.log(req.body.userId)
    var boards = new boardModel({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    });

    boards.save(function(err){
        if(err) return console.error(err)
        return res.end();
    })
})

module.exports = router