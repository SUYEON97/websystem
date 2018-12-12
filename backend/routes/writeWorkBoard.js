const Router = require('express')
const router = Router()
const workBoardModel = require('../db/models/workBoard')



router.post('/', (req,res) => {
   var now = new Date(Date.now());
   now.setHours(28)
    console.log(req.body.title)
    var workboard = new workBoardModel({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        major_name:req.body.major_name,
        subject_name:req.body.subject_name,
        time: now
    });

    workboard.save((err)=>{
        console.log(err)
        if(err) return console.log('save error')
        return res.end();
    })
})

module.exports = router
