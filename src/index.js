const express = require("express");
const { productsRouter, categoriesRouter, brandsRouter } = require("./routers");
require("./mongoose");
require("./dotenv-config");

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || "localhost";

const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/brands", brandsRouter);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400);
    res.send({
      success: false,
      message: "Validation Error",
      errors: err.errors, // Contains details of each invalid field
    });
  } else {
    res.status(err.status || 500);
    res.send({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is live on ${hostname}:${port}`);
});
