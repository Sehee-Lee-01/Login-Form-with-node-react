// model 생성 파일
const { use } = require('express/lib/application');
const mongoose = require('mongoose');
// schema 생성, 회원DB 생성시 필요한 각 데이터와 형식 지정
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type; String,
        // delete space
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    // 오브젝트 사용 안 해도 가능
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// schema를 감쌀 model 생성
const User = mongoose.model('User',userSchema)

// model 다른 파일에서도 사용 가능하게
module.exports = {User}