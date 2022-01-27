// 백엔드 서버 시작점
// 익스프레스 모듈을 가져옴
const express = require("express");
const app = express();
const port = 3000;
// mongoose 모듈 가져와서 MongoDB와 연결
const mongoose = require("mongoose");
mongoose
  .connect(
    // MongoDB에서 복붙, 비밀번호는 따로 써줘야 함.
    "mongodb+srv://sehee:lshstar9826!@cluster0.drqml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 포트 5000번에서 앱 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
