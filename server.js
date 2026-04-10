const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for the latest alerts (last 100)
const alerts = [];
const MAX_ALERTS = 100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST /webhook — receives alerts sent from TradingView
// In TradingView alert settings, set the Webhook URL to:
//   http://<your-server>/webhook
// and the Message body to JSON, e.g.:
//   {"ticker":"{{ticker}}","exchange":"{{exchange}}","price":"{{close}}","volume":"{{volume}}","time":"{{time}}","action":"{{strategy.order.action}}"}
app.post('/webhook', (req, res) => {
  const payload = req.body;

  if (!payload || Object.keys(payload).length === 0) {
    return res.status(400).json({ error: 'Empty payload' });
  }

  const alert = {
    ...payload,
    receivedAt: new Date().toISOString(),
  };

  alerts.unshift(alert);
  if (alerts.length > MAX_ALERTS) {
    alerts.length = MAX_ALERTS;
  }

  console.log('[Alert received]', JSON.stringify(alert));
  res.status(200).json({ status: 'ok', alert });
});

// GET /alerts — returns stored alerts (consumed by the frontend)
app.get('/alerts', (req, res) => {
  res.json(alerts);
});

// GET / — serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TradingView connect server running on http://localhost:${PORT}`);
  console.log(`Webhook endpoint: POST http://localhost:${PORT}/webhook`);
});
