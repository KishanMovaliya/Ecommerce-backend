const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Register = require("../models/register");

//----Login User----
router.post("/success", async (req, res) => {
  //check email exist or not
  const emailExists = await Register.findOne({ email: req.body.email });
  if (!emailExists)
    return res.json({
      status: 400,
      msg: "Email is not found, please register first",
    });

  //check password match or not
  const validPass = await bcrypt.compare(
    req.body.password,
    emailExists.password
  );
  if (!validPass) return res.json({ status: 400, msg: "Invalid Password" });

  //create and assign token
  const token = jwt.sign({ _id: emailExists._id }, process.env.TOKEN);
  return res.send(token);
});

module.exports = router;
