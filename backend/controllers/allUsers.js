import { User } from "../models/user.model.js"

export async function allUsersController(req, res){
    try {
        // console.log("userid for all users", req.userId);

        const allUsers = await User.find()

        res.status(202).json({
            users: allUsers,
            message: "All users fetched successfully",
            error: false,
            success: true
        })
    } catch (error) {
        res.status(404).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}