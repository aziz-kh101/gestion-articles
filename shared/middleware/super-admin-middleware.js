module.exports = (req, res, next) => {
  const { user } = req.session;
  if (user.role !== "SUPER_ADMIN") {
    return res.redirect("/");
  }
  next();
};
