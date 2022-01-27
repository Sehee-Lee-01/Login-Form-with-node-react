// 백엔드 서버 시작점
// 익스프레스 모듈을 가져옴
const express = require("express");
const app = express();
const port = 3000;
// body-parser(client에서 받은 정보를 서버에서 가져올수 있게) 가져오기
const bodyParser = require("body-parser");

const config = require("./config/key");

// User model 가져오기
const { User } = require("./models/User");

// *body parser에 option 주기
// *아래와 같이 생긴 데이터를 분석해서 가져올 수 있게 해줌
// *application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// *application/json
app.use(bodyParser.json());

// mongoose 모듈 가져와서 MongoDB와 연결
const mongoose = require("mongoose");
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

// 회원가입을 위한 라우터
app.post("/register", (req, res) => {
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

// 포트 5000번에서 앱 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
