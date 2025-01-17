const express = require("express");
const { connection } = require("./config/db");
const app = express();
const bcrypt = require("bcrypt");
const { UserModel } = require("./models/User.module.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
app.get("/", async (req, res) => {
  res.send("BASE URL ENDPOINT");
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) {
      res.send("signup failed");
    } else {
      await UserModel.create({ email, password: hash });
      res.send("signup successfull");
    }
  });
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const hash = user?.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        var token = jwt.sign({ userId: user._id }, process.env.Secret_KEY);
        res.send({ msg: "login successfull", token });
      } else {
        res.send({ msg: "login failed", err });
      }
    });
  });
app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Listinig on port 8000");
  } catch (error) {
    console.log(error);
  }
});
