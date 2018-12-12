const Router = require('Express')
const router = Router()
const workBoardModel = require('../db/models/workBoard')


router.get('/list', (req,res) => {
    workBoardModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

// router.get('/wantlist', (req,res) => {
//     workBoardModel.find({$or:[{major_name:{$regex:req.body.userWant}}]}).exec(function (err, result){
//         if(err) return res.console.log('list error');
//         return res.json(result)
//     })
// })

router.get('/:boardId', (req,res) =>{
    workBoardModel.find({}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})

router.post('/', (req,res) =>{
    workBoardModel.find({userId: req.body.userId}, function (err, result){
        if(err) return res.console.log('list error');
        return res.json(result)
    })
})
module.exports = router