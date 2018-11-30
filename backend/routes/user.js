const { Router } = require('Express')
const router = Router()
const userModel = require('../db/models/user')

// router.get('/', function(req,res){
//   userModel.create({userId : 0, userName : 'Lee', loginId : 'user1',  loginPw : '123'},function(err,user){
//     console.log(user);
//   })
// })

router.get('/', async function(req,res){
  var user = await userModel.findOne({userId : 0})
  console.log(user);
  res.json(user)
})


module.exports = router
