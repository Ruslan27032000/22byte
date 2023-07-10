const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: '22byte'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.json(),cors());

app.post('/data', (req, res) => {
    const string = req.body.encryptedString;

    const base64String = Buffer.from(string).toString('base64');

    const query = 'INSERT INTO encrypted_data (encrypted_string) VALUES (?)';
    connection.query(query, [base64String], (err, result) => {
        if (err) {
            console.error('Error saving data: ', err);
            res.status(500).json({ error: 'An error occurred while saving the data' });
            return;
        }

        res.json({ message: 'Data saved successfully' });
    });
});

app.get('/data', (req, res) => {
    const query = 'SELECT encrypted_string FROM encrypted_data';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            res.status(500).json({ error: 'An error occurred while retrieving the data' });
            return;
        }

        if (result.length === 0) {
            res.json({ message: 'No data found' });
            return;
        }

        const encryptedString = result[result.length - 1].encrypted_string;
        res.json({ encryptedString });
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
