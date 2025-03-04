const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Importa conexão com MySQL

require("dotenv").config(); // Carrega variáveis de ambiente do .env

const app = express(); // Inicializa o Express

app.use(cors({ origin: "https://lipezxs.vercel.app" }));

app.use(express.json()); // Permite receber JSON no body das requisições

const PORT = process.env.PORT || 5000; // Porta do servidor

// Rota de teste para ver se o backend está rodando
app.get("/", (req, res) => {
    res.send("API está funcionando! 🚀");
});

// Rota para receber mensagens do formulário de contato
app.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        await pool.query(
            "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
            [name, email, subject, message]
        );

        res.json({ message: "Mensagem salva com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar no banco:", error);
        res.status(500).json({ error: "Erro ao salvar a mensagem." });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
