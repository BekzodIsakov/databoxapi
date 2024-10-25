const express = require("express");
const router = new express.Router();
const { ProductModel } = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
