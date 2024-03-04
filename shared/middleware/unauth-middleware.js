module.exports = (req, res, next) => {
  if (req.session.user) {
    return req.redirect("/");
  }
  next();
};
