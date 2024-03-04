const express = require("express");
const {
  getArticles,
  getArticlesCount,
  getArticleById,
  getSubscribtion,
} = require("../../shared/db/queries");
const authMiddleware = require("../../shared/middleware/auth-middleware");
const userCheckMiddleware = require("../../shared/middleware/user-check-middleware");
const router = express.Router();
const createError = require("http-errors");

router.get("", userCheckMiddleware, async (req, res) => {
  LIMIT = 20;
  const page = isNaN(parseInt(req.query.page)) ? 1 : +req.query.page;
  const limit = LIMIT;
  const offset = LIMIT * (page - 1);
  const count = Math.ceil((await getArticlesCount()).count / LIMIT);
  console.log("true");

  res.render("pages/articles", {
    articles: await getArticles(limit, offset),
    pageNumber: page,
    pages: Array.from({ length: count }, (_, x) => x + 1),
  });
});

router.get("/details/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const article = await getArticleById(id);
  if (!article) {
    res.redirect("/"); // ! to be change
  }

  const subscription = await getSubscribtion(req.session.user.id);

  console.log(article.isPremium, subscription);

  if (article.isPremium == 1 && !subscription) {
    try {
      next(createError(401));
    } catch (err) {}

    return;
  }

  res.render("pages/article-details", {
    article,
  });
});

module.exports = router;
