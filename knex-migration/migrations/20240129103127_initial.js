/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("firstName", 255);
    table.string("lastName", 255);
    table.string("email", 255).unique();
    table.string("username", 255).unique();
    table.string("password", 255).notNullable();
    table.enum("role", ["SUPER_ADMIN", "ADMIN", "USER"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
