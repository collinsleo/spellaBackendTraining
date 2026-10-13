const bcrypt = require('bcrypt');
const User = require('../models/user.model');


const registerUser = async ({fullName, email, password})=>{
    
    const userExisting = await User.findOne({email:email})
    if(userExisting){
        throw new Error("User ALready Existing");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return newUser
        
}

module.exports = {registerUser}