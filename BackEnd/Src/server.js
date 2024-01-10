const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors");
const UserModel = require('./Models/Users')
const AdminModel = require('./Models/Admin')

const userRouter = require('./Routes/userRouter')
const xAxiosDataRouter = require('./Routes/xAxiosDataRouter')
const transactionRouter = require('./Routes/transactionRouter')
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api/users' , userRouter)
app.use('/api/xAxiosData' , xAxiosDataRouter)
app.use('/api/transaction' , transactionRouter)

mongoose.connect('mongodb://127.0.0.1:27017/AdminPanel');
mongoose.Promise = global.Promise;



app.listen(8000)