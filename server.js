require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./config/database.js");
const sessionConfig = require("./config/session");

const requireAuth = require("./middleware/requireAuth.js");
const authRoutes = require("./routes/auth.routes.js");
const noteRoutes = require("./routes/note.routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(authRoutes);
app.use(noteRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
