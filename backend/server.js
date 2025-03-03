import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors"; // Para permitir requisições do frontend

const app = express();

// Configuração do CORS
app.use(
    cors({
      origin: "https://lipezxs.vercel.app", // Substitua pelo domínio do seu frontend
      methods: ["GET", "POST"], // Métodos permitidos
      credentials: true, // Permitir cookies e cabeçalhos de autenticação
    })
  );
// Configuração do body-parser
app.use(bodyParser.json());

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fa876593",
  database: "portfolio",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// Rota para receber dados do formulário
app.post("/about", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validação básica
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Inserir no banco de dados
  const query = "INSERT INTO contatos (name, email, subject, message) VALUES (?, ?, ?, ?)";
  connection.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      console.error("Erro ao inserir no MySQL:", err);
      return res.status(500).json({ error: "Erro ao salvar os dados." });
    }

    // Resposta de sucesso
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});