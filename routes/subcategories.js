const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/categories");
const Subcategory = require("../models/subcategories");

//-----create subcategory---
router.post("/create/:id", async (req, res) => {
  //---Check Sub Category exist or not---
  const subcategoryExist = await Subcategory.findOne({
    subcategory: req.body.subcategory,
  });
  if (subcategoryExist)
    return res.status(400).json({ msg: "Category Already Exist" });

  const newsubcategory = new Subcategory({
    categoryId: mongoose.Types.ObjectId(req.params.id),
    subcategory: req.body.subcategory,
  });
  try {
    const s = await newsubcategory.save();
    return res.json(s);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

//-----select subcategory-----
router.get("/selectall", async (req, res) => {
  try {
    const all = await Subcategory.find().populate("categoryId");
    return res.json(all);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

//-----select sub category id wise-----
router.get("/select/:id", async (req, res) => {
  try {
    const c = await Subcategory.findById(req.params.id);
    return res.json(c);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

//-----select sub category using category id-----
router.get("/usecategoryid/:id", async (req, res) => {
  try {
    const c = await Subcategory.find({ categoryId: req.params.id });
    return res.json(c);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

//-----delete sub category-----
router.delete("/delete/:id", async (req, res) => {
  try {
    const del = await Subcategory.findById(req.params.id);
    await del.deleteOne();
    return res.status(200).send({ msg: "Deleted Successfully" });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

//-----update sub category-----
router.put("/update/:id", async (req, res) => {
  try {
    const up = await Subcategory.findById(req.params.id);

    up.subcategory = req.body.subcategory;

    const upSuccess = await up.save();

    return res.status(200).send(upSuccess);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});

module.exports = router;
