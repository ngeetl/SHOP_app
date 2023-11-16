const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
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



module.exports = router;

