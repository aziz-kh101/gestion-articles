module.exports = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.redirect("/auth/sign-in");
  }
  res.locals.currentUser = user;
  next();
};
