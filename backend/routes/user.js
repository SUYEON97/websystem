const { Router } = require('Express')
const User = require('../db/models/user')
const router = Router()
const crypto = require('crypto')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/changepw', function (req,res){
    console.log("changepw");
    var p = req.body.presentpw
    var c = req.body.changepw
    let username = req.body.name
    //console.log(p, c, username)

    let cipher = crypto.createCipher('aes128', 'key');
    cipher.update(p, 'utf8', 'base64');
    var cipheredOutput = cipher.final('base64');
    p = cipheredOutput;

    User.findOne({userName: username}, function(err, user){
        //console.log(user)
        if(err){
            console.log("err")
        }
        if(p != user.loginPw) return res.status(404).json({error:'not correct'});

        let cipher = crypto.createCipher('aes128', 'key');
        cipher.update(c, 'utf8', 'base64');
        var cipheredOutput = cipher.final('base64');
        user.loginPw = cipheredOutput;
        user.save(function (err) {
            if(err){
                console.error(err)
            }
            res.send({result:1});
            console.log("send")
        });

    })
})

module.exports = router