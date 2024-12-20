const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      min: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      // required: true,
      default: 15.99,
      min: 0,
    },
    category: {
      type: String,
      // required: true,
      default: "other",
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
      // required: true,
      default: 5,
      min: 0,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          alt: { type: String, default: "Product image" },
        },
      ],
      default: [],
    },
    brand: {
      type: String,
      // required: true,
      default: "Brand name",
      trim: true,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, trim: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
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
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const count = await this.constructor.countDocuments();
      this.id = count + 1;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

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
