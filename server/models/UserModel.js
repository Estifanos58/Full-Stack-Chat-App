import { genSalt,hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false
    },
    profileSetup: {
        type: Boolean,
        required: false
    }
})

userSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const User = mongoose.model('Users', userSchema);

export default User;