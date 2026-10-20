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
        userId: newUser._id,
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

    if(user.isVerified !== true)throw new Error ("Please verify your email")

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

const loginWithCode = async (email, code )=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("User not found")
        
    }

    if(user.isVerified !== true)throw new Error ("Please verify your email")

    const tokenDoc = await Token.findOne({userId:user._id, code: code})

    if(!tokenDoc) throw new Error ("Invalid or expired verification token")

    
    const token = jsonWebToken.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRETE, {expiresIn: "1h"})

    await Token.deleteMany({_id: tokenDoc._id})

    return({
        token: token, 
        user: user
    })
}

const verifyEmail = async ({email, token} )=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("User not found")   
    }
    
    const tokenDoc = await Token.findOne({userId:user._id, code: token})

    if(!tokenDoc) throw new Error ("Invalid or expired verification token")

    user.isVerified = true;

    await user.save();

    await Token.deleteMany({_id: tokenDoc._id})

    return({
        user: user
    })
}

const resendCode = async ({email})=>{
    
    const user = await User.findOne({email:email}).select("-password")
    if(!user){
        throw new Error("User not Found");
    }

    const code = (""+ Math.floor(1000 + Math.random() * 90000))

    await Token.create({
        userId: user._id,
        code
    })
    
    const fullName = user.fullName 
    const firstName = fullName.split(" ")[0]
    await mailService.sendVerificationEmail(email, firstName, code)
    const email_pref = email.slice(0,4)
    const email_srf = email.slice(-1,5)

    return {
        email: `${email_pref}...${email_srf}`
    }
        
}

const sendLoginCode = async (email)=>{
    
    const user = await User.findOne({email:email}).select("-password")
    if(!user){
        throw new Error("User not Found");
    }

    const code = (""+ Math.floor(1000 + Math.random() * 90000))

    await Token.create({
        userId: user._id,
        code
    })
    
    const fullName = user.fullName 
    const firstName = fullName.split(" ")[0]
    await mailService.sendLoginCodeEmail(email, firstName, code)
    const email_pref = email.slice(0,4)
    const email_srf = email.slice(-1,-5)

    return {
        email: `${email_pref}...${email_srf}`
    }
        
}

module.exports = {registerUser, loginUser, verifyEmail, resendCode, sendLoginCode, loginWithCode}