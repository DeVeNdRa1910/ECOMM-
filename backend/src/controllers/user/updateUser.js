import { User } from "../../models/user.model.js";

export async function updateUserController(req, res){
    try {
        const sessionUser = req.userId; // Session ID current admin ki hai

        const { userId, email, name, role } = req.body;

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        }

        const user = await User.findById(sessionUser);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true });

        res.status(200).json({
            data: updatedUser,
            message: "User updated successfully",
            error: false,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}