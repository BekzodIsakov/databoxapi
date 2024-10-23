const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// Load environment-specific .env files
if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
} else if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config({ path: ".env.local" }); // Default to local development
}

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || "localhost";

const app = express();

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(port, hostname, () => {
  console.log(`Server is live on ${hostname}:${port}`);
});
