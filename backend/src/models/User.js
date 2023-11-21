const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String, //중괄호 없이 바로 타입 입력 가능
    cart : {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default : []
    },
})

userSchema.pre('save', async function(next) {
    let user = this;

    if(user.isModified('password')) {
        const salt = await bcrypt.genSalt(10); // 괄호 안의 숫자는 복잡도
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
    }

    next();
})

userSchema.methods.comparePassword = async function(plainPassword) {
    let user = this; // 요청한 유저의 데이터베이스 정보
    console.log(user);
    const match = await bcrypt.compare(plainPassword, user.password);
    
    return match; // true 또는 false
}

const User = mongoose.model("User", userSchema);

module.exports = User;