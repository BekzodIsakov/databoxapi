const express = require("express");
const path = require("path");
const { productsRouter, categoriesRouter, brandsRouter } = require("./routers");
require("./mongoose");
require("./dotenv-config");

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || "localhost";

// const viewsDirPath = path.join(__dirname, "../templates/views")

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
// app.use("views", viewsDirPath);

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/brands", brandsRouter);

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

app.get("/", (_, res) => {
  res.render("index", { title: "Home", message: "Databoxapi" });
});

app.get("/about", (_, res) => {
  res.render("about", { title: "About" });
});

app.listen(port, hostname, () => {
  console.log(`Server is live on ${hostname}:${port}`);
});
