const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User"
    },
    code:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires:600
    }
})

const Token = mongoose.model("Token", tokenSchema)
module.exports = Token