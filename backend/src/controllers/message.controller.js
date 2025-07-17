import User from "../models/user.model.js";

import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id: {$ne:loggedInUserId}}).select("-password") //all user data except logged in user

        res.status(200).json(filteredUsers)
    } catch (error) {
        
    }
};

export const getMessage=async(req,res)=>{
try {
    const {id:userToChatId}=req.params
    const myId=req.user._id;

    const message=await Message.find({
        $or:[
           {senderId:myId, receiverId:userToChatId},
           {senderId:userToChatId, receiverId:myId},
        ]
    })
    res.status(200).json(message)
} catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    res.status(500).json({error: "Internal server error"});
}
};

export const sendMessage=async(req,res)=>{
    try {
        const {text, image}=req.body;
        const {id: receiverId}=req.params;
        const senderId=req.user.id;

        let imageUrl;
        if(image){
            const uploadResopnse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResopnse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}