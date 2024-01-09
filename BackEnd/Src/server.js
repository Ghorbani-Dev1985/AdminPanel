const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors");
const UserModel = require('./Models/Users')
const CategoryModel = require('./Models/Category')
const AdminModel = require('./Models/Admin')

const userRouter = require('./Routes/userRouter')
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api/users' , userRouter)


mongoose.connect('mongodb://127.0.0.1:27017/AdminPanel');
mongoose.Promise = global.Promise;

// let mohsenInfo = {
//     firstName: 'محمد',
//     lastName: 'قربانی',
//     phoneNumber: '09358923824',
//     userName: 'moh1985ghDev',
//     password: 'moh1985ghDev'
// }

// let phoneCategory = new CategoryModel({
//   title: 'سامسونگ'
// })

// let mohUser = new UserModel(mohsenInfo)

// mohUser.save().then(() => {
//     console.log('New user inserted')
// })

// phoneCategory.save().then(() => {
//   console.log('New category inserted')
// })

// UserModel.findOneAndDelete({firstName: 'lpln'}).then(deleteUser => {
//   console.log('One user deleted')
// })

// UserModel.findByIdAndDelete('659a5e96693bfae019d45b2b').then(deleteUser => {
//   console.log('One user delete by id')
// })

// UserModel.find({ firstName: 'محسن' }).then(userFind => {
//   console.log(userFind)
// })

// UserModel.findById('659a5e9725dc93e52cd8d77a').then(userFindByID => {
//   console.log('userFindByID' ,userFindByID)
// })

// UserModel.find({}).then(getAll => {
//   console.log(getAll)
// })

// UserModel.findOneAndUpdate({firstName : 'محسن'} , {
//   firstName: 'محیا',
//   lastName: 'پرویزی',
//   userName: 'mahyaParvizi123',
//   password: 'mahyaParvizi1232112393'
// }).then(userUpdate => {
//   console.log('User Updated....')
// })

// UserModel.findByIdAndUpdate('659bfb012c84cf4a400fd6d9' , {
//   firstName: 'نیلوفر',
//   lastName: 'مرادی',
//   userName: 'niloMoradi434566',
//   password: 'kolifdj123445fe',
// }).then(result => {
//   console.log('By ID Updated' , result)
// })



app.listen(8000)