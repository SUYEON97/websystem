const { Router } = require('Express')
const User = require('../db/models/user')
const router = Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/changepw', function (req,res){
    //console.log("changepw");
    var p = req.body.presentpw
    var c = req.body.changepw
    let username = req.body.name
    //console.log(p, c, username)

    User.findOne({loginId: username}, function (err, user) {
        if(user) {
            console.log(user)
            bcrypt.compare(p, user.loginPw).then(result => {
                if(result){
                    console.log("현재 통과")
                    bcrypt.hash(c, 12).then(hashed => {
                        console.log(hashed)
                        
                        user.userName = user.userName;
                        user.loginId = user.loginId;
                        user.loginPw = hashed;
    
                        user.save(function (err) {
                            if(err){
                                console.error(err)
                            }
                            console.log("바꿈")
                            res.json({result:1});
                        });
                    });
                }
                else{
                    return res.status(404).json({error:'다시'});
                }
            })
        }
        else {
            return res.status(404).json({error:'다시'});
        }
    });
})

module.exports = router