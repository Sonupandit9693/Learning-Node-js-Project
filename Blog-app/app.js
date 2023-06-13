require("dotenv").config();
const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")
const cookieparser = require("cookie-parser");
const { chekForAuthenticationCookie } = require("./middlewares/authentication");

const Blog = require("./models/blog")

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then((e)=>{
    console.log("mongoDb connected");
}).catch((error)=>{
    console.log(error.message);
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(chekForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async(req,res)=>{
    const allblogs = await Blog.find({});
    return res.render("home",{
        user: req.user,
        blogs: allblogs,
    })
})

app.listen(PORT , ()=> console.log(`server started at port on ${PORT}`));