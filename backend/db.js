const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://portfolio_ruts_user:MNkss2ULvOvXsHPxbTho4DdLZ0HYC5oL@postgresql://portfolio_ruts_user:MNkss2ULvOvXsHPxbTho4DdLZ0HYC5oL@dpg-cv3j8odds78s73becqm0-a/portfolio_ruts.render.com:5432/portfolio_db",
  ssl: { rejectUnauthorized: false }, // Necessário para conexão segura
});

module.exports = pool;
