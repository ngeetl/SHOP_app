const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();
const async = require('async');
const crypto = require('crypto');
const https = require('https');
const axios = require('axios');

router.post('/register', async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (err) {
        next(err)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        // 존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email }); // email이 존재하면 찾은 사용자 document의 인스턴스를 반환함

        if(!user) {
            return res.status(400).send("존재하지 않는 이메일입니다.")
        }

        // 비밀번호가 올바른지 체크
        const isMatch = await user.comparePassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send('잘못된 비밀번호입니다.')
        }

        // token 생성하기
        const payload = {
            userId: user._id.toHexString(),
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ user, accessToken });

    } catch (err) {
        next(err)
    }
});

// router.post('/payment', async (req, res, next) => {
//     const clientId = process.env.NICEPAY_CLIENT_ID;
//     const secretKey = process.env.NICEPAY_SECRET_KEY;
//     const authHeader = Buffer.from(clientId + ":" + secretKey).toString("base64");

//     try {
//         const response = await axios.post(`https://sandbox-api.nicepay.co.kr/v1/payments/${req.body.tid}`, {
//             amount: req.body.amount
//         }, {
//             headers: {
//                 Authorization: `Basic ${authHeader}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         console.log(response.data);
//         // 결제 비즈니스 로직 구현
//         res.json({ resultMsg: response.data.resultMsg });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

router.post('/cart', auth, async (req, res, next) => {
    try {
        // User Collection에서 해당 유저의 정보를 가져오기
        const userInfo = await User.findOne({ _id: req.user._id })

        // 가져온 정보에서 카트에 담으려 하는 상품이 중복되는지 확인
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId) {
                duplicate = true;
            }
        });

        // 상품이 중복된다면 (duplicate = true)
        if(duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId }, // 데이터 찾기
                { $inc: { "cart.$.quantity": 1 } }, // $increment : 증가시키기
                { new: true } // 업데이트 된 후의 문서를 반환하는 옵션
            );

            return res.status(201).send(user.cart);
        } else {
            // 중복된 상품이 없을 때
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true }
            );

            return res.status(201).send(user.cart);
        };
    } catch (error) {
        next(error);
    }
});

router.delete('/cart', auth, async (req, res, next) => {
    try {
        // 요청받은 상품 삭제하기
        const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id},
            {
                "$pull": {
                    "cart": { "id": req.query.productId }
                }
            },
            { new: true }
        );

        const userCart = userInfo.cart;
        const itemsArray = userCart.map(item => item.id);  

        // 상품 삭제 후 남은 cart 제품 정보 불러오기 -> CartDetail 업데이트 하기 위함
        const productInfo = await Product
                .find({_id: {$in: itemsArray}})
                .populate('writer');

        return res.json({
            productInfo,
            userCart
        });

    } catch (error) {
        next(error);
    }
})

router.get('/auth', auth, async (req, res, next) => {
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
}); 

router.get('/logout', auth, async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post('/payment', auth, async (req, res, next) => {
    // User Collection의 History 필드 안에 간단한 결제 정보 넣기
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: new Date().toISOString(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: crypto.randomUUID() // 랜덤 값
        });
    });

    // Payment collection 안에 자세한 결제 정보 넣기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };

    transactionData.product = history;

    // User Collection 업데이트
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: { $each: history }}, $set: { cart: [] } }
    );

    // Payment Collection 업데이트
    const payment = new Payment(transactionData);
    const paymentDocs = await payment.save();

    // Product Collection 업데이트
    let products = [];

    paymentDocs.product.forEach(item => {
        products.push({
            id: item.id, // 상품을 찾기 위한 id
            quantity: item.quantity // 상품을 찾아 sold 업데이트하기 위한
        });
    });

    async.eachSeries(products, async (item) => {
        await Product.updateOne(
            { _id: item.id },
            {
                $inc: {
                    "sold": item.quantity
                }
            }
        );
    },
    (err) => {
        if(err) return res.status(500).send(err);
        return res.sendStatus(200);
    });
})


module.exports = router;

