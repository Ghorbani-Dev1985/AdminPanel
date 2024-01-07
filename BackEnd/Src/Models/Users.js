const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    firstName : {
        type: String,
        require: true,
        minLength: 3,
        lowercase: true,
        trim: true
    },
    lastName : {
        type: String,
        require: true,
        minLength: 3,
        lowercase: true,
        trim: true
    },
    phoneNumber : {
        type: Number,
        require: true,
        minLength: 10,
        trim: true
    },
    userName : {
        type: String,
        require: true,
        minLength: 8,
        trim: true
    },
    password : {
        type: String,
        require: true,
        minLength: 8,
        trim: true
    }
})

let Users = mongoose.model('Users' , UserSchema);

module.exports = Users;