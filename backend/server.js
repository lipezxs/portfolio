const mysql = require('mysql2');
const cors = require("cors");
const express = require('express');
require('dotenv').config();


console.log('Servidor iniciado...');
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

const app = express();
const port = process.env.PORT || 51895;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// CORS mais permissivo para debug
app.use(cors({
    origin: '*',  // Permite todas as origens, útil para debug
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// Middleware de log adicional
app.use((req, res, next) => {
    console.log('Requisição recebida:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: req.headers
    });
    next();
});

// Configuração da pool de conexões do MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Teste de conexão com o banco de dados
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro CRÍTICO de conexão:', {
            message: err.message,
            code: err.code,
            errno: err.errno,
            sqlState: err.sqlState,
            fatal: err.fatal
        });
        return;
    }
    console.log('Conexão com banco de dados estabelecida com sucesso!');
    connection.release();
});

// Rota POST com tratamento de erro detalhado
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log('Dados de contato recebidos:', { name, email, subject, message });

    // Validações mais rigorosas
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }
    if (!subject || subject.trim() === '') {
        return res.status(400).json({ error: 'Assunto é obrigatório.' });
    }
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Mensagem é obrigatória.' });
    }

    const query = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    
    pool.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Erro DETALHADO ao salvar no banco:', {
                message: err.message,
                code: err.code,
                errno: err.errno,
                sqlState: err.sqlState,
                fatal: err.fatal,
                stack: err.stack
            });
            
            return res.status(500).json({ 
                error: 'Erro interno ao salvar mensagem', 
                details: err.message 
            });
        }
        
        console.log('Mensagem salva com sucesso:', result);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });
});

// Rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'Servidor online', 
        timestamp: new Date().toISOString() 
    });
});
// Middleware para tratamento de erros 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor', 
        message: err.message 
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});