/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("articles", function (table) {
    table.increments("id");
    table.string("title", 255).notNullable().unique();
    table.text("description").notNullable();
    table.text("content").notNullable();
    table.boolean("isPremium");
    table.integer("createdBy").unsigned();
    table
      .foreign("createdBy")
      .references("id")
      .inTable("users")
      .onDelete("set null");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
