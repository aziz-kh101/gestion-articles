/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const user = await knex("users").where({ email: "aaaa@mail.com" }).first();
  await knex("subscription").del();
  await knex("subscription").insert([
    {
      start: "2024-03-04",
      end: "2024-03-30",
      createdBy: user.id,
    },
  ]);
};
