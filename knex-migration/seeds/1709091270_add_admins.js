const { hashPassword } = require("../helpers/hash");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert({
    firstName: "aziz",
    lastName: "kh",
    email: null,
    username: "azizkh101",
    password: await hashPassword("123456"),
    role: "SUPER_ADMIN",
  });
  await knex("users").insert({
    firstName: "admin1",
    lastName: "admin1",
    email: null,
    username: "admin1",
    password: await hashPassword("123456"),
    role: "ADMIN",
  });
  await knex("users").insert({
    firstName: "admin2",
    lastName: "admin2",
    email: null,
    username: "admin2",
    password: await hashPassword("123456"),
    role: "ADMIN",
  });
  await knex("users").insert({
    firstName: "admin3",
    lastName: "admin3",
    email: null,
    username: "admin3",
    password: await hashPassword("123456"),
    role: "ADMIN",
  });
  await knex("users").insert({
    firstName: "aaaa",
    lastName: "aaaa",
    email: "aaaa@mail.com",
    username: null,
    password: await hashPassword("123456"),
    role: "USER",
  });
  await knex("users").insert({
    firstName: "bbbb",
    lastName: "bbbb",
    email: "bbbb@mail.com",
    username: null,
    password: await hashPassword("123456"),
    role: "USER",
  });
};
