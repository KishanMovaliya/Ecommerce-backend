const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router();
const Productcheckout = require("../models/productcheckouts");

//-----add product for checkout-----
router.post("/finalcheckout", verify, async (req, res) => {
  const userId = req.user._id;

  return res.json({ status: 200, msg: req.user._id });
});

module.exports = router;
