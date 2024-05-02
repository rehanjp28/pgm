const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); // To parse JSON body

app.post('/save-code', (req, res) => {
    const { code } = req.body;
    // Filename can be dynamic or static as needed
    const desktopPath = path.join(process.env.USERPROFILE, 'Desktop', 'two_sum_code.py');

    fs.writeFile(desktopPath, code, (err) => {
        if (err) {
            console.error('Failed to save the file:', err);
            res.status(500).send('Error writing to file');
            return;
        }
        res.send('Code saved successfully to Desktop');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
