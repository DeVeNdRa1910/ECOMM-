import express from "express";

import { userSignupController } from "../controllers/userSignup.js";

const router  = express.Router()

router.post("/signup", userSignupController)

export default router;