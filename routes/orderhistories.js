const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const Productcheckout = require("../models/productcheckouts");
const Orderhistory = require("../models/orderhistories");
const mongoose = require("mongoose");

//----order moved from checkout to the history---
router.post("/movetohistory", verify, async (req, res) => {
  const userId = req.user._id;
  try {
    const deliveredData = await Productcheckout.find({
      userId: userId,
      delivered: true,
    });
    let moveddata;
    if (deliveredData) {
      deliveredData.map(async (deliveredData) => {
        const deleteData = await deliveredData.deleteOne();

        const orderhistory = new Orderhistory({
          addtocartId: deliveredData.addtocartId,
          userId: deliveredData.userId,
          name: deliveredData.name,
          address: deliveredData.address,
          contact: deliveredData.contact,
          delivered: deliveredData.delivered,
        });
        moveddata = await orderhistory.save();
      });
      return res.json(moveddata);
    }
  } catch (error) {
    return res.json({ status: 400, msg: error });
  }
});

module.exports = router;
