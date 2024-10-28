const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: [
        "electronics",
        "clothing",
        "home",
        "books",
        "toys",
        "beauty",
        "sports",
        "other",
      ],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "Product image" },
      },
    ],
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

// name: Name of the product, trimmed to avoid unnecessary whitespace.
// description: Detailed information about the product.
// price: Product price in the smallest currency unit; min enforces non-negative values.
// category: Classifies the product; using enum limits it to specific categories.
// stock: Available quantity of the product in inventory.
// images: Array of objects with image URLs and optional alt text.
// brand: Brand name, useful for filtering or searching by brand.
// ratings: Average rating, capped between 0 and 5.
// reviews: Array of review objects, each tied to a user with a rating, comment, and timestamp.
// isFeatured: Indicates if a product is highlighted or on promotion.
// discount: Discount percentage applied to the product, useful for sales or promotions.
// tags: Array of strings to add searchable tags for the product.
// createdAt and updatedAt: Timestamps for when the product was added or last updated.
