const express = require("express");
const router = new express.Router();
const { ProductModel } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
