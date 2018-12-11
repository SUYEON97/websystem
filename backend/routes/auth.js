const express = require('express');
const router = express.Router();
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../db/models/user')
const { SECRET } = require('../constants');

const signup = joi.object().keys({
    name:joi.string().alphanum().min(3).max(30).required(),
    id:joi.string().alphanum().min(4).max(30).required(),
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

router.post('/signup', (req,res)=>{
    const result = joi.validate(req.body.user, signup);
    if(result.error === null){
        User.findOne({loginId: req.body.user.id}, function (err, user) {
            if(!user) {
                bcrypt.hash(req.body.user.password, 12).then(hashed => {
                    
                    const user = new User();
                    user.userName = req.body.user.name;
                    user.loginId = req.body.user.id;
                    user.loginPw = hashed;

                    user.save(function (err) {
                        if(err){
                            console.error(err)
                        }
                        res.json({result:1});
                    });
                });
            }
            else {
                return res.status(404).json({error:'already'});
            }
        });
    }
    else{
        res.json(result.error);
    }
});

router.post('/login', (req, res)=>{
    User.findOne({loginId: req.body.user.id}, function (err, user){
        if(user) {
            bcrypt.compare(req.body.user.password, user.loginPw).then((result) => {
                if(result){
                    const payload = {
                        _id: user._id,
                        name: user.userName,
                        loginId: user.loginId
                    };
                    jwt.sign(payload, SECRET,{
                        expiresIn: '1d'
                    },(err, token) => {
                        if(err){
                            return res.status(404).json({error:'fail'});
                        }
                        else{
                            res.json({token})
                        }
                    });
                }
                else{
                    return res.status(404).json({error:'fail'});
                }
            });
        }
        else {
            return res.status(404).json({error:'fail'});
        }
    });
});

router.post('/signup/dupcheck', function (req, res, next) {
    console.log("dupcheck")
    var id = req.body.id;
    
    User.findOne({loginId: id}, function (err, user) {
        if(!user) {
            return res.send({result:1})
        }
        else {
            return res.status(404).json({error:'already'});
        }
    });
});

module.exports = router