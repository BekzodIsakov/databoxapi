const express = require("express");
const { Brand } = require("../models");

const router = new express.Router();

router.get("/", async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.send(brands);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();

    res.status(201).send({ message: "New brand created!", brand: newBrand });
  } catch (error) {
    if (error.code === 11000) {
      const customError = new Error("Brand already exists!");
      customError.status = 400;
      next(customError);
    } else {
      next(error);
    }
  }
});

module.exports = router;
