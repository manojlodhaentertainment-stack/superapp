const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve root index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Mock AI assistant
app.post('/api/ai', (req, res) => {
  const { message } = req.body || {};
  const reply = message
    ? `Mock assistant: I received your message — "${message}"` 
    : 'Mock assistant: Hi! Ask me anything.';
  res.json({ reply });
});

// Mock video search
app.get('/api/videos', (req, res) => {
  const q = (req.query.q || 'popular').toString();
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: `vid-${i + 1}`,
    title: `${q} — Video result ${i + 1}`,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    thumbnail: `https://via.placeholder.com/160x90.png?text=${encodeURIComponent(q)}+${i+1}`
  }));
  res.json({ query: q, items });
});

// Mock product search
app.get('/api/products', (req, res) => {
  const q = (req.query.q || 'items').toString();
  const products = Array.from({ length: 6 }).map((_, i) => ({
    id: `prod-${i + 1}`,
    title: `${q} — Product ${i + 1}`,
    price: ((i + 1) * 9.99).toFixed(2),
    url: `https://www.example.com/search?q=${encodeURIComponent(q)}`,
    image: `https://via.placeholder.com/120.png?text=Prod+${i+1}`
  }));
  res.json({ query: q, products });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Mock AI endpoint
app.post('/api/ai', (req, res) => {
  const { message } = req.body || {};
  const reply = message
    ? `Echo: ${message}. (This is a mock AI reply — replace with real model.)`
    : 'Hello — send a message in the `message` field.';
  res.json({ reply, timestamp: Date.now() });
});

// Mock video search
app.get('/api/videos', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const items = [
    { id: 'v1', title: 'Intro to SuperApp', thumb: '', url: 'https://example.com/v1' },
    { id: 'v2', title: 'Fast Video Search Tips', thumb: '', url: 'https://example.com/v2' },
    { id: 'v3', title: 'AI Assistant Demo', thumb: '', url: 'https://example.com/v3' }
  ].filter(i => !q || i.title.toLowerCase().includes(q));
  res.json({ query: req.query.q || '', results: items });
});

// Mock shopping search
app.get('/api/shop', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const products = [
    { id: 'p1', name: 'SuperPhone X', price: 799, img: '' },
    { id: 'p2', name: 'Fast Charger 30W', price: 29, img: '' },
    { id: 'p3', name: 'Noise-Cancel Headphones', price: 199, img: '' }
  ].filter(p => !q || p.name.toLowerCase().includes(q));
  res.json({ query: req.query.q || '', items: products });
});

// Tools metadata
app.get('/api/tools', (req, res) => {
  res.json({ tools: ['calculator', 'timestamp'] });
});

app.listen(PORT, () => console.log(`SuperApp server running on http://localhost:${PORT}`));
