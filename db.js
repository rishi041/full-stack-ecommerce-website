const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://vfsksgtw:mTp6pCmtCLx2AOfH9-qCEMfdQpOnRnhr@rajje.db.elephantsql.com/vfsksgtw",
  ssl: process.env.DATABASE_URL ? true : false,
});

module.exports = pool;
