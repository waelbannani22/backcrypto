var mongoose = require('mongoose')

var user = new mongoose.Schema({
    username: String,
    photo: String,
    email: String,
    phone:String,
    password: String,


})


const User = mongoose.model("User", user)
module.exports = User;