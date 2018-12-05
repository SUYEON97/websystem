const Router = require('Express')
const router = Router()
const boardModel = require('../db/models/board')


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

module.exports = router