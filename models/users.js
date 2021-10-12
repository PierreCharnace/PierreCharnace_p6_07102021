const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },//email user with unique validator
    password: { type: String, required: true }            //password registeration
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)