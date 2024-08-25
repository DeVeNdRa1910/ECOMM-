import jwt from "jsonwebtoken"

export async function getToken(req, res, next){
    try {
        
        const token = req.cookies?.token;

        // console.log("Token: ", token);

        if(!token){
            return res.status(200).json({
                message: "Please Login...",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.JWTOKEN_SECRET_KEY, function (err, decoded){
            console.log(err);
            console.log("decoded", decoded);

            if(err){
                console.log("error auth", err);
            }

            req.userId = decoded?._id

            next()

        })

    } catch (error) {
        res.status(404).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}
