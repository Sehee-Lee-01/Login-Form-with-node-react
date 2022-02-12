// model 생성 파일
const { use } = require("express/lib/application");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// schema 생성, 회원DB 생성시 필요한 각 데이터와 형식 지정
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // delete space
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  // 오브젝트 사용 안 해도 가능
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 유저 정보를 저장하기 전에 암호화, 끝나면 저장
userSchema.pre("save", function (next) {
  // * let은?
  let user = this;
  // 비밀 번호만 변경할 때 암호화되도록 설정(중복 방지)
  if (user.isModified("password")) {
    //비밀번호를 암호화시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //에러가 나면 바로 보내줌
      if (err) return next(err);
      // user.password는 순수 비밀번호 입력값
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    // 비밀번호가 아니라 다른 것을 바꿀 때
    next();
  }
});

// Compare Method 만들기
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword와  암호화된 비밀번호랑 같은지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Token Method 만들기(ES5 문법)
userSchema.methods.generateToken = function (cb) {
  // * let은?
  let user = this;
  // jsonwebtoken을 이용하여 token 생성
  // 둘 다 있어야 함. 기억해줘야 함.
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = Token
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 DB에서 가져온 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// schema를 감쌀 model 생성
const User = mongoose.model("User", userSchema);

// model 다른 파일에서도 사용 가능하게
module.exports = { User };
