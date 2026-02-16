const session = require('express-session')

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
})

module.exports = sessionConfig