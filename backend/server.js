const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importa conexão com MySQL

require("dotenv").config(); // Carrega variáveis de ambiente do .env

const app = express(); // Inicializa o Express

app.use(cors({ origin: "https://frontend.vercel.app" }));

app.use(express.json()); // Permite receber JSON no body das requisições

const PORT = process.env.PORT || 5000; // Porta do servidor

// Rota de teste para ver se o backend está rodando
app.get("/", (req, res) => {
    res.send("API está funcionando! 🚀");
});

// Rota para receber mensagens do formulário de contato
app.post("/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
  
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }
  
      // Aqui vai a lógica para salvar no banco de dados MySQL...
      
      res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao processar a requisição." });
    }
  });
  

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
