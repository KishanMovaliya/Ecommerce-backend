const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router();
const Productcheckout = require("../models/productcheckouts");
const Addtocart = require("../models/addtocarts");

//-----add product for checkout-----
router.post("/finalcheckout", verify, async (req, res) => {
  const userId = req.user._id;
  const { cartDetails } = req.body;
  const checkoutDetails = req.body.checkoutDetails;

  try {
    const dataExist = await Productcheckout.find({ userId: userId, status: 0 });
    if (dataExist.length > 0) {
      return res.json({ status: 200, data: "your ordered already booked." });
    } else {
      const checkoutData = new Productcheckout({
        addtocartId: cartDetails,
        userId: userId,
        name: checkoutDetails.name,
        address: checkoutDetails.address,
        contact: checkoutDetails.contact,
      });
      const data = await checkoutData.save();

      const upStatus = await Addtocart.find({
        _id: cartDetails,
        userId: userId,
      });

      if (upStatus) {
        upStatus.map(async (upstatus) => {
          const st = await Addtocart.findById(upstatus._id);
          st.status = 1;
          await st.save();
        });
      }
      return res.json({ status: 200, data: data });
    }
  } catch (error) {
    return res.json({ status: 400, msg: error });
  }
});

module.exports = router;
