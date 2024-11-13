const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let records = [];

// Rota para adicionar uma nova coordenada
app.post('/api/coordinates', (req, res) => {
    const { latitude, longitude, time } = req.body;
    records.push({ latitude, longitude, time });
    res.status(201).json({ message: 'Coordenadas armazenadas!' });
});

// Rota para obter todas as coordenadas
app.get('/api/coordinates', (req, res) => {
    res.json(records);
});

// Rota para limpar todas as coordenadas
app.delete('/api/coordinates', (req, res) => {
    records = []; // Limpa o array de registros
    res.status(200).json({ message: 'Dados limpos com sucesso!' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
