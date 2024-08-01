import { User } from "../models/user.model.js";

export async function userUpdate(req, res){
    try {
        const sessionUser = req.userId;

        const {userId, name, email, role} = req.body;

        const payload = {
            ...(email && {emai : email}),
            ...(name && {name : name}),
            ...(role && {role: role})
        }

        const user = await User.findById(sessionUser)

        console.log();

        const updatedUser = await User.findByIdAndUpdate(userId, payload)

        res.json({
            data: updatedUser,
            message: "User profile updated Successfully",
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}