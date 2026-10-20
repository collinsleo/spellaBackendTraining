const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const authService = require("../services/auth.services")

const registerUser = async (req, res) =>{
    try{
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                message: "Please provide all required fields",
            })
        }

        const newUser = await authService.registerUser({fullName, email, password})

        return res.status(201).json({
            message: "User registered successfully",
            newUser
        })
       
    }catch(error){

        console.log("ERROR:", error.message);
        return res.status(500).json({
            message: "Error registering user",
        })

    }
}


const loginUser = async (req,res) =>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const {token, user} = await authService.loginUser(email, password)

        // console.log(login);
        
        return res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        })

    }catch(error){
        console.log("Error login in: ", error.message);
        return res.status(500).json({
            message: "Internal server Error",
        })
    }

}

const loginWithCode = async (req,res) =>{
    try{

        const {email, code} = req.body;
        

        if(!email || !code){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const {token, user} = await authService.loginWithCode(email, code)

        // console.log(login);
        
        return res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        })

    }catch(error){
        console.log("Error login in with code: ", error.message);
        return res.status(500).json({
            message: "Internal server Error",
        })
    }

}

const VerifyEmail = async (req,res) =>{
    try{
        
        const {email, token} = req.body;

        if(!email || !token){
            return res.status(400).json({error: "Token and email are required"})
        }
        
        await authService.verifyEmail({email, token})

        return res.status(200).json({message: "Email verification was successful"})

    }catch(error){
        console.log("Error Verifying Email: ", error.message);
        return res.status(500).json({
            message: "Internal server Error",
        })
    }

}


const resendCode = async (req, res) =>{
    try{
        const {email} = req.body   
        
        const result = await authService.resendCode({email})

        return res.status(200).json({
            "message":`we Sent you a code on ${result.email}`
        })
       
    }catch(error){

        console.log("ERROR:", error.message);
        return res.status(500).json({
            message: "Error resending email verification code",
        })

    }
}


const getLoginCode = async (req,res) =>{
    try{

        const {email} = req.body;
        

        if(!email){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const result = await authService.sendLoginCode(email)

        
        return res.status(200).json({
            message: "we send you a code on your email",
        })

    }catch(error){
        console.log("Error login in: ", error.message);
        return res.status(500).json({
            message: "Internal server Error",
        })
    }

}


module.exports = { registerUser, loginUser, VerifyEmail, resendCode, getLoginCode, loginWithCode};

