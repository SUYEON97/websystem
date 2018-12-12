const Router = require('Express')
const router = Router()
const workBoardModel = require('../db/models/workBoard')


router.post('/', (req,res) => {
    console.log(req.body.title)
    var workboard = new workBoardModel({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        major_name:req.body.major_name,
        subject_name:req.body.subject_name
    });

    workboard.save((err)=>{
        console.log(err)
        if(err) return console.log('save error')
        return res.end();
    })
})

module.exports = router