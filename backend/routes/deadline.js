const {
  Router
} = require('Express')
const router = Router()
const deadLineModel = require('../db/models/deadline')


// router.get('/', function(req,res){
//   deadLineModel.create({userId : 0, majorId : 0, hw_name : 'dd', hw_date : new Date('2018-12-3 UTC 00:00:00')}, function(err,dl){
//     console.log(dl);
//   })
// })

router.get('/', async function(req, res) {
  var millis = [];
  var timeRmArray = [];
  var now = Date.now();



  var sorted = await deadLineModel.find({}).sort({ hw_date: 1 })
  console.log(sorted.length);

  await deadLineModel.updateMany({}, {$set: {timeRemaining: this.hw_date}}, {'multi': true})

  millis = await deadLineModel.find({}).select('hw_date -_id');
  // console.log(millis[0]);
  // console.log(millis[1]);
  // console.log(millis[2]);
  // console.log(millis[3]);
  // console.log(millis[4]);

  for (var i = 0; i<sorted.length; i++) {
    timeRmArray[i] = await Number(millis[i].hw_date)-Date.now();
    console.log(millis[i].hw_date);
    console.log(timeRmArray[i]);
    await deadLineModel.updateOne({hwId:i+1},{timeRemaining: timeRmArray[i]})
  }

  await deadLineModel.find(function(err, dl) {
    res.json(sorted)
  })
})

module.exports = router
