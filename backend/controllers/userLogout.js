export async function userLogoutController(req, res){
    try {
        res.clearCookie("token")

        res.json({
            message: "User Logout Successfully",
            error: false,
            success: true,
            data: [],
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}