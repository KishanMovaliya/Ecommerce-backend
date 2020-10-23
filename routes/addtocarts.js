const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router();
const Addtocart = require("../models/addtocarts");

//------add to cart product by user------
router.get("/:productId/:userId", verify, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;

  if (userId === req.user._id) {
    return res.json({
      verifiedId: req.user._id,
      productId: req.params.productId,
      userId: req.params.userId,
    });
  } else {
    return res.json({
      status: 400,
      msg: "UserId not matched",
    });
  }
});

module.exports = router;
