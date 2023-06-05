const User = require("../models/user")

async function handelGetAllUsers(req,res){
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function handelGetUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).json({err: "user not found"});
    return res.json(user);
}

async function handelUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "Pandit"})
    return res.json({ status: "Sucess" });
}

async function handelDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Sucess" });
}

async function createNewUser(req,res){
    const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.Job_tittle
  ) {
    return res.status(400).json({ msg: "All field are require" });
  }

 const result =  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    Email: body.email,
    Gender: body.gender,
    JobTitle: body.Job_tittle
  });

  console.log(result);
  return res.status(201).json({msg: "Sucess", id: result._id});
}

module.exports ={
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    createNewUser,
}