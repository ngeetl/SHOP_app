const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');


const storage = multer.diskStorage({
    // cb: callback -> cb(error, result)
    destination: function(req, file, cb) {
        cb(null, 'src/uploads/')
    },  
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage }).single("file");

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().populate('writer');

        return res.status(200).json({
            products
        })
    } catch (err) {
        next(err);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();

        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});

router.post('/image', auth, (req, res, next) => {
    // 받아온 이미지 저장
    upload(req, res, err => {
        if(err) {
            return res.status(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename });
    })
});



module.exports = router;
