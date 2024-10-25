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

// Post request doesn't in fact create anything, it just an immmitation
router.post("/", async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    await product.validate();
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
