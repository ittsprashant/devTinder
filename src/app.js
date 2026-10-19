process.loadEnvFile();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/auth");
// require("./config/database");
const { connectDB } = require("./config/database");
const { checkSignUpValidity } = require("./utils/validators");
const User = require("./models/user");

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(cookieParser());
// express.json acts as a middleware which converts the json object coming to the server and converts it
// to the js object. Without this express.json() my req.body will be undefined. 

// Middlewares - general logic

app.use("/admin", (req, res, next) => {
    const token = "abc";
    const isAuthorized = token === "abc";

    console.log("Admin auth being checked")

    if (!isAuthorized) {
        res.status(401).send("Unauthorized")
    }

    next();
})

app.get("/admin/getAllData", (req, res, next) => {
    res.send("All data sent!")
})


// creating middlewares as a module

app.use("/auth", auth);

app.get("/auth/fetchSecrets", (req, res, next) => {
    res.send("Secrets fetched")
})




// GET calls = app.get will only be eligible for GET calls
app.get("/user", (req, res) => {
    res.send({ firstName: "Prashant" })
})


// app.use will handle all HTTP methods
app.use("/hello", (req, res) => {
    res.send("Hello world");
})



connectDB()
    .then(() => {
        console.log("Database connection successful");
        app.listen(7777, connectDB, () => {
            console.log("Successfully listening on port 7777");
        });
    })
    .catch((err) => {
        console.log("Database not connected", err.message)
    })

// start building apis
// signup api => /signup   

app.post('/signup', async (req, res) => {

    // creating a new instance of user model
    // const user = new User({
    //     firstName: "Prashant",
    //     lastName: "Awasthi",
    //     age: 31
    // })

    // extracting from req
    try {
        const { firstName, lastName, email, password, gender } = req.body;
        checkSignUpValidity({ firstName, lastName, email, password, gender });

        // encrypt password - bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender
        });
        await user.save();
        res.send("Data added successfully!")

    }
    catch (err) {
        res.status(400).send("User could not be saved: " + err.message);
    }
})


// Log In API

app.use("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const valid = await bcrypt.compare(password, user.password);

            if (valid) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
                res.cookie("token", token);
                res.send("Login Success")
            } else {
                res.status(400).send("Invalid email or password");
            }
        }
        else {
            res.status(400).send("Invalid email or password");
        }
    }
    catch (err) {
        res.status(400).send("Unable to login: " + err.message);

    }
})


// fetch profile

app.get("/profile", auth, async (req, res) => {

    try {

        // const cookies = req.cookies;

        // if(!cookies?.token){
        //     throw new Error ("Token is required");
        // }
        // const decodedData = jwt.verify(cookies?.token, process.env.JWT_SECRET_KEY);
        // const { _id } = decodedData;

        console.log("in profile next step", req.body)

        const {_id} = req;
        const user = await User.findById(_id);

        if (user) {
            res.send(user)
        }
        else {
            throw new Error("User profile not found")
        }

    }
    catch (err) {
        res.status(400).send("Unable to fetch profile: " + err.message);
    }


})


app.patch("/update", async (req, res) => {

    const id = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, data, { returnDocument: "before", runValidators: "true" })

        console.log("updating user", user);

        if (user) {
            res.status(200).send("User updated successfully!");
        }
        else {
            res.status(200).send("User not found");
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong!");
    }

})

// app.listen(7777, connectDB, () => {
//     console.log("Successfully listening on port 7777");
// });


app.use("/xyz", (req, res, next) => {
    console.log("1st route handler");
    res.send("from 1st route");
    next();
    console.log("check the flow")
}, (req, res) => {
    console.log("2nd route handler");
    res.send("from 2nd route");
})

// app.use("/",(req, res) => {
//     res.send("server");
// })



// it is better to use try catch instead but the below method is also one way
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong! Final")
    }
})


// routing patterns
// "/abcd" || "/ab*cd" => * means that at the start ab should be present and at the end cd should be present and in between anything can come and same route will work
// "/ab?c" => this means b is optional => so "/ac" will aslo be the same route here as "/abc"
// "/ab+c" => b can come any number of time => "/abc" and "/abbbbbc" => both same
// "/a(bc)?d" => now bc is optional here => "/abcd" and "/ad" are same
// instead of string you can use regex as well in path and it will also work
// req.query will give the queryparmas passed in path
// "/user/:userId/:name" => req.params is used to get dynamic values in the path


// app.use("/xyz", (req, res, next) => {
//     console.log("1st route handler");
//     res.send("from 1st route");
//     next();
//     console.log("check the flow")
// }, (req, res) => {
//     console.log("2nd route handler");
//     res.send("from 2nd route");
// })

// output
// 1st route handler
// from 1st route - api response
// next will be called and it will go to second function
// 2nd route handler
// check the flow
// Then error - Cannot set headers after they are sent to the client (from express 5)

// res.status(401).send("unauthorized")



// app.use("/", (req, res)=>{})
// app.use("/", (req, res, next)=>{})
// app.use("/", (err, req, res, next)=>{}), here you can see that express manages params dynamically, if 2 params are there then first will be
// req and second will be res, if 3 are present then req, res and next and if there are 4 params then first will be error followed by req, res, next.


