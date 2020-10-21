const express = require("express");
const router = express.Router();
const Register = require("../models/register");
const bcrypt = require("bcrypt");


//------Get User------
router.get("/user",  async (req, res) => {
    try {
      const userdata = await Register.find();
      return res.json(userdata);
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  });

//------Create User------
router.post("/create",  async (req, res) => {
    //---check email exists or not---
    const emailExists = await Register.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    //password into hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const register = new Register({
      email: req.body.email,
      password: hashPassword,
      status: req.body.status,
    });
    try {
      const r = await register.save();
      return res.json(r);
    } catch (error) {
      return res.status(400).send({ msg: error });
    }
  });

module.exports = router;
