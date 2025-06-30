const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./router/birthdayRouter");
const path = require("path");

app.use(express.json());    //for convert form data
app.use(express.urlencoded({extended: true}));    //convert urls string

app.use("/api/home", userRouter);

app.set("view engine", "ejs");

app.set("views" , 
    path.join(__dirname, "views")
); 

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running...");
    console.log("http://localhost:3000/api/home/");
});