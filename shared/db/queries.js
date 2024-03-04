const knex = require("./knex");

const queries = {
  /**
   * @returns { Promise<any> }
   */
  getAllAdmins() {
    return knex("users").where({ role: "ADMIN" });
  },
  getAdminById(id) {
    return knex("users").where({ id, role: "ADMIN" }).first();
  },
  getSubscribtion(id) {
    let now = new Date();
    now = now.toISOString().split("T")[0];
    return knex("subscription")
      .where({ createdBy: id })
      .andWhere("start", "<=", now)
      .andWhere("end", ">=", now)
      .orderBy("created_at", "desc")
      .first();
  },
  /**
   * @param { any } article
   * @returns { Promise<any> }
   */
  getUser(username) {
    return knex("users")
      .where({ username })
      .andWhere(function () {
        this.where({ role: "ADMIN" }).orWhere({ role: "SUPER_ADMIN" });
      })
      .first();
  },
  getUserByEmail(email) {
    return knex("users").where({ email, role: "USER" }).first();
  },
  addAdmin(user) {
    user.role = "ADMIN";
    return knex("users").insert(user);
  },
  /**
   * @param { number } id
   * @param { any } user
   * @returns { Promise<any> }
   */
  updateAdmin(id, user) {
    return knex("users").where({ id, role: "ADMIN" }).update(user);
  },
  /**
   * @param { number } id
   * @returns { Promise<any> }
   */
  deleteAdmin(id) {
    return knex("users").where({ id, role: "ADMIN" }).del();
  },
  /**
   * @param { number } page
   * @returns { Promise<any> }
   */
  getArticles(limit, offset) {
    return knex("articles as a")
      .select({
        id: "a.id",
        title: "a.title",
        description: "a.description",
        isPremium: "a.isPremium",
        createdBy: "u.username",
      })
      .leftJoin("users as u", "a.createdBy ", "u.id")
      .offset(offset)
      .limit(limit);
  },
  /**
   * @param { number } id
   * @returns { Promise<any> }
   */
  getArticleById(id) {
    return knex("articles as a")
      .select({
        id: "a.id",
        title: "a.title",
        description: "a.description",
        content: "a.content",
        isPremium: "a.isPremium",
        createdBy: "u.username",
      })
      .leftJoin("users as u", "a.createdBy ", "u.id")
      .where({ "a.id": id })
      .first();
  },
  /**
   * @returns { Promise<any> }
   */
  getArticlesCount() {
    return knex("articles").count({ count: "*" }).first();
  },
  /**
   * @param { any } article
   * @returns { Promise<any> }
   */
  addArticle(article) {
    return knex("articles").insert(article);
  },
  /**
   * @param { number } id
   * @param { any } article
   * @returns { Promise<any> }
   */
  updateArticle(id, article) {
    return knex("articles").where({ id }).update(article);
  },
  /**
   * @param { number } id
   * @returns { Promise<any> }
   */
  deleteArticle(id) {
    return knex("articles").where({ id }).del();
  },
};

module.exports = queries;
