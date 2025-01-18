const express = require("express");
const LoginRouter = express.Router();
LoginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).send({ msg: "User not found" });
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      var token = jwt.sign({ userId: user._id }, process.env.Secret_KEY);
      res.status(200).send({ msg: "Login successful", token });
    } else {
      res.status(400).send({ msg: "Login failed" });
    }
  });
});
module.exports = { LoginRouter };
