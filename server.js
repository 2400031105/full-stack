const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { donations: [], requests: [], drives: [], assignments: [], feedback: [], users: [], sessions: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function createSession(userId) {
  const data = loadData();
  const token = uuidv4();
  const session = { id: uuidv4(), token, userId, createdAt: new Date().toISOString() };
  data.sessions = data.sessions || [];
  data.sessions.push(session);
  saveData(data);
  return session;
}

function findUserByUsername(username) {
  const data = loadData();
  return (data.users || []).find(u => u.username === username);
}

function findSessionByToken(token){
  if(!token) return null;
  const data = loadData();
  return (data.sessions || []).find(s => s.token === token);
}

function deleteSession(token){
  const data = loadData();
  data.sessions = (data.sessions || []).filter(s => s.token !== token);
  saveData(data);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/donations', (req, res) => {
  const data = loadData();
  res.json(data.donations);
});

app.post('/api/donations', (req, res) => {
  const data = loadData();
  const item = Object.assign({ id: uuidv4(), status: 'available', createdAt: new Date().toISOString() }, req.body);
  data.donations.push(item);
  saveData(data);
  res.json(item);
});

app.get('/api/requests', (req, res) => {
  const data = loadData();
  res.json(data.requests);
});

app.post('/api/requests', (req, res) => {
  const data = loadData();
  const item = Object.assign({ id: uuidv4(), status: 'open', createdAt: new Date().toISOString() }, req.body);
  data.requests.push(item);
  saveData(data);
  res.json(item);
});

app.get('/api/drives', (req, res) => {
  const data = loadData();
  res.json(data.drives);
});

app.post('/api/drives', (req, res) => {
  const data = loadData();
  const drive = Object.assign({ id: uuidv4(), createdAt: new Date().toISOString() }, req.body);
  data.drives.push(drive);
  saveData(data);
  res.json(drive);
});

app.post('/api/assign', (req, res) => {
  const { donationId, requestId, coordinator, eta } = req.body;
  const data = loadData();
  const assignment = { id: uuidv4(), donationId, requestId, coordinator, eta, createdAt: new Date().toISOString(), status: 'assigned' };
  data.assignments.push(assignment);
  // mark donation/request statuses
  const d = data.donations.find(x => x.id === donationId);
  if (d) d.status = 'assigned';
  const r = data.requests.find(x => x.id === requestId);
  if (r) r.status = 'in-progress';
  saveData(data);
  res.json(assignment);
});

app.post('/api/feedback', (req, res) => {
  const data = loadData();
  const fb = Object.assign({ id: uuidv4(), createdAt: new Date().toISOString() }, req.body);
  data.feedback.push(fb);
  saveData(data);
  res.json(fb);
});

// Simple auth endpoints (demo only — replace with proper auth in production)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || user.password !== password) return res.status(401).json({ error: 'invalid credentials' });
  const session = createSession(user.id);
  res.json({ token: session.token, user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/auth/logout', (req, res) => {
  const auth = (req.headers.authorization || '').replace('Bearer ', '');
  if (auth) deleteSession(auth);
  res.json({ ok: true });
});

app.get('/api/auth/me', (req, res) => {
  const auth = (req.headers.authorization || '').replace('Bearer ', '');
  const session = findSessionByToken(auth);
  if(!session) return res.status(401).json({ error: 'unauthenticated' });
  const data = loadData();
  const user = (data.users || []).find(u=>u.id === session.userId);
  res.json({ id: user.id, username: user.username, role: user.role });
});

function requireAuth(role){
  return (req, res, next) => {
    const auth = (req.headers.authorization || '').replace('Bearer ', '');
    const session = findSessionByToken(auth);
    if(!session) return res.status(401).json({ error: 'unauthenticated' });
    const data = loadData();
    const user = (data.users || []).find(u=>u.id === session.userId);
    if(!user) return res.status(403).json({ error: 'forbidden' });
    if(role && user.role !== role) return res.status(403).json({ error: 'forbidden' });
    req.user = user;
    next();
  };
}

app.post('/api/admin/update', requireAuth('admin'), (req, res) => {
  const { type, id, changes } = req.body;
  const data = loadData();
  if (!data[type]) return res.status(400).json({ error: 'invalid type' });
  const item = data[type].find(x => x.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  Object.assign(item, changes);
  saveData(data);
  res.json(item);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
