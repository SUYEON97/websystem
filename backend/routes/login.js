const express = require('express')
const router = express.Router();
const User = require('../db/models/user')
const crypto = require('crypto')
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.post('/signup', function (req, res, next) {
    const user = new User();
    user.userName = req.body.user.name;
    console.log(user.userName)
    user.loginId = req.body.user.id;
    user.loginPw = req.body.user.password;

    let cipher = crypto.createCipher('aes128', 'key');
    cipher.update(user.loginPw, 'utf8', 'base64');
    var cipheredOutput = cipher.final('base64');
    user.loginPw = cipheredOutput;
    
    user.save(function (err) {
        if(err){
            console.error(err)
        }
        res.json({result:1});
    });
});

router.post('/signup/dupcheck', function (req, res, next) {
    console.log("dupcheck")
    var id = req.body.id;
    //console.log(id)
    User.findOne({loginId: id}, function (err, user) {
        console.log(user)
        if(!user) {
            console.log("send")
            return res.send({result:1})
            //c//onsole.log("dup")
        }
        else {
            return res.status(404).json({error:'already'});
        }
    })
});

router.post('/check', function (req, res, next) {
    console.log("check");
    let cipher = crypto.createCipher('aes128', 'key');
    cipher.update(req.body.user.password, 'utf8', 'base64');
    let cipherPw = cipher.final('base64');
    //console.log(cipherPw);
    User.findOne({loginId: req.body.user.id, loginPw: cipherPw}, function (err, user) {
        console.log(user)
        if(!user) return res.status(404).json({error:'user not found'});
        res.send(user);
    })
});

module.exports = router;