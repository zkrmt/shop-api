import JWT from "jsonwebtoken"




const verifyToken = (req,res,next)=> {
    
   try{
      const token = req.headers.authorization.split(" ")[1]
      const verification = JWT.verify(token , process.env.JWT_SECRET)
      req.user = verification
    next()

    
   }catch(err){
    console.error(err)
    res.status(401).json({error:"unauthorized access"})
 }

}

export default verifyToken

