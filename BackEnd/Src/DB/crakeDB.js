const mongoose = require('mongoose');
const UserModel = require('../Models/Users')
mongoose.connect('mongodb://127.0.0.1:27017/GhorbaniDev');

let mohsenInfo = {
    firstName: 'محمد',
    lastName: 'قربانی',
    phoneNumber: '09358923824',
    userName: 'moh1985ghDev',
    password: 'moh1985ghDev'
}
let mohUser = new UserModel(mohsenInfo)

mohUser.save().then(() => {
    console.log('New user inserted')
})
// const crakeDB = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'crakeApp',
// })

// module.exports = crakeDB;