const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router();
const Addtocart = require("../models/addtocarts");
const Product = require("../models/products");

//------add to cart product by user using product id------
router.post("/add/:productId", verify, async (req, res) => {
  const productId = req.params.productId;

  const productExist = await Product.findById(productId);

  if (req.user._id) {
    const cartExist = await Addtocart.find({
      productId: productId,
      userId: req.user._id,
    });

    if (cartExist.length === 0) {
      const addtocart = new Addtocart({
        productId: productId,
        userId: req.user._id,
      });
      const data = await addtocart.save();
      return res.json({ status: 200, data: data });
    } else {
      return res.json({
        status: 200,
        msg: "It is already in your crat.",
        data: cartExist,
      });
    }
  } else {
    return res.json({
      status: 400,
      msg: "UserId not matched",
    });
  }
});

//----get user's add to cart product details----
router.get("/productdetails", verify, async (req, res) => {
  const userId = req.user._id;
  // let addedtocart;
  try {
    const productdetails = await Addtocart.find({ userId: userId }).populate({
      path: "productId",
      populate: [
        {
          path: "categoryId",
        },
        {
          path: "subcategoryId",
        },
      ],
    });
    // .populate("categoryId");

    return res.json({
      status: 200,
      data: productdetails,
    });
  } catch (err) {
    return res.json({
      status: 400,
      msg: err,
    });
  }
});

//-----delete product from user cart-----
router.delete("/deletefromcart/:addtocartID", verify, async (req, res) => {
  try {
    const addtocartDetails = await Addtocart.findById(req.params.addtocartID);

    const deleted = await addtocartDetails.deleteOne();

    return res.json({
      status: 200,
      data: deleted,
    });
  } catch (err) {
    return res.json({
      status: 400,
      msg: err,
    });
  }
});

module.exports = router;
