const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const Products = require("../models/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject file
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
  
//----create product----
router.post("/create/:categoryId/:subcategoryId", upload.array("images", 10), async (req, res) =>  {

  if (!req.files) return res.send("please select file");

  const newProduct = new Products({
    categoryId: mongoose.Types.ObjectId(req.params.categoryId),
    subcategoryId: mongoose.Types.ObjectId(req.params.subcategoryId),
    images: req.files.path,
    title: req.body.title,
    descriptions: req.body.descriptions,
    price: req.body.price,
  });
  try {
    const product = await newProduct.save();
    return res.json(product);
  } catch (error) {
    return  res.send({ status: 400,msg: error.message });
  } 
});

//----select product----
router.get("/selectAll", async (req, res) =>  {

  try {
    const product = await Products.find().sort({_id: -1});
    return res.json(product);
  } catch (error) {
    return  res.send({ status: 400,msg: error.message });
  } 
});

//----delete product----
router.delete("/deleteproduct/:id", async(req,res) => {
  const id = req.params.id;

  const data = await Products.findById(id);

  try {
    if(data){
      if(data.images){
        console.log(data.images);
        fs.unlink(data.images, (err) => {
          if (err) throw err;
        });
      }
      const deleteData = await data.deleteOne();
      return res.json(deleteData);
    }
  } catch (error) {
    console.log(error);
    return  res.send({ status: 400,msg: error.message });
  } 
});

module.exports = router
