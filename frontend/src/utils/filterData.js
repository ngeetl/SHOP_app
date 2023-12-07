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
        "name": "0 ~ 199원",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "200 ~ 249원",
        "array": [200, 249]
    },
    {
        "_id": 3,
        "name": "250 ~ 279원",
        "array": [150, 279]
    },
    {
        "_id": 4,
        "name": "280 ~ 299원",
        "array": [280, 299]
    },
    {
        "_id": 5,
        "name": "300원 이상",
        "array": [300, 150000]
    },
];

export {
    category,
    prices
}