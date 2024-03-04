module.exports = (req, res, next) => {
  const { user } = req.session;
  if (user) {
    res.locals.currentUser = user;
  }
  next();
};
