const User = require("../models/User.js");

async function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.redirect("/login");
    }
    next();
  } catch (error) {
    res.send("Error: " + error.message);
  }
}

module.exports = requireAuth;
