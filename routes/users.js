var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User=require('../models/user');
const authmid=require('../middlewares/auth')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});

router.get('/signup',(req,res)=>{
  res.render("signup",{layout:false});
})

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      number: req.body.number,
    });
    await user.save();
    return res.redirect("/users/login")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

router.get("/login",(req,res)=>{
  res.render("login",{layout:false})
})

router.post("/login",async (req,res)=>{
  let user= await User.findOne({email:req.body.email});

  if(user){
    const password=await bcrypt.compare(req.body.password,user.password)

    if(!password){
      return res.redirect("/users/login")
    }

  }
  else return res.redirect("/users/login")
  req.session.user=user

  return res.redirect("/")
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;