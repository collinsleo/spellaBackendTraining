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

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return res.status(402).json({
                message: "Invalid password"
            })
        }

        const token = jsonWebToken.sign({id:user._id, email:user.email, role:user.role}, process.env.JWT_SECRETE, {expiresIn: "1h"})

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
        
    }

}

module.exports = { registerUser, loginUser };

