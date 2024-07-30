import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String
},{timestamps: true})

export const User = mongoose.model("User", userSchema)