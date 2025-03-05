const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "ballast.proxy.rlwy.net",
  port: 51895,
  user: "root",
  password: "wSOnTWnTDGpyJcBoPAHskWxYTFASLtrQ",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado ao banco de dados!");
    connection.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
  }
}

testConnection();