import JWT from "jsonwebtoken"

const verifyAdmin = (req,res,next)=>{
 
    if(req.user.role !=="admin"){
        
        res.status(403).json({message:"Access denied"})
    }
    
   next()

}


export default verifyAdmin