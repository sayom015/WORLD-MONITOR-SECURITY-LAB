const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// SECURE: Security headers added via Helmet (Addresses VULN-010 equivalent)
app.use(helmet()); 

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

// Helper to extract safe user data
const sanitizeUser = (user) => ({ id: user.id, username: user.username });

// Mock Auth Middleware
const requireAuth = (req, res, next) => {
    const session = req.cookies.session;
    if (!session) return res.status(401).json({ error: 'Unauthorized' });
    const user = db.users.find(u => u.id === parseInt(session));
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
};

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
};

// SECURE VULN-001: Proper authentication check (simulated with password requirement)
app.post('/api/login', (req, res) => {
    const { userId, password } = req.body;
    const user = db.users.find(u => u.id === parseInt(userId));
    
    // SECURE: Enforcing a mock password check
    if (user && password === 'securepassword') {
        // SECURE: HttpOnly, Secure cookie
        res.cookie('session', user.id, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ success: true, user: sanitizeUser(user) });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// SECURE VULN-002: IDOR Prevented via ownership check
app.get('/api/alerts/:id', requireAuth, (req, res) => {
    const alert = db.alerts.find(a => a.id === parseInt(req.params.id));
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    
    // SECURE: Check if logged-in user owns the alert
    if (alert.ownerId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: You do not own this resource' });
    }
    res.json(alert);
});

// SECURE VULN-003: Function-Level Auth Enforced
app.post('/api/admin/system-status', requireAuth, requireAdmin, (req, res) => {
    res.json({ status: 'System modified safely' });
});

// SECURE VULN-005: XSS Prevented via output encoding (using a mock HTML escaper)
const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[tag]));

app.get('/api/news/search', (req, res) => {
    const query = req.query.q || '';
    // SECURE: Input is sanitized before rendering
    res.send(`<html><body><h1>Search Results for: ${escapeHTML(query)}</h1></body></html>`);
});

// SECURE VULN-007: Sensitive Data Exposure Prevented
app.get('/api/profile/:id', requireAuth, (req, res) => {
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // SECURE: Only returning safe fields
    res.json(sanitizeUser(user));
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Secure App running on port ${PORT}`);
});
