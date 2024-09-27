const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'boot.osi');

app.use(express.json());
app.use(express.static('public'));

// Endpoint to read the file
app.get('/read', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(data);
    });
});

// Endpoint to update the file
app.post('/update', (req, res) => {
    const { content } = req.body;
    fs.writeFile(FILE_PATH, content, (err) => {
        if (err) return res.status(500).send(err);
        res.send('File updated successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
