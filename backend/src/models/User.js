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
    image: String //중괄호 없이 바로 타입 입력 가능
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

const User = mongoose.model("User", userSchema);

module.exports = User;