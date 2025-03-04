const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,      // Host do banco
    port: process.env.DB_PORT,      // Porta do banco
    user: process.env.DB_USER,      // Usuário do banco
    password: process.env.DB_PASSWORD, // Senha do banco
    database: process.env.DB_DATABASE, // Nome do banco
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then(() => console.log("✅ Conectado ao MySQL!"))
    .catch(err => console.error("❌ Erro ao conectar ao MySQL:", err));

module.exports = pool;
