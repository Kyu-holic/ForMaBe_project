const router = require("express").Router();
const Category = require("../models/Category");                   

router.post("/", async (req, res) => {
  try {
    const category = await new Category(req.body).save();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories)
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
