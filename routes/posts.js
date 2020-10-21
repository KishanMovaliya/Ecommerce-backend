const express = require("express");
const router = express.Router();
const Register = require("../models/register");
const verify = require("../middleware/verifyToken");

//successfull logged in and posts data into dashboard
router.get("/loggeddata", verify,async (req, res) => {
    const data = await Register.findOne({ _id: req.user._id });
    return res.send(data);
  });

module.exports = router;
