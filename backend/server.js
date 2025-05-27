// 1. Imports essenciais
const mysql = require('mysql2/promise');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

// 2. Inicialização do app com variáveis no topo
const app = express();
const port = process.env.PORT || 3000;

// 3. Configuração do pool MySQL com tratamento de SSL para Railway
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false // Importante para Railway
    }
};

const pool = mysql.createPool(poolConfig);

// 4. Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' }));

// 5. Verificação de conexão com tratamento de reconexão
async function checkDatabaseConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log('✅ Conexão com o banco de dados estabelecida');
        return true;
    } catch (err) {
        console.error('❌ Erro na conexão com o banco:', {
            code: err.code,
            message: err.message
        });
        return false;
    } finally {
        if (connection) connection.release();
    }
}

// 6. Rotas com tratamento de erro melhorado

// Health Check
app.get('/health', async (req, res) => {
    const dbHealthy = await checkDatabaseConnection();
    res.status(dbHealthy ? 200 : 503).json({
        status: dbHealthy ? 'healthy' : 'unhealthy',
        database: dbHealthy ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Rota de contato com retentativa de conexão
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validações
    if (!name?.trim()) return res.status(400).json({ error: 'Nome é obrigatório' });
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return res.status(400).json({ error: 'E-mail inválido' });
    if (!subject?.trim()) return res.status(400).json({ error: 'Assunto é obrigatório' });
    if (!message?.trim()) return res.status(400).json({ error: 'Mensagem é obrigatória' });

    try {
        const [result] = await pool.execute(
            'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        
        res.status(201).json({
            success: true,
            message: 'Mensagem enviada com sucesso!',
            messageId: result.insertId
        });
    } catch (err) {
        console.error('Erro no banco de dados:', err);
        
        // Tentar reconectar uma vez
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Tentando reconectar ao banco...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const [retryResult] = await pool.execute(
                    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
                    [name, email, subject, message]
                );
                return res.status(201).json({
                    success: true,
                    message: 'Mensagem enviada após reconexão!',
                    messageId: retryResult.insertId
                });
            } catch (retryErr) {
                console.error('Falha na reconexão:', retryErr);
            }
        }
        
        res.status(500).json({
            success: false,
            error: 'Erro ao processar sua mensagem',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// 7. Tratamento de erros
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

app.use((err, req, res, next) => {
    console.error('Erro interno:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 8. Inicialização do servidor com verificação de conexão
async function startServer() {
    // Verifica a conexão com o banco mas não bloqueia a inicialização
    await checkDatabaseConnection();
    
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
        console.log('🔗 URLs importantes:');
        console.log(`   Local: http://localhost:${port}`);
        console.log(`   Health Check: http://localhost:${port}/health`);
    });
}

startServer();

// 9. Gerenciamento de shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Encerrando servidor...');
    try {
        await pool.end();
        console.log('✅ Conexões do MySQL encerradas');
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro ao encerrar conexões:', err);
        process.exit(1);
    }
});