
import { verifyToken } from "../helper/helper.js" 

const middleware=(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
       let token=req.headers.authorization.split(' ')[1]
       try{
        if(typeof token === "string"){
            const response = verifyToken(token)
            if(response){
                next()
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        }
    }catch(error){
        res.status(401).json({ message: "Token expired" })
    }
    }else{
        res.send({message:'No token found'})
    }
    
}




export default middleware