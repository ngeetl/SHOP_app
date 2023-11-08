require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to mongoDB');
    })
    .catch(err => {
        console.log(err);
    })

app.get('/', (req, res) => {
    res.send('Hello, world!');
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.use(express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log('server is running!');
});