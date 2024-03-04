const express = require("express");
const { getUserByEmail } = require("../../shared/db/queries");
const router = express.Router();
const { verifPassword } = require("../../shared/helpers/hash");

router.get("/sign-in", (req, res) => {
  res.render("pages/sign-in", { userText: "Email", userField: "email" });
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await getUserByEmail(email);
  if (!user || !(await verifPassword(password, user.password))) {
    return res.render("pages/sign-in", {
      error: "email or password incorrect",
    });
  }
  req.session.user = user;
  res.redirect("/");
});

module.exports = router;
