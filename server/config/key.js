// 이걸 index.js에 가져옴
// process.env.NODE_ENV : 환경변수
// prod 환경이라면
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  // dev 환경이라면
  module.exports = require("./dev");
}
