const express = require("express");
const { getUser } = require("../../shared/db/queries");
const router = express.Router();
const { verifPassword } = require("../../shared/helpers/hash");

router.get("/sign-in", (req, res) => {
  res.render("pages/sign-in");
});

router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user || !(await verifPassword(password, user.password))) {
    return res.render("pages/sign-in", {
      error: "username or password incorrect",
    });
  }
  req.session.user = user;
  res.redirect("/");
});

module.exports = router;
