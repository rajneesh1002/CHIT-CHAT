import jwt from 'jsonwebtoken';

export const generateToken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie("jwt",token, {
        maxAge: 7*24*60*60*1000, //maxAge max-age in milliseconds, converted to expires
        httpOnly: true, //prevent xss attacks cross-site scripting attacts
        samsSite: 'strict', // CSRF attacts cross-site request forgery attacts
        sucure: process.env.NODE_ENV !=='development',
    });


}