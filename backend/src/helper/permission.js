import { User } from "../models/user.model.js";

export async function uploadProductPermission(userId){
    
    const user = await User.findById(userId);

    if(user.role === "ADMIN"){
        return true;
    }
    return false;

}