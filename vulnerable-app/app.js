const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Synthetic Database
const db = {
    users: [
        { id: 1, username: 'ADMIN', role: 'admin', secret: 'admin-super-secret' },
        { id: 2, username: 'USER_A', role: 'user', secret: 'user-a-secret' },
        { id: 3, username: 'USER_B', role: 'user', secret: 'user-b-secret' }
    ],
    alerts: [
        { id: 1, ownerId: 2, content: 'Alert for User A' },
        { id: 2, ownerId: 3, content: 'Alert for User B' }
    ]
};

// VULN-001: Broken Authentication (Trusts client-provided user ID completely)
app.post('/api/login', (req, res) => {
    const { userId } = req.body;
    const user = db.users.find(u => u.id === parseInt(userId));
    if (user) {
        // Insecure: No password check, returning raw token/cookie based purely on ID
        res.cookie('session', user.id); 
        res.json({ success: true, token: `mock-jwt-${user.id}`, user });
    } else {
        res.status(401).json({ error: 'Not found' });
    }
});

// VULN-002: Broken Authorization / IDOR (No ownership check)
app.get('/api/alerts/:id', (req, res) => {
    // Insecure: Doesn't verify if the requester owns the alert
    const alert = db.alerts.find(a => a.id === parseInt(req.params.id));
    if (alert) {
        res.json(alert);
    } else {
        res.status(404).json({ error: 'Alert not found' });
    }
});

// VULN-003: Missing Function-Level Authorization
app.post('/api/admin/system-status', (req, res) => {
    // Insecure: No role check
    res.json({ status: 'System deleted/modified (mock)' });
});

// VULN-005: XSS-Prone Rendering (Reflected)
app.get('/api/news/search', (req, res) => {
    const query = req.query.q || '';
    // Insecure: Reflects input directly into HTML without sanitization
    res.send(`<html><body><h1>Search Results for: ${query}</h1></body></html>`);
});

// VULN-007: Sensitive Data Exposure
app.get('/api/profile/:id', (req, res) => {
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        // Insecure: Exposing internal 'secret' and 'role' unnecessarily
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Vulnerable App running on port ${PORT}`);
});
