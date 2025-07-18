import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute=async(req,res,next)=>{
    try {
        const token= req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "unauthorized-No Token Provided"})
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "unauthorized-Invalid token"})
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user=user

        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}