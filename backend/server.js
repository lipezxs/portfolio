import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config"; // Já carrega o .env automaticamente

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

// Configuração do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// Rota para receber dados do formulário
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    await pool.execute(
      "INSERT INTO contatos (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar no MySQL:", err);
    res.status(500).json({ error: "Erro ao salvar os dados." });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
