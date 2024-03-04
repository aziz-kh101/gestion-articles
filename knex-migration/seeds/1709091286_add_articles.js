const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 32,
    min: 8,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("articles").del();
  const superAdmin = await knex("users").where({ role: "SUPER_ADMIN" }).first();
  const articles = [];
  for (let index = 1; index <= 100; index++) {
    articles.push({
      title: `article title ${index}`,
      description: lorem.generateSentences(2),
      content: lorem.generateParagraphs(2),
      isPremium: Math.round(Math.random()) == 1,
      createdBy: superAdmin.id,
    });
  }
  await knex("articles").insert(articles);
};
