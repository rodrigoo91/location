const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/localizacao', { useNewUrlParser: true, useUnifiedTopology: true });

// Definição do esquema e modelo
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: String
});

const Location = mongoose.model('Location', locationSchema);

// Rota para receber dados de localização
app.post('/api/location', (req, res) => {
    const newLocation = new Location(req.body);
    newLocation.save()
        .then(() => res.json({ message: 'Localização armazenada com sucesso!' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Rota para acessar os dados armazenados
app.get('/api/locations', (req, res) => {
    Location.find()
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
