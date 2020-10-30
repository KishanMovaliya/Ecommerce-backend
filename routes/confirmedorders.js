const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const Addtocart = require("../models/addtocarts");
const Productcheckout = require("../models/productcheckouts");
const Product = require("../models/products");
const Register = require("../models/register");

//------find order of user-----
router.get("/userorder", verify, async (req, res) => {
  const userId = req.user._id;

  const userData = await Register.findById(userId);

  if (userData.status === 0) {
    const userOrder = await Productcheckout.find()
      .populate({
        path: "addtocartId",
        populate: [
          {
            path: "productId",
          },
        ],
      })
      .populate("userId");

    return res.json(userOrder);
  } else {
    return res.send({
      status: 400,
      msg: "You are not admin.",
    });
  }
});

//------changed track status------
router.post("/settrack", verify, async (req, res) => {
  const addtocartDetails = await Productcheckout.findById(req.body._id);

  try {
    if (addtocartDetails) {
      if (addtocartDetails.status === 0) {
        addtocartDetails.status = 1;
        const updateStatus = await addtocartDetails.save();

        return res.json({
          status: 200,
          msg: "status changed 0 to 1.",
        });
      } else if (addtocartDetails.status === 1) {
        addtocartDetails.status = 2;
        const updateStatus = await addtocartDetails.save();

        return res.json({
          status: 200,
          msg: "status changed 1 to 2.",
        });
      } else if (addtocartDetails.status === 2) {
        addtocartDetails.status = 3;
        addtocartDetails.delivered = true;
        const updateStatus = await addtocartDetails.save();

        return res.json({
          status: 200,
          msg: "status changed 2 to 3.",
          delivered: true,
        });
      }
      return res.json(addtocartDetails);
    } else {
      return res.send({
        status: 400,
        msg: "there is no any order.",
      });
    }
  } catch (error) {
    return res.send({
      status: 400,
      msg: error,
    });
  }
});

//----get tracking status for user----
router.get("/usertrack", verify, async (req, res) => {
  const userId = req.user._id;
  try {
    const trackData = await Productcheckout.find({ userId: userId })
      .populate({
        path: "addtocartId",
        populate: [
          {
            path: "productId",
          },
        ],
      })
      .populate("userId");
    return res.json(trackData);
  } catch (error) {
    return res.send({
      status: 400,
      msg: error,
    });
  }
});

module.exports = router;
