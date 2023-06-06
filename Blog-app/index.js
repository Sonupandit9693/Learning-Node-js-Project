const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{
    console.log("mongoDb connected");
}).catch((error)=>{
    console.log(error.message);
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.use("/user", userRouter);

app.get("/", (req,res)=>{
    return res.render("home")
})

app.listen(PORT , ()=> console.log(`server started at port on ${PORT}`));