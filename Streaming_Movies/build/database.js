"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV, POSTGRES_TEST_DB } = process.env;
const databases = { dev: POSTGRES_DB, test: POSTGRES_TEST_DB };
const pool = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: NODE_ENV ? databases[NODE_ENV] : "dev",
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
exports.default = pool;
