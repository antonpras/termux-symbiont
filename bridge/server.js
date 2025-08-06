const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001; // Kita gunakan port yang berbeda dari code-server

// Middleware untuk mengizinkan permintaan dari asal yang berbeda (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint percobaan untuk memastikan server berjalan
app.get('/api/ping', (req, res) => {
    res.json({ status: 'pong', message: 'Jembatan API Symbiont aktif!' });
});

app.listen(port, () => {
    console.log(`Jembatan API Symbiont mendengarkan di http://localhost:${port}`);
});
