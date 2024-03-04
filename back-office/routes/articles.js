const express = require("express");
const {
  getArticles,
  getArticlesCount,
  addArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
} = require("../../shared/db/queries");
const router = express.Router();

const LIMIT = 20;

router.get("/", async (req, res) => {
  const page = isNaN(parseInt(req.query.page)) ? 1 : +req.query.page;
  const limit = LIMIT;
  const offset = LIMIT * (page - 1);
  const count = Math.ceil((await getArticlesCount()).count / LIMIT);

  res.render("pages/articles", {
    articles: await getArticles(limit, offset),
    pageNumber: page,
    pages: Array.from({ length: count }, (_, x) => x + 1),
  });
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const article = await getArticleById(id);
  if (!article) {
    res.redirect("/articles");
  }

  res.render("pages/article-details", {
    article,
  });
});

router.get("/add", (req, res) => {
  res.render("pages/add-article", { article: {} });
});

router.post("/add", async (req, res) => {
  try {
    const article = req.body;
    article.createdBy = req.session.user.id;
    await addArticle(article);
    res.redirect("/articles");
  } catch (err) {
    console.log(err);
    let error;
    if (err.code == "ER_DUP_ENTRY") error = "title alredy exist";
    else error = "internal server error";
    res.render("pages/add-article", { article: req.body, error });
  }
});

router.get("/update/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (article) {
    return res.render("pages/edit-article", { article });
  }
  res.redirect("/articles");
});

router.post("/update/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (
    !article ||
    (article.createdBy !== req.session.user.id &&
      req.session.user.role !== "SUPER_ADMIN")
  ) {
    res.redirect("/articles");
  }
  try {
    await updateArticle(req.params.id, {
      ...req.body,
      createdBy: req.session.user.id,
    });
    res.redirect("/articles");
  } catch (err) {
    let error;
    if (err.code == "ER_DUP_ENTRY") error = "title alredy exist";
    else error = "internal server error";
    res.render("pages/edit-article", { article: req.body, error });
  }
});

router.post("/delete/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (
    !article ||
    (article.createdBy !== req.session.user.id &&
      req.session.user.role !== "SUPER_ADMIN")
  ) {
    res.redirect("/articles");
  }
  await deleteArticle(req.params.id);
  res.redirect("/articles");
});

module.exports = router;
