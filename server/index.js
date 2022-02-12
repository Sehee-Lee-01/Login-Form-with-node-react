// 백엔드 서버 시작점
// 익스프레스 모듈을 가져옴
const express = require("express");
const app = express();

// body-parser(client에서 받은 정보를 서버에서 가져올수 있게) 가져오기
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
// User model 가져오기
const { User } = require("./models/User");

// *body parser에 option 주기
// *아래와 같이 생긴 데이터를 분석해서 가져올 수 있게 해줌
// *application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// *application/json
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose 모듈 가져와서 MongoDB와 연결
const mongoose = require("mongoose");
const res = require("express/lib/response");
const { trusted } = require("mongoose/lib/helpers/query/trusted");
mongoose
  .connect(
    // MongoDB에서 복붙, 비밀번호는 따로 써줘야 함.
    //key.js 파일 만들어서 비밀번호 가림
    config.mongoURI
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// 기본 라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

// register을 위한 라우터
app.post("/api/users/register", (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다.(User model 가져오기)
  // 인스턴스 만들기
  // req.body는 json 형식처럼 데이터를 받은 것
  const user = new User(req.body);
  // 정보 저장: mongoDB에서 나온 method
  // callback func
  user.save((err, userInfo) => {
    // error가 있다면 client에 json 형식으로 전달
    // err(에러메세지)와 함께 전달
    if (err) return res.json({ success: false, err });
    // 성공
    // status(200): 성공했다는 뜻
    return res.status(200).json({
      success: true,
    });
  });
});
// login router
app.post("/api/users/login", (req, res) => {
  // 요청된 email을 DB에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // 유저가 없다면
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 email이 DB에 있다면 password가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // password가 맞다면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // token을 저장한다.(token을 가지고 있는 유저)
        // 어디에? 쿠키, 로컬스토리지(논란이 많지만 쿠키)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//cb 하기 전 중간에 auth
// role이 0이 아니면 관리자(1 어드민, 2 특정부서 어드민)
app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

const port = 5000;
// 포트 3000번에서 앱 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
