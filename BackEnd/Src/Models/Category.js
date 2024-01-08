const mongoose = require('mongoose')
const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    }
})

const Category = mongoose.model('Categories' , CategorySchema)

module.exports = Category;