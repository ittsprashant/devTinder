const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
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