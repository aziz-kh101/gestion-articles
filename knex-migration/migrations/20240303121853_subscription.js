/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("articles", (table) => {
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.schema.createTable("subscription", (table) => {
        table.increments("id");
        table.date("start");
        table.date("end");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.integer("createdBy").unsigned();
        table
          .foreign("createdBy")
          .references("id")
          .inTable("users")
          .onDelete("cascade");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("subscription").then(() => {
    return knex.schema.alterTable("articles", (table) => {
      table.dropColumn("created_at");
    });
  });
};
