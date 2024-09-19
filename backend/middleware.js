const {JWT_SECRET} = require('./config.js');

const jwt = require('jsonwebtoken');

const authMiddleware =(req,res,next)=>{
         console.log("ko")
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
                res.status(403).json({})
        }

        const token = authHeader.split(' ')[1];

        try{
                const decoded = jwt.verify(token,JWT_SECRET);
        
                if(decoded.userId){
                       req.userId= decoded.userId
                       next();
                }else{
                        res.status(403).json({});
                }
        } catch(err){
 
                res.status(403).json({});
        }
};
console.log("j")
module.exports={
        authMiddleware
}