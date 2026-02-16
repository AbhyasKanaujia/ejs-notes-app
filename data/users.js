const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

module.exports = users;
