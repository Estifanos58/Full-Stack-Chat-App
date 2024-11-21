import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js";

const maxAge = 3* 24 * 60 *60 *1000;

const createToken = (email, userId) =>{
    return jwt.sign({email, userId},  process.env.JWT_KEY, {expiresIn: maxAge})
}
export const signup = async (req,res, next)=>{
    try{
        const { email, password } = req.body;
        console.log(req.body);
        if(!email, !password){
            return res.status(400).send("Email and Password is required.")
        }
        const duplicate = await User.findOne({email});
        if(duplicate) {
            return res.json({message: "Email already exist"});
        }
        const user = await User.create({email, password});
        res.cookie('jwt', createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None", 
        });
        if(user){
            // console.log(user)
           return res.status(201).json({user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup
        }}) 
        } else {
            return res.status(400).json({message: "User not created"})
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}