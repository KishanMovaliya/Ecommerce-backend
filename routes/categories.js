const express = require("express")
const router = express.Router();
const Category = require("../models/categories");
const Subcategories = require("../models/subcategories");

//----create category----
router.post("/create",  async(req, res) => {
    //---Check Category exist or not---
    const categoryExist = await Category.findOne({ category: req.body.category });
    if (categoryExist) return res.status(400).json({ msg: "Category Already Exist" });
    
    // -----Create Category-----
    const newCategory = new Category({
      category: req.body.category,
    });
    try {
      const category = await newCategory.save();
      return res.json(category);
    } catch (error) {
      return  res.status(400).send({ msg: error });
    } 
  })

//-----select category id wise-----
router.get("/select/:id", async(req,res) => {
    try {
      const c = await Category.findById(req.params.id);
      return res.json(c);
    } catch (error) {
      return  res.status(400).send({ msg: error });
    }
  })

//-----select all category-----
router.get("/selectall", async(req,res) => {
    try {
      const c = await Category.find();
      return res.json(c);
    } catch (error) {
      return  res.status(400).send({ msg: error });
    }
  })

//-----delete category-----
router.delete("/delete/:id",async(req,res) => {

    try{
      const del = await Category.findById(req.params.id);
      await del.deleteOne();

      if(del){
        const delSub = await Subcategories.find({categoryId: del._id});
        delSub.map(async (deleSub) => {
          await deleSub.deleteOne();
        })
      }
      return res.status(200).send({msg: "Deleted Successfully"});
    }catch(error){
      return  res.status(400).send({ msg: error });
    }
  })

//-----update category-----
router.put("/update/:id", async(req,res) => {
    try{
      const up = await Category.findById(req.params.id);
      
      up.category = req.body.category;

      const upSuccess = await up.save();

      return res.status(200).send(upSuccess);
    }catch(error){
      return  res.status(400).send({ msg: error });
    }
  })

module.exports = router
