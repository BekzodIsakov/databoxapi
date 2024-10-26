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
