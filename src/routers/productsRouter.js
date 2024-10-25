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

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    product.set(req.body); // Merge the new data into the product instance
    await product.validate(); // Validate the merged data without saving

    res.send(product);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    product.set(req.body); // Merge the new data into the product instance
    await product.validate(); // Validate the merged data without saving

    res.send(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      const error = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    res.send({ message: "Deleted successfully!", product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
