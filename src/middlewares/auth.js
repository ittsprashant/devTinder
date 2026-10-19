const jwt = require("jsonwebtoken");

// jab tak mera next call yahan se nai hoga kabhi bhi control app.js ke related function pe jaaega hi nai - 
// so agar hum /profile se auth middleware call kar rae, toh jab tak yahan pe next ki call nai jaaegi tab tak
// /profile pe wapas control nai jaaega. Error handling bhi yahin se hi ho jaaegi.

const auth = (req, res, next) => {
    // const token = "12345";
    // const isAuthorized = token === "123456";

    // console.log("Authorization checked via auth middleware")

    // if (!isAuthorized) {
    //     res.status(401).send("Not authorized!")
    // }
    // else {
    //     next();
    // }

    try {
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            throw new Error("Token is required!");
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decodedData;

        if (!_id) {
            throw new Error("Token is required!");
        }
        else {
            req._id = _id;
            next();
        }
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
};

module.exports = {
    auth
}