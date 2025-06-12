// backend/server.js (Exemplo em Node.js)
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // ou 'axios'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(bodyParser.json());

// Middleware para CORS (importante para que seu frontend possa chamar o backend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Ajuste isso para o domínio do seu frontend em produção
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Suas chaves do Telegram (NUNCA EXPONHA ISSO NO FRONTEND)
const TELEGRAM_BOT_TOKEN = 'SEU_BOT_TOKEN_AQUI'; // <-- Substitua pelo seu token real
const TELEGRAM_CHAT_ID = 'SEU_CHAT_ID_AQUI';     // <-- Substitua pelo ID do chat/grupo

app.post('/agendar-evento', async (req, res) => {
  const { eventId, nome, email, cpf, eventTitle } = req.body;

  if (!eventId || !nome || !email || !cpf || !eventTitle) {
    return res.status(400).json({ success: false, message: 'Dados de agendamento incompletos.' });
  }

  // Lógica para salvar o agendamento no banco de dados (Firestore, PostgreSQL, etc.)
  console.log('Agendamento recebido e salvo (simulado):', { eventId, nome, email, cpf, eventTitle });

  // Enviar notificação para o Telegram
  const telegramMessage = `
    🎉 *Novo Agendamento!* 🎉
    *Evento:* ${eventTitle}
    *Agendado por:* ${nome}
    *Email:* ${email}
    *CPF:* ${cpf}
    *ID do Evento:* ${eventId}
    Horário: ${new Date().toLocaleString('pt-BR')}
  `;

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown' // Permite formatação como negrito, itálico
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Erro ao enviar mensagem para o Telegram:', data);
    } else {
      console.log('Notificação enviada para o Telegram:', data);
    }

    res.status(200).json({ success: true, message: 'Agendamento realizado e notificação enviada!' });

  } catch (error) {
    console.error('Erro ao processar agendamento ou enviar notificação:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao processar agendamento.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});