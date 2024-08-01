import express from "express";
import { userSignupController } from "../controllers/userSignup.js";
import { userSigninController } from "../controllers/userSignin.js";
import { userDetailsController } from "../controllers/userDetails.js";
import { userLogoutController } from "../controllers/userLogout.js";
import { getToken } from "../middleware/getToken.js";
import { updateProfileController } from "../controllers/updateProfile.js";

const router  = express.Router();

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get('/user-details', getToken, userDetailsController);
router.post('/update-profile',getToken, updateProfileController);
router.get('/logout', userLogoutController);

export default router;