const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'AboutMe.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

app.get('/api/convert', (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = Number(req.query.amount);

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Неверная сумма' });
    }

    let rate = 0;

    if (from === 'USD' && to === 'EUR') {
        rate = 0.92;
    } else if (from === 'EUR' && to === 'RUB') {
        rate = 105;
    } else if (from === 'USD' && to === 'RUB') {
        rate = 92;
    } else {
        return res.status(400).json({ error: 'Неизвестная валюта' });
    }

    const result = amount * rate;

    res.json({
        from: from,
        to: to,
        amount: amount,
        result: result,
        rate: rate
    });
});

app.listen(PORT, () => {
    console.log('Сервер работает на http://localhost:3000');
});
