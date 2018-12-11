const jwt = require('jsonwebtoken')

function checktoken(req, res, next){
    const authheader = req.get('authorization');
    if(authheader){
        const token = authheader.split(' ')[1];
        if(token){
            jwt.verify(token, "secret", (err, user)=>{
                if(err){
                    console.log(err);
                }
                console.log(user)
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