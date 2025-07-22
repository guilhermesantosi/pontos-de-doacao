const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'dados.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html')); // troca 'home.html' pelo seu nome
});

app.use(express.static('public'));
app.use(express.json());

app.get('/api/locais', (req, res) => {
  if (!fs.existsSync(DB_PATH)) return res.json([]);
  const data = fs.readFileSync(DB_PATH);
  res.json(JSON.parse(data));
});

app.post('/api/locais', (req, res) => {
  const novo = req.body;
  let dados = [];
  if (fs.existsSync(DB_PATH)) {
    dados = JSON.parse(fs.readFileSync(DB_PATH));
  }
  dados.push(novo);
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
  res.status(201).json({ sucesso: true });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

setInterval(() => {
  console.log('🧼 Limpando dados.json automaticamente...');
  fs.writeFileSync(DB_PATH, '[]'); // limpa mas mantém o arquivo funcionando
}, 1 * 1000); // 6 horas em milissegundos