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

router.get('/:id', async (req, res, next) => {
    const type = req.query.type;
    let procuctIds = req.params.id;

    if(type === 'array') {
        // prouctIds 쿼리 스트링이 이런식으로 옴 -> 424e2334,424e2334,3244e234
        let ids = procuctIds.split(','); // = ['424e2334', '424e2334', '3244e234']
        procuctIds = ids.map(id => {
            return id
        });
    };

    // DB에서 procuctId와 같은 상품의 정보를 불러오기
    try {
        const product = await Product.find({ _id: { $in: procuctIds} })
        // $in : procuctIds 배열 값 중 일치하는 모든 문서를 찾음
            .populate('writer')

        return res.status(200).send(product);

    } catch (error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const term = req.query.searchTerm

    let findArgs = {}; // 필터링 후 실제로 찾을 값
    const filterObj = req.query.filters;

    for(let key in filterObj) {
        if(filterObj[key].length > 0) {
            if(key === 'price') {
                findArgs[key] = {
                    // Greater than equal
                    $gte: filterObj[key][0],
                    // Less than equal
                    $lte: filterObj[key][1]
                };
            } else {
                findArgs[key] = filterObj[key];
            }
        };
    };

    if(term) {
        findArgs["$text"] = {$search: term}
    }
    // console.log(findArgs)

    try {
        const products = await Product.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)

        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore
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
