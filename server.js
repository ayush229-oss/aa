const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const RESPONSES_FILE = path.join(__dirname, 'survey-responses.json');

// In-memory store for the latest alerts (last 100)
const alerts = [];
const MAX_ALERTS = 100;

// Load existing survey responses from disk
let surveyResponses = [];
if (fs.existsSync(RESPONSES_FILE)) {
  try { surveyResponses = JSON.parse(fs.readFileSync(RESPONSES_FILE, 'utf8')); } catch(e) {}
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST /survey-response — saves a survey submission
app.post('/survey-response', (req, res) => {
  const response = { ...req.body, receivedAt: new Date().toISOString() };
  surveyResponses.push(response);
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(surveyResponses, null, 2));
  console.log(`[Survey] Response #${surveyResponses.length} received`);
  res.status(200).json({ status: 'ok' });
});

// GET /survey-results — view all responses (protect this in production)
app.get('/survey-results', (req, res) => {
  const summary = {
    total: surveyResponses.length,
    responses: surveyResponses,
    breakdown: buildBreakdown(surveyResponses),
  };
  res.json(summary);
});

function buildBreakdown(responses) {
  if (!responses.length) return {};
  const count = (field) => {
    const tally = {};
    responses.forEach(r => {
      const val = r[field];
      if (Array.isArray(val)) val.forEach(v => { tally[v] = (tally[v] || 0) + 1; });
      else if (val) tally[val] = (tally[val] || 0) + 1;
    });
    return tally;
  };
  return {
    experience: count('experience'),
    style: count('style'),
    prop_status: count('prop_status'),
    test_method: count('test_method'),
    systematic_pct: count('systematic_pct'),
    top_feature: count('top_feature'),
    wtp: count('wtp'),
    frustrations: count('frustrations'),
    instruments: count('instruments'),
    avg_useful: (responses.reduce((s, r) => s + (r.useful_score || 0), 0) / responses.length).toFixed(1),
    avg_realistic: (responses.reduce((s, r) => s + (r.realistic_score || 0), 0) / responses.length).toFixed(1),
    notify_yes: responses.filter(r => r.notify === 'yes').length,
    with_email: responses.filter(r => r.email).length,
  };
}

// POST /webhook — receives alerts sent from TradingView
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Survey: http://localhost:${PORT}/survey.html`);
  console.log(`Results: http://localhost:${PORT}/survey-results`);
});
