const express = require("express");
const {connectMongoDB} = require("./connection")
const {logReqres} = require("./middlewares")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;
// connection
connectMongoDB("mongodb://127.0.0.1:27017/test").then(()=>{
    console.log({message: "MongoDB Connected"});
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqres("log.txt"));

// routes
app.use("/api/users", userRouter);


app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
