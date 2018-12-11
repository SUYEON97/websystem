const jwt = require('jsonwebtoken')
const { SECRET } = require('../constants');

function checktoken(req, res, next){
    const authheader = req.get('authorization');
    if(authheader){
        const token = authheader.split(' ')[1];
        if(token){
            jwt.verify(token, SECRET, (err, user)=>{
                if(err){
                    console.log(err);
                }
                req.user = user;
                next();
            })
        }
        else{
            next();
        }
    }
    else{
        next();
    }
}

module.exports = {
    checktoken,
};