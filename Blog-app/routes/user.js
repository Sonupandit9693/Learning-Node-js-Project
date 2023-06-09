const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenrateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } 
  catch (error) {
    return res.render('signin', {
        error: "InCorrect Email and password",
    })
  }
});

router.get("/logout", (req,res)=>{
  return res.clearCookie("token").redirect("/");
})

module.exports = router;
