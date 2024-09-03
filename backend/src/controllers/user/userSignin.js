import {User} from '../../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function userSigninController(req, res) {
    try {

        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide Email");
        }

        if (!password) {
            throw new Error("Please provide Password");
        }

        const user = await User.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        console.log("Is password Provided by User is coorect ? :",checkPassword);

        if(checkPassword){
            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            /* JWT token syntax 
            
            var token = jwt.sign(userData, privateKey, { algorithm: 'RS256' });
                                             OR
            var token = jwt.sign(userData, privateKey, { expiresIn: '8hr' });
                                             OR
            var token = jwt.sign(userData, privateKey, { expiresIn: 60*60*8 });
                                             OR
            var token = jwt.sign(userData, privateKey, { expiresIn: 'RS256' });
            */

            const token = jwt.sign(tokenData, process.env.JWTOKEN_SECRET_KEY, {
                expiresIn: '8hr'
            })

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "User Logged in successfully",
                data: token,
                success: true,
                error: false,
            })


        }else{
            throw new Error("Something went wrong")
        }
        
        /* 
        now user login kar liya hai to ab user ke data ko ham cookie me store karenge during the session
         */

    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}