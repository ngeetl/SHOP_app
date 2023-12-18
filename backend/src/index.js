require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;
// const axios = require('axios');

const corsOptions = {
    origin: [
        "http://localhost:5173",  // 추가로 넣고 싶은 origin 작성
        "https://d3idixhyot0xmi.cloudfront.net",  // 이 부분 중요!!!
    ]
};

app.use(cors(corsOptions));
// app.use(cors());
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

// 나이스페이
// app.post('/nicepay', async (req, res) => {
//     const clientId = "S2_af4543a0be4d49a98122e01ec2059a56"	;
//     const secretKey = "9eb85607103646da9f9c02b128f2e5ee";
//     const authHeader = Buffer.from(`${clientId}:${secretKey}`).toString("base64");
//     try {
//         const response = await axios.post(`https://sandbox-api.nicepay.co.kr/v1/payments/${req.body.tid}`, {
//             amount: req.body.amount
//         }, {
//             headers: {
//                 Authorization: `Basic ${authHeader}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         console.log(req.body)
//         console.log(1, response)

//         // 결제 비즈니스 로직 구현

//         if(response.data.resultCode === '0000') {
//             return res.send(
//                 `
//                     <html>
//                         <head>
//                             <title>결제 성공</title>
//                         </head>
//                         <body>
//                             <h1>결제가 성공적으로 완료되었습니다!</h1>
//                             <h2><a href="http://localhost:5173/user/cart">주문내역 보기</a></h2>
//                         </body>
//                     </html>
//                 `
//             )
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


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