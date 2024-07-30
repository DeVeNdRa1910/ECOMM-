import {User} from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export async function userSignupController(req, res) {
  try {
    const {name, email, password} = req.body

    console.log(req.body);

    const checkEmail = await User.findOne({email})

    if(checkEmail){
      throw new Error("Email is already exist")
    }

    if(!email){
      throw new Error("Please provide Email");
    }
    if(!name){
      throw new Error("Please provide Name");
    }
    if(!password){
      throw new Error("Please provide Password");
    }

    const salt = bcrypt.genSaltSync(10);

    const encriptedPassword = await bcrypt.hashSync(password, salt)

    if(!encriptedPassword){
      throw new Error("Something is wrong")
    }

    const payload = {
      ...req.body,
      password: encriptedPassword
    }

    const userData = new User(payload)

    const saveUser = await userData.save()

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully"
    })

  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false
    })
  }
}