const {
  Router
} = require('Express')
const router = Router()
const deadLineModel = require('../db/models/deadline')

var year;
var month;
var day;

router.get('/deadlinelist', async function(req, res) {
  var millis = [];
  var timeRmArray = [];
  var now = Date.now();
  //var sorted = await deadLineModel.find({}).sort({ hw_date: 1 })
  millis = await deadLineModel.find({}).select('hw_date -_id');

  for (var i = 0; i<deadLineModel.length; i++) {
    timeRmArray[i] = await Number(millis[i].hw_date)-Date.now()-32400000; //KST - UTC - 9
    await deadLineModel.updateOne({hwId:i},{timeRemaining: timeRmArray[i]}).then(async function(){
        if(timeRmArray[i]<0){
            await deadLineModel.updateOne({hwId:i},{status: 2})
        }
    })
  }
  var sorted = await deadLineModel.find({}).sort({ hw_date: 1 })

  res.json(sorted)

})

router.post('/delete', function(req,res){
  console.log(req.body.hwId);
  //deadLineModel.deleteOne({hwId: req.body.hwId});
  deadLineModel.deleteOne({ hwId: req.body.hwId }, function (err) {
  if (err) return handleError(err);
  });
})

router.post('/complete', function(req,res){
  console.log(req.body.hwId);
  deadLineModel.updateOne({ hwId: req.body.hwId }, { status: 1}, function(err){
    if (err) return handleError(err);
  });
})

module.exports = router
