import User from "../models/user.js"; 
import bcrypt from"bcrypt"
import jwt from "jsonwebtoken"


export async function createUser (req,res){
 try{

    const passwordHash = bcrypt.hashSync(req.body.password,10)
     
     const newUser = new User ({
         email : req.body.email,
         firstname : req.body.firstname,
         lastname:req.body.lastname,
         password : req.body.password,
         password: passwordHash


     })
    await newUser.save()
   res.json({
    message:"User create successfully",
   });
    
}catch(error){
    console.log("Error creating user:", error.message);
    res.json({
     message:"User create unsuccessfully",
    })
 }
}

 export async function loginUser (req,res){
    try{
        const user = await User.findOne({
         email : req.body.email
    })

     //console.log(user)

     if (user == null){
        res.json({
            message : "user not found"
        })
     }else{const isPasswordCorrect = bcrypt.compareSync( req.body.password,user.password)

        if(isPasswordCorrect)
            {
                const paylod = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user. lastName,
                    isAdmin : user . isAdmin,
                    isBlocked : user. isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image  
                }
                const token = jwt.sign(paylod,"i-computer" , {
                    expiresIn : "24h"
                })
                res.json({
                    token : token
                })
              
                
       }else{
        res.status(401).json({
               message : "not found"})
       }
     }
 }
catch(error){
    res.status(401).json({
     message:"User login unsuccessfully",
    })
 }
}

 

export function isAdmin(req){
    if(req.user == null){
        return false
    }
    if (req.user.isAdmin){
        return true
    }else {
        return false
    }
}