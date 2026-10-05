const auth = (req, res, next) => {
    const token = "12345";
    const isAuthorized = token === "123456";

    console.log("Authorization checked via auth middleware")

    if (!isAuthorized) {
        res.status(401).send("Not authorized!")
    }
    else {
        next();
    }

};

module.exports = {
    auth
}