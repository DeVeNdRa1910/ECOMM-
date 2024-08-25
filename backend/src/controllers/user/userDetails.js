import { User } from "../../src/models/user.model.js";

export async function userDetailsController(req, res){
    try {
        console.log("userId", req.userId);

        const userId = req.userId;

        const user = await User.findById(userId)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "user details"
        })

        //console.log(user);
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}