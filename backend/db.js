const mysql = require('mysql');

// Criando a conexão
const db = mysql.createConnection({
    host: "ballast.proxy.rlwy.net",
    user: "root",
    password: "wSOnTWnTDGpyJcBoPAHskWxYTFASLtrQ",
    database: "railway"
});

// Conectando ao banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL: ', err.message);
        return;
    }
    console.log('✅ Conectado ao banco de dados MySQL!');
});
