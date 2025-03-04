const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(express.json());
app.use(cors());

const resend = new Resend('re_giJBhHcq_2MEBFfbhn6wQQyDCN1JpGrBU'); // Coloque sua API Key aqui

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'felipealvess.dev@gmail.com', // Precisa ser um e-mail verificado no Resend
      to: 'destinatario@exemplo.com',
      subject: `Novo contato de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    });

    res.status(200).json({ message: 'E-mail enviado com sucesso!', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail', error });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
