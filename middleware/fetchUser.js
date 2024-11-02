const jwt=require('jsonwebtoken');
const JWT_SECRETE="peace bro";

const fetchUser= (req,res,next)=> {
//get the user from the token and add it's id to the request object
const token=req.header('auth-token');
//if token isn't available
if(!token) {
    res.status(401).send({error:"Please authenticate using a valid token"});
}
try { 
    const data=jwt.verify(token,JWT_SECRETE);
req.user=data.user;
    next();
} catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token"})
}
}

module.exports= fetchUser;