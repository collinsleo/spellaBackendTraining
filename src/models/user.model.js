const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email:  {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address:{
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;