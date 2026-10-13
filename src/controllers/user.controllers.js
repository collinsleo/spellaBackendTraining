const User = require('../models/user.model')


const getProfile = async(req, res) => {
    try{
        const user = req.user;

        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "profile successfully fetched",
            data: user
        })
        
    }catch(error){
        console.log(error.message);  
    }
}


const fetchAllUsers = async (req,res)=>{
    try{

        const users = await User.find().select("-password").sort({createdAt: -1})

        return res.status(200).json({
            message: "user fetched successfully",
            data: users
        })

    }catch(error){
        console.error(error.message)
        return res.status(500).json({
            message: "Unable to fetch users"
        })
    }
}
module.exports = {getProfile, fetchAllUsers}
