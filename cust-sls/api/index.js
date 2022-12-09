'use strict';

const { Pool } = require('pg');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: process.env.PG_CONNECT_STRING,
  });
  // init table
  pool.query(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS "public"."rules" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v1(),
    "json" json NOT NULL,
    "add_time" timestamp(6) NOT NULL DEFAULT NOW(),
    "desc" varchar(64) COLLATE "pg_catalog"."zh_CN.utf8",
    PRIMARY KEY (id)
  );`);

  return pool;
}

const pool = initPgPool();

module.exports = {
  async getRuleList() {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select id,add_time from rules',
    });
    await client.end();
    return rows;
  },

  async createRule(rule) {
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO rules(json) VALUES($1)',
      values: [rule],
    });
    if(rowCount != 1)
      return await client.end();

    const { rows } = await client.query({
      text: 'select id from rules',
    });
    await client.end();
    return rows.slice().reverse()[0]['id'];
  },

  async getRuleById(id) {
    try {
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM rules WHERE id = $1',
        values: [id],
      });
      await client.end();
      if (rows.length > 0) {
        return rows[0];
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },

  async deleteRuleById(id) {
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM rules WHERE id = $1',
      values: [id],
    });
    await client.end();
    return rows == 1;
  },
};
