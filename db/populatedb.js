#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");
const { continents, items } = require("./countries");

const queries = [
  `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (16) NOT NULL
);
`,
  ...continents.map(() => {
    return "INSERT INTO categories (name) VALUES ($1);";
  }),
  `
  CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (64) NOT NULL,
  price_cents INTEGER NOT NULL,
  category_id INTEGER,
  FOREIGN KEY(category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);
  `,
  ...items.map(() => {
    return "INSERT INTO items (name, price_cents, category_id) VALUES ($1, $2, $3);";
  }),
];

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.POSTGRES_DATABASE_URL,
  });
  await client.connect();
  let continent = 0;
  let item = 0;
  for (const query of queries) {
    const queryValue = query.includes("INSERT INTO categories")
      ? [continents[continent++]]
      : query.includes("INSERT INTO items")
        ? [...items[item++]]
        : undefined;
    await client.query(query, queryValue);
  }
  await client.end();
  console.log("done");
}

main();
