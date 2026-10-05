const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    password: String
});

const User = mongoose.model(userSchema);

module.exports = User;