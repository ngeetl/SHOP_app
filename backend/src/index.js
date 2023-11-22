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

// 라우트 미들웨어
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || '서버에서 에러 발생');
})

app.use(express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log('server is running!');
});