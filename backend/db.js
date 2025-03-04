const mysql = require('mysql2');

// Crie o pool de conexões
const db = mysql.createPool({
    host: "ballast.proxy.rlwy.net",
    user: "root",
    password: "wSOnTWnTDGpyJcBoPAHskWxYTFASLtrQ",
    database: "railway"
});

// Obtenha uma conexão do pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
    connection.release(); // Libera a conexão do pool após o uso
});
