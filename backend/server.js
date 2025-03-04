const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const db = require('./db'); // Importa a conexão do banco


const app = express();

// Configurar CORS para permitir conexões do frontend
app.use(cors());
app.use(express.json()); // Habilita JSON no body das requisições

// Verificar conexão com o banco
db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("✅ Conectado ao MySQL!");
});

// 📌 Rota para salvar os dados do formulário no banco
app.post("/contact", (req, res) => {
    console.log("🔹 Dados recebidos no backend:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.log("🚨 ERRO: Campos faltando!", req.body);
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("🚨 ERRO NO BANCO:", err.sqlMessage || err);
            return res.status(500).json({ error: "Erro ao salvar no banco" });
        }

        console.log("✅ Dados inseridos com sucesso!", result);
        res.json({ message: "Formulário enviado e salvo no banco!" });
    });
});


// 📌 Rota para listar todos os contatos (opcional)
app.get("/contacts", (req, res) => {
    db.query("SELECT * FROM contatos", (err, results) => {
        if (err) {
            console.error("Erro ao buscar contatos:", err);
            return res.status(500).json({ error: "Erro ao buscar contatos" });
        }
        res.json(results);
    });
});

