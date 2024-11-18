const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Para analisar requisições JSON

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Simulação de armazenamento em um arquivo JSON (ou outro método)
const dataFilePath = path.join(__dirname, 'data.json');

// Rota para receber dados de localização
app.post('/api/location', (req, res) => {
    const newLocation = req.body;

    // Ler dados existentes
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler dados.' });

        const locations = JSON.parse(data || '[]');
        locations.push(newLocation);

        // Escrever dados atualizados
        fs.writeFile(dataFilePath, JSON.stringify(locations), (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao salvar dados.' });
            res.json({ message: 'Localização armazenada com sucesso!' });
        });
    });
});

// Rota para acessar os dados armazenados
app.get('/api/locations', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler dados.' });
        res.json(JSON.parse(data || '[]'));
    });
});

// rota para lidar com DELETE
app.delete('/api/locations', (req, res) => {
    // Lógica para remover os dados armazenados
    // Suponha que você tenha um array ou um banco de dados
    locations = []; // Limpa a lista de localizações
    res.json({ success: true, message: 'Dados limpos com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
