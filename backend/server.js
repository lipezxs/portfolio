import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // Carregar variáveis do .env

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "https://lipezxs.vercel.app", // Permitir frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Configuração do banco de dados usando Pool de Conexões (melhor para produção)
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Certifique-se de definir isso no Render
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Testar a conexão com o banco de dados
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
  } else {
    console.log("✅ Conectado ao MySQL com sucesso!");
    connection.release(); // Liberar conexão de teste
  }
});

// Rota para receber dados do formulário
app.post("/about", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("📩 Recebendo dados:", req.body); // Log para verificar os dados recebidos

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const query = "INSERT INTO contatos (name, email, subject, message) VALUES (?, ?, ?, ?)";

  pool.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      console.error("❌ Erro ao salvar no MySQL:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || "Erro ao salvar os dados." });
    }
    console.log("✅ Dados inseridos com sucesso!", results);
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
