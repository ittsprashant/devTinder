const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://infogooddeed_db_user:EtXVnBIJ3LzEuzvG@namastenode.jjwmz3h.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}


// This is one way to write but it is better to write this in app.js

// connectBD()
//     .then(() => {
//         console.log("Database connection successful")
//     })
//     .catch(() => {
//         console.log("Database not connected")
//     })