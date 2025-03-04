const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());  // Habilita CORS para todas as origens
app.use(express.json()); // Permite receber JSON no body

app.post("/contact", (req, res) => {  // Confirme se o nome da rota está correto
    console.log("Dados recebidos:", req.body);
    res.json({ message: "Formulário enviado com sucesso!" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
