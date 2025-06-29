const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("../birthdaysurprise/router/birthday");
const path = require("path");

app.use("/api/home", userRouter);

app.set("view engine", "ejs");

// app.set("views" , 
//     path.join(__dirname, "views")
// ); 
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT;
console.log("Port: ", PORT)
app.listen(PORT, () => {
    console.log("Server running...");
});