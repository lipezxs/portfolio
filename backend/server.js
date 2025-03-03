const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


dotenv.config(); // Para usar variáveis de ambiente

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
app.use(bodyParser.json());

// Configuração do banco de dados (use um banco remoto!)
const connection = await mysql.createConnection({
  host: process.env.localhost, 
  user: process.env.root,
  password: process.env.Fa876593,
  database: process.env.portflio,
});

// Rota para receber dados do formulário
app.post("/about", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    await connection.execute(
      "INSERT INTO contatos (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar no MySQL:", err);
    res.status(500).json({ error: "Erro ao salvar os dados." });
  }
});

// Iniciar servidor (Railway ou Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
