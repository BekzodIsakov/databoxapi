const express = require("express");
const { Category } = require("../models");

const router = new express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const newCategory = new Category(req.body);
//     await newCategory.save();

//     res
//       .status(201)
//       .send({ message: "New category created!", category: newCategory });
//   } catch (error) {
//     if (error.code === 11000) {
//       const customError = new Error("Category already exists!");
//       customError.status = 400;
//       next(customError);
//     } else {
//       next(error);
//     }
//   }
// });

module.exports = router;
