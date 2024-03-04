const express = require("express");
const {
  getAllAdmins,
  updateAdmin,
  getAdminById,
  deleteAdmin,
  addAdmin,
} = require("../../shared/db/queries");
const { hashPassword } = require("../../shared/helpers/hash");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("pages/users", {
    users: await getAllAdmins(),
  });
});

router.get("/add", (req, res) => {
  res.render("pages/add-user", { user: {} });
});

router.post("/add", async (req, res) => {
  try {
    const user = req.body;
    user.email = null;
    user.password = await hashPassword(user.password);
    await addAdmin(user);
    res.redirect("/users");
  } catch (err) {
    let error;
    if (err.code == "ER_DUP_ENTRY") error = "username alredy exist";
    else error = "internal server error";
    res.render("pages/add-user", { user: req.body, error });
  }
});

router.get("/update/:id", async (req, res) => {
  const user = await getAdminById(req.params.id);
  if (user) {
    return res.render("pages/edit-user", { user });
  }
  res.redirect("/users");
});

router.post("/update/:id", async (req, res) => {
  if (!req.body.passwordChange) {
    delete req.body.password;
  } else {
    req.body.password = await hashPassword(req.body.password);
  }
  delete req.body.passwordChange;
  const user = await getAdminById(req.params.id);
  if (!user) {
    res.redirect("/users");
  }
  try {
    await updateAdmin(req.params.id, { ...req.body, email: null });
    res.redirect("/users");
  } catch (err) {
    let error;
    if (err.code == "ER_DUP_ENTRY") error = "username alredy exist";
    else error = "internal server error";
    res.render("pages/edit-user", { user: req.body, error });
  }
});

router.post("/delete/:id", async (req, res) => {
  await deleteAdmin(req.params.id);
  res.redirect("/users");
});

module.exports = router;
