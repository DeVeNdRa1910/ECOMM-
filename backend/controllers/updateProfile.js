import { User } from "../models/user.model.js";

export async function updateProfileController(req, res){
    try {
        const sessionUser = req.userId;

        console.log(sessionUser);

        const {name, email, profilePic } = req.body;

        const payload = {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(profilePic && {profilePic: profilePic}),
        }

        const user = await User.findById(sessionUser);

        console.log("User for profile Update",user);

        const updatedUser = await User.findByIdAndUpdate(sessionUser, payload, { new: true });

        res.status(202).json({
            data: updatedUser,
            message: "Profile updated",
            error: false,
            success: true
        })

    } catch (error) {
        res.json({
            mesage: error.message || error,
            error: true,
            success: false
        })
    }
}