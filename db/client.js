const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://fwjgghwv:cLg5AQR70tpFK8S-gXEn-ZUl0Zk2_m0I@mahmud.db.elephantsql.com/fwjgghwv";

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;