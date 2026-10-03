const express = require("express");

const app = express();




app.use("/hello",(req, res) => {
    res.send("Hello world");
})

app.use("/",(req, res) => {
    res.send("server");
})

app.listen(7777, () => {
    console.log("Successfully listening on port 3000");
});




