const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        maxLength: 50,
        required: true,
        uniqueId: true
    },
    lastName: String,
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    },
    bio: {
        type: String,
        default: "This is the bio"
    },
    skills: {
        type: [String]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,

    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;