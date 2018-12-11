const express = require('express')
const router = express.Router();
const User = require('../db/models/user')
const crypto = require('crypto')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')


router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/auth', function(req, res){
    let token = req.headers['x-access-token'] || req.query.token
    if(!token){
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }
    let decode = jwt.verify(token, "secretkey");
    res.json(decode)
})

router.post('/signup', function (req, res, next) {
    console.log("signup")
    
    const user = new User();
    
    user.userName = req.body.user.name;
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
    
    User.findOne({loginId: id}, function (err, user) {
        if(!user) {
            console.log("send")
            return res.send({result:1})
        }
        else {
            return res.status(404).json({error:'already'});
        }
    });
});

router.post('/check', function (req, res, next) {
    console.log("check");
    let loginId = req.body.user.id;
    let loginPw = req.body.user.password;
    
    User.findOne({loginId: loginId}, function (err, user) {
        
        if(!user) return res.status(404).json({error:'no user'});
        else{
            if(user.loginPw == loginPw){
                var token = jwt.sign({loginId: user.loginId}, "secretkey");
                res.status(200).json({token: token})
               
            }
            else{
                return res.status(404).json({error:'no pw'});
            }
        }
    })
});

module.exports = router;