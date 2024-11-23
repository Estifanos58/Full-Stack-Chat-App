import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if ((!email, !password)) {
      return res.status(400).send("Email and Password is required.");
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.json({ message: "Email already exist" });
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    if (user) {
      // console.log(user)
      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,
        },
      });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if ((!email, !password)) {
      return res.status(400).send("Email and Password is required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Email and Password is required");
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect.");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    if (user) {
      // console.log(user)
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,
          firstname: user.firstname,
          lastname: user.lastname,
          image: user.image,
          color: user.color,
        },
      });
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData)
      return res.status(404).send("User with the given id not found");

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      color: userData.color,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;

    const { firstname, lastname, color } = req.body;
    console.log(
      `firstname: ${firstname} lastname: ${lastname} color: ${color}`
    );
    if (!firstname || !lastname) {
      return res.status(400).send("Firstname Lastname and color is required.");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      color: userData.color,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("file is required");
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);
    console.log(fileName)
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );
    console.log(updatedUser)
    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const removeProfileImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({userId});

    if(!user){
        return res.status(404).send("User ot found");
    }
    if(user.image){
        unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res.status(200).send({message:"Profile image removed successfully."})
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
