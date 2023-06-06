const express = require("express");

const User = require("../models/user")

const router = express.Router();

router.get("/signin", (req,res)=>{
    return res.render("signin");
});

router.get("/signup", (req,res)=>{
    return res.render("signup");
});

router.post("/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
})

router.post("/signin", async(req, res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    const user = User.matchPassword(email, password);

    console.log("User :", user);
    return res.redirect("/");
})

module.exports = router;