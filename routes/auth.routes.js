const exporess = require("express");
const User = require("../models/User.js");

const router = exporess.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ email });
    if (!user) return res.send("User not found");

    const valid = await user.comparePassword(password);
    if (!valid) return res.send("Invalid email or password");

    req.session.userId = user.id;

    res.redirect("/");
  } catch (error) {
    console.error("Failed while logging in: " + error.message);
    res.send("Server side failure while trying to login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res.send("Passwords do not match");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send("Email already in use");
  }

  const user = new User({ email, password });
  await user.save();

  req.session.userId = user._id;
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
