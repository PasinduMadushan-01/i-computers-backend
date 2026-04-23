import jwt from "jsonwebtoken";

export default function authenticateUser(req, res, next) {
    const header = req.header("Authorization")

    if (header !=null) {
     const token = header.replace("Bearer ", "")



     jwt.verify(token, "i-computer",
        (error, decoded) => {
            
            if(decoded== null){
                res.status(401).send({
                    message: "Invalid token"
                })
            }else{
                req.user = decoded
                next( )
            }
        }

        )
        
    
    } else {
        next()
    }
}