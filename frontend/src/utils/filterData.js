const category = [
    {
        "_id": 1,
        "name": "여성의류"
    },
    {
        "_id": 2,
        "name": "남성의류"
    },
    {
        "_id": 3,
        "name": "잡화"
    },
    {
        "_id": 4,
        "name": "생활가전"
    },
    {
        "_id": 5,
        "name": "뷰티"
    },
    {
        "_id": 6,
        "name": "도서"
    },
    {
        "_id": 7,
        "name": "반려동물용품"
    },
];

const prices = [
    {
        "_id": 0,
        "name": "모두",
        "array": []
    },
    {
        "_id": 1,
        "name": "0원 - 10,000원 이하",
        "array": [0, 10000]
    },
    {
        "_id": 2,
        "name": "10,000원 - 50,000원 이하",
        "array": [10000, 50000]
    },
    {
        "_id": 3,
        "name": "50,000원 - 100,000원 이하",
        "array": [50000, 100000]
    },
    {
        "_id": 4,
        "name": "100,000원 ~ 300,000원 이하",
        "array": [100000, 300000]
    },
    {
        "_id": 5,
        "name": "300,0000원 초과",
        "array": [300000, 1500000000]
    },
];

export {
    category,
    prices
}