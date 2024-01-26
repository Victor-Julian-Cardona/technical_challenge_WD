const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;


async function getPhonesData() {
    try {
        const data = await fs.readFile('data\phones.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading phones.json: ${error}`);
        return [];
    }
}


app.get('/phones', async (req, res) => {
    const phones = await getPhonesData();
    res.json(phones);
});

app.get('/phones/:id', async (req, res) => {
    const phones = await getPhonesData();
    const phone = phones.find(p => p.id === parseInt(req.params.id));
    if (phone) {
        res.json(phone);
    } else {
        res.status(404).send('Phone not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
