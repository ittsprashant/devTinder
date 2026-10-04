const express = require("express");

const app = express();


// GET calls = app.get will only be eligible for GET calls
app.get("/user", (req, res) => {
    res.send({firstName: "Prashant"})
} )


// app.use will handle all HTTP methods
app.use("/hello",(req, res) => {
    res.send("Hello world");
})

app.use("/",(req, res) => {
    res.send("server");
})

app.listen(7777, () => {
    console.log("Successfully listening on port 3000");
});


// routing patterns
// "/abcd" || "/ab*cd" => * means that at the start ab should be present and at the end cd should be present and in between anything can come and same route will work
// "/ab?c" => this means b is optional => so "/ac" will aslo be the same route here as "/abc"
// "/ab+c" => b can come any number of time => "/abc" and "/abbbbbc" => both same
// "/a(bc)?d" => now bc is optional here => "/abcd" and "/ad" are same
// instead of string you can use regex as well in path and it will also work
// req.query will give the queryparmas passed in path
// "/user/:userId/:name" => req.params is used to get dynamic values in the path

