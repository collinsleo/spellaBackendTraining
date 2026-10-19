const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const jsonWebToken = require("jsonwebtoken")
const Token = require('../models/token.model')
const mailService = require('../services/mail.services')


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

    const code = (""+ Math.floor(1000 + Math.random() * 90000))

    await Token.create({
        UserId: newUser._id,
        code
    })
    
    const firstName = fullName.split(" ")[0]
    await mailService.sendVerificationEmail(email, firstName, code)

    return newUser
        
}


const loginUser = async (email, password )=>{
const user = await User.findOne({email})
        if(!user){
            throw new Error("User not found")
            
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Invalid password");
            
            
        }

        const token = jsonWebToken.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRETE, {expiresIn: "1h"})
        return({
            token: token, 
            user: user
        })
}

module.exports = {registerUser, loginUser}