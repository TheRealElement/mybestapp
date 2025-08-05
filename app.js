const express = require('express');
const path = require('path');
const lovable = require('./src/lovable');
const cursorAI = require('./src/cursorAI');
const base44Handler = require('./src/base44Handler');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/ask', (req, res) => {
    const { question } = req.body;
    const encoded = base44Handler.encode(question);
    const response = cursorAI.generateResponse(encoded);
    res.json({ reply: lovable.makeItLovely(response) });
});

app.listen(PORT, () => {
    console.log(`Lovable AI server running at http://localhost:${PORT}`);
});
