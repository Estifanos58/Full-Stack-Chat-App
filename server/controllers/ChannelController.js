import mongoose from "mongoose";
import Channel from "../models/ChannelModel";
import User from "../models/UserModel";

export const createChannel = async (req, res) => {
    try {
     const {name, members, } = req.body;
     const userId = req.userId;

     const admin = await User.findById(userId);

     if(!admin){
        return res.status(400).send("Admin user not found");
     }

     const validMembers = await User.find({_id: {$in: members}});

     if(validMembers.lenght != members.lenght){
        return res.status(400).send("Some members are not valid users.");
     }

     const newChannel = new Channel({
        name,
        members,
        admin: userId,
     });

     await newChannel.save();
     return res.status(201).json({ channel: newChannel});

    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };
  

  export const getUserChannels = async (req, res) => {
    try {
     const userId = new mongoose.Types.ObjectId(req.userId);
     const channels = await Channel.find({
        $or: [{ admin: userId}, {members: userId}],
     }).sort({updatedAt: -1});

     
     return res.status(201).json({ channels});

    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };