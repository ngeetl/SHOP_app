const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const porduct = new Product(req.body);
        porduct.save();

        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
