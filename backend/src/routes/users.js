const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

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


module.exports = router;

