const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/results', (req, res) => {
    const resultsPath = path.join(__dirname, '../security-tests/results.json');
    if (fs.existsSync(resultsPath)) {
        res.json(JSON.parse(fs.readFileSync(resultsPath, 'utf8')));
    } else {
        res.status(404).json({ error: 'Results not found. Run tests first.' });
    }
});

app.listen(PORT, () => {
    console.log(`Security Dashboard running at http://localhost:${PORT}`);
});
