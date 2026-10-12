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

module.exports = {getProfile}
