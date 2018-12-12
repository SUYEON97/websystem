const Router = require('express')
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
router.post('/', (req,res) =>{
    boardModel.find({userId: req.body.userId}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})
module.exports = router
