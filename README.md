# Bolier Plate: 로그인/회원가입 기능

## <b>0. Bolier Plate code</b>

- 바꾸지 않고 계속 재사용할 수 있는 코드를 말한다.

## <b>1. Node.js & Express.js</br>

### **1-1. Node.js**

- 원래 자바스크립트는 웹브라우저 안에서만 돌아가는 언어이다. HTML을 좀 더 자유롭게 다루기 위해 만들어진 언어라고 볼 수 있다. 웹브라우저 안에서만 작동하는 한계가 있었는데 이를 웹브라우저 바깥에서도 돌아갈 수 있게 도와준 것이 Node.js라고 할 수 있다. 정확한 명칭은 *Javascript runtime environment*이다.

- Node.js 설치확인
  ```
  node -v
  ```
- npm package 생성

  > npm(Node Package Manager) 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자

  ```
  npm init
  ```

  - 설치를 하고 나면 여러 파일 중에 *pakage.json*이라는 파일이 생성된다. 이는 프로젝트 정보와 여러개의 dependency를 관리하는 문서이다.

  - 생성된 *index.js*라는 파일은 백엔드 시작점이 될 중심 파일이라고 할 수 있다.

### **1-2. Express.js**

- Node.js의 웹 어플리케이션 제작을 위한 '프레임 워크'이다. 웹 서버를 구현할 때 많이 쓰인다.
- 설치 하게되면 pakage.json에 반영이 되고 새로운 node_module 폴더가 생기는데 여기선 express를 포함한 dependency가 관리된다.

## **2. Mongo DB**

### **2-1. mongoDB 클러스터 생성 및 연동**

- Mongoose

  mongoDB를 편하게 쓸 수 있는 Object Modeling Tool이다.

  ```
  npm install mongoose -save
  ```

## **2-2 MongoDB Model & Schema 생성**

- Model

  - Schema를 감싸주는 역할. 데이터베이스 인터페이스를 제공한다.

- Schema

  - 문서, 초기값 등의 구조를 정의한다.

## **3. Git & GitHub**

### **3-1. Git 설치**

- 설치확인
  ```
  git --version
  ```
- git 저장소 생성
  ```
  git init
  ```
- git에서 staging file 확인
  ```
  git status
  ```
- git commit 내역 확인
  ```
  git log
  ```
- git 저장소 저장 순서
  ```
  git add .
  git commit -m "프로젝트 이름"
  ```
- git에 저장하지 않을 파일들은 gitignore에 이름을 써준다.(for 개인정보 보호)

### **3-2. GitHub SSH 연동**

- GitHub 새 저장소 생성

  - 우리 컴퓨터와 GitHub 서버와 안전하게 통신하려면 특별한 방법이 필요하다. 그래서 크게 HTTPS, SSH 통신 방법이 있다.

    - HTTPS
      - GitHub의 아이디와 비밀번호로 인증하여 서버와 연결
    - SSH
      - SSH 설정 확인
      ```
      ls -a ~/.ssh
      # id_rsa
      # is_rsa.pub (public key)
      ```

- SSH Key를 이용하여 서버와 연결
  - 개인키(컴퓨터가 가지고있는 키)
  - 공개키(컴퓨터에서 생성하여 GitHub 서버에 올릴 키)

## **4. 회원가입 기능(서버 구현)**

### **4-1. Body-parser Dependency**

- Client-Server 통신

  - Client가 Server에게 request를 하고 Server는 Client에게 response를 한다. request를 할 땐 body(json, buffer, string, URL 암호 데이터 등)로 요청을 할 때도 있다.

- Body parsing
  - client가 보낸 body 데이터를 분석하는 것을 parse라고 한다. 이후 req.body로 출력해주는 도구를 body-parser라고 한다.
- Body-parser 설치방법
  ```
  npm install body-parser --save
  ```

### **4-2. Post Man**

- 클라이언트가 없는 상황에서는 Post Man을 사용하여 server에 *request*를 보낼 수 있다.
- 사용하기 전에 라우터를 생성하고 서버를 실행해야한다.

### **4-3. Nodemon**

- 소스 변경을 감지하여 자동으로 서버를 재시작해줌
- nodemon 설치

  ```
  # --save(node_modules에  설치, pakage.json 업데이트)
  # -dev(앱을 실질적으로 동작하기에 필요하지 않은 것)
  npm install nodemon --save-dev
  ```

- 설치 후 package.json script에 서버 시작 명령어 추가

### **4-4. gitignore(비밀 정보 보호)**

- mongoDB 비밀번호 보호 -코드에 비밀번호가 들어가기 때문에 비밀번호가 담긴 코드를 메인 파일이 아닌 다른 파일에 저장한 후 그 비밀번호가 들어간 파일을 한 폴더에 모아서 그 폴더만 .gitignore 파일에 넣어준다. 이러면 원격 저장소에서 보이지 않는다.
  - 개발환경이 로컬인지 배포모드인지에 따라서도 다르게 넣어줘야하니 주의해야한다. (ex. heroku 서비스를 통해 배포할 때)
- 환경변수 설정
  ```
  # Local 환경
  process.env.NODE_ENV = developement
  # Deploy(배포) 환경
  process.env.NODE_ENV = production
  ```

### **4-5. Bcrypt(비밀번호 암호화)**

- 비밀번호 암호화를 하는 이유
  - 개인정보보호법으로 지정되어있기 때문에 암호화를 해야한다. 또한 관리자, DB 침입자(?)가 비밀번호를 직접 알지 못하도록 하게 하는 기능도 있는 것 같다.
- [Bycrypt 설치](https://www.npmjs.com/package/bcrypt)
  ```
  npm install bcrypt --save
  ```
- 비밀번호 암호화 순서

  - DB 등록전에 비밀번호를 암호화(해싱) 시켜야 DB에 실제 비밀 번호가 보이지 않는다.
  - 해싱된 비밀번호를 저장할 때는 salt라는 우리가 모르는 string과 함께 raw 비밀번호를 저장한다. 그냥 Hashing된 비밀번호를 저장하게된다면 rainbow table(유출된 Hashing 결과값을 모아놓은 사전) 이용하여 raw password를 알게 될 수도 있기 때문이다. 그리고 hash 함수 특성상 text가 1, 2자라도 다르면 결과값이 완전히 달라지기 때문에 역으로 비밀번호 찾는 것을 방지하고자 salting을 한다.

    **※ `비밀번호`를 바꿀 때만 작동할 수 있게 설정해야한다. 다른 회원정보를 바꿀 때마다 작동이 될 수도 있으니 주의 바람.**

    ```javascript
    const bcrypt = require("bcrypt");
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB with salt.
      });
    });
    ```

  - bcrypt로 암호화된 test용 비밀번호의 일부분이다. 크게 $로 구분하여 세 부분으로 나뉜다.
    ```
    $2b$10$8uMdF.wmQK.F57A9eUo7j...."
    ```
    - $2b : bcrypt의 버전을 나타낸다.
    - $10 : round를 나타낸다. [비밀번호+salt]에 계속 salt를 합쳐 해싱한 횟수라고한다.
    - 암호화된 부분: [...[비밀번호+salt]+salt...]가 해싱된 부분이다!

## **5. 로그인 기능**

### **5-0. Login Route 만든다.**

- 로그인을 다루는 라우터를 만들어서 로그인 요청을 처리한다. 크게 4단계로 나뉜다.

### **5-1. DB에서 로그인을 요청한 E-mail을 찾는다.**

```javascript
// email을 찾아주는 mongoDB 함수
User.findOne();
```

### **5-2. E-mail을 찾으면 비밀번호가 같은지 확인한다.**

- 확인할 때는 Bcrypt를 활용하여 비밀번호 입력값과 암호화된 비밀번호가 같은지 확인한다.

  ```javascript
  // Compare Method 만들기
  userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword와  암호화된 비밀번호랑 같은지 확인
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  ```

### **5-3. E-mail, 비밀번호가 같다면 Token을 생성한다.**

- [JSONWEBTOKEN](https://www.npmjs.com/package/jsonwebtoken)를 이용한다. 이는 추후 페이지 이동시 Authorization을 위한 것이다.

  ```javascript
  // 토큰 생성 라이브러리
  npm install jsonwebtoken --save
  ```

### **5-4. 생성된 토큰을 Cookie에 저장한다.**

```javascript
res.cookie("x_auth", user.token).status(200);
```

## **6. Auth 기능**

### **6-0. Auth 라우터를 생성한다.**

- 페이지를 이동할 때마다 로그인 여부와 관리자 유저인지 등을 체크해야한다.
- 글을 쓸 때나 지울 때 권한이 있는 지를 체크해야한다.
- 여기서는 `server` 파일에 `middleware` 파일에 코드를 저장해 두었다. 서버에 request를 하고 response를 받아오는 과정 사이에 권한을 확인하는 용도이기 때문이다.

### **6-1. Cookie에 있는 Token을 서버에서 복호화한다.**

```javascript
jwt.verify(token, "secretToken", function (err, decoded))
```

### **6-2. 복호화 후 나온 User ID를 이용하여 DB에서 유저를 찾는다.**

```javascript
user.findOne({ _id: decoded, token: token }, function (err, user) {
  if (err) return cb(err);
  cb(null, user);
});
```

### **6-3. DB에 저장된 User의 Token이 Cookie Token과 일치하는지 확인한다.**

```javascript
let token = req.cookies.x_auth;
// 토큰을 복호화 한  후 유저를 찾는다.
User.findByToken(token, (err, user) => {
  if (err) throw err;
  if (!user) return res.json({ isAuth: false, error: true });

  req.token = token;
  req.user = user;
  next();
});
```

### **6-4. Token이 일치하면 해당하는 유저의 정보를 선별해서 보내준다.**

```javascript
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
```

## **7. 로그아웃 기능**

### **7-0. Logout 라우터를 만든다.**

- 로그인을 하게되면 server의 DB, client의 cookie에 토큰이 생기게 된다. 이후 이 두 곳에 생긴 토큰이 같은지 비교하며 페이지를 이동할 때마다 사용자에게 맞는 권한을 부여한다. DB에서 사용자의 토큰을 지우면 사용자 정보를 비교할 수 없다. 즉 DB상의 유저인지 파악할 수 없기 때문에 로그인을 안한 사용자라고 서버는 인식하게 된다. 이를 로그아웃이라고 한다.

### **7-1. 로그아웃 하려는 유저를 DB에서 찾는다.**

- 유저를 찾고 토큰을 비교한다. auth의 과정이 필요하다.

### **7-2. 유저의 Token을 DB에서 지워준다.**

- cookie를 지우면 client 상에서 로그아웃이 된 것처럼 보이겟지만 이렇게 하면 DB상에 토큰이 아직 남아있기 때문에 다음 로그인 시 에러가 난다. 다음 로그인을 위해서는 로그아웃 할 때 서버의 DB에서 user의 토큰을 지워야 한다.

  ```javascript
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
  ```

## **8. React JS**

### **8-1. React JS 소개**

- 2013년도 Facebook에 의해 만들어진 javascript 라이브러리이다.
- 모듈과 비슷한 component로 이루어져 있어 재사용성이 뛰어나다.
- Virtual DOM을 사용하여 기존 DOM을 관리한다.

### **8-2. Virtual DOM**

1. Real DOM

- 한 가지 요소를 update 하려면 전체를 reload 해야한다.

2. Virtual DOM

- Real DOM의 복사본이라고 보면된다.
- 한가지 요소를 update 하려면 그 요소만 DOM에서 바꿔준다.
  - JSX(HTML과 비슷)을 랜더링하면 Virtual DOM이 update된다.
  - 이전 Virtual DOM에서 찍어둔 Snapshot과 비교하여 바뀐부분을 찾는다(diffing).
  - 바뀐부분만 Real DOM에서 바꿔준다.

### **8-3. Create React App**

#### **8-3-1. 리액트 앱 실행**

- 원래는 React 앱을 실행하기 위해선 webpack, babel 같은 것을 설정해야했다.
- 요즘은 creatr-react-rpp 명령어 한 줄로 바로 리액트 앱을 실행할 수 있다.

  ```
  # '.'은 폴더 없이 만든다는 의미
  npx create-react-app .
  ```

- babel
  - 최신 자바스크립트 문법을 지원하지 않는 브라우저를 위해서 구형 브라우저에서 최신 자바스크립트 문법을 돌 수 있게 변환 시켜준다.
- webpack
  - 최신 자바스크립트 앱의 정적 모듈 번들러이다. 디펜던시가 있는 모듈들을 참고하여 디펜던시 그래프를 만들고 이를 기반으로 정적 자산 번들을 만든다.

#### **8-3-2. npm & npx**

-NPM(Node Pakage Manager)

- 오픈소스 nodeJS 프로젝트를 저장하고 있는 온라인 저장소
- 패키지 설치, 버전관리, 디펜던시 관리를 목적으로 한다.

- NPM install Locally vs Globally
  - Locally: 프로젝트 안의 `./node_modules/.bin`에 저장
  - Globally: Windows `%AppData%/npm`에 저장
    - 원래 이 방식으로 다운로드를 했지만 npx를 이용해서 npm registry에서 CRA를 찾아 이용할 수 있다.
    ```
    # 예전
    npm install -g create-react-app
    # npx이용
    npx create-react-app .
    ```
- NPX의 장점
  - Disk Space 낭비 방지
  - 최신버전 사용 가능

#### **8-3-3. CRA 구조**

- `public` folder
  - `index.html`: Page template
  - `index.html`에만 쓰일 수 있는 파일을 담는 곳이다.
- `src` folder
  - `index.js`: javascript entry point
  - js, css 파일을 보관하는 곳이다. webpack는 `src` 폴더 안의 파일을 처리한다.
- CRA 구조

```
my-app/
  README.md
  node_modules/
  pakage.json
  public/
    index.html
    favicon.co
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg

```

- 현 프로젝트의 구조

  - `_actions/`, `_reducer/`: redux를 위한 폴더
  - `components/views/`: Page를 넣는다.
  - `components/views/Sections/` 해당 페이지에 관련된 css파일이나 component들을 넣는다.
  - `App.js`: routing 관련 일을 처리한다.
  - `Config.js`: 환경변수를 저장한다.
  - `hoc/`: Higher Order Component의 약자. 여러 군데에서 쓰일 수 있는 것들을 넣어서 어디서든 쓸 수 있게 해줌.

  ```
  src/
    _actions/
    _reducer/
    components/views/
    components/views/Sections/
  App.js
  Config.js
  hoc/
  utils/
  ```

### **8-4. HOC**

- Higher Order Component
- 기존 컴포넌트를 새로운 컴포넌트로 바꿔주는 함수.
- 각 페이지에 Auth 기능을 첨부할 때 사용. 들어갈 수 있는 페이지에 대한 통제 가능.

### **8-5. React Router Dom**

- 페이지를 이동할 때 사용
  - `src/index.js` 파일에 있음.
- Dpendency 다운로드

```
npm install react-router-dom --save
```

## **9. Axios**

- 프론트와 서버가 구축되면 해당 포트가 다를 것이다.
  - front: port 3000
  - back: port: 5000
- 이 두 포트 사이로 데이터의 res/req가 이루어진다. 이 때 이용하는 것이 `Axios`(ReactJS)다. (jQurey의 Ajax)

```
npm install axios --save
```

### **9-1. CORS 이슈**

- CORS: Cross-Origin Resource Sharing
- Axios만으로는 아무 설정 없이 request를 보낼 수 없다. CORS 보안 정책 때문이다.

### **9-2. Proxy Server**

- CORS 정책 이슈를 해결할 여러가지 방법중 Proxy 설정 법이 있다.
- 아이피를 임의로 바꿀 수 있다. 인터넷에 접근 하는 사람의 IP를 모르게 할 수 있다.
- 보내는 데이터도 임의로 바꿀 수 있다.
- 방화벽 기능, 웹 필터 기능, 캐쉬 데이터, 공유 데이터 제공 가능
- proxy server 사용이유
  - 사내, 가정 내 인터넷 사용 제어
  - 캐쉬를 이용해 더 빠은 인터넷 이용 제공
  - 더 나은 보안 제공
  - 이용 제한된 사이트 접근 가능

### **9-3. Concurrently**

- 여러 개의 명령어를 동시에 작동시킬 수 있게 해주는 툴.
- `pakage.json`에 입력

```
"dev": "concurrently \"command1 arg\" \"command2 arg\""
```

## **10. Redux**

### **10-1. Redux란?**

- 예측가능한 state 컨테이너.
- state 상태 관리 라이브러리

### **10-2. ReactJS에서의 변수 관리**

- props -부모 컴포넌트에서 물려받을 수 있다.
  - 자식 컴포넌트에서는 내용을 바꿀 수 없고 부모 컴포넌트에서만 내용을 바꿀 수 있다.
- state
  - 컴포넌트 내부에서 선언되어 스스로 관리하는 것.
  - 값을 그 컴포넌트 안에서 바꿀 수 있고 re-randering된다.
    - 검색창에 글을 입력할 때 글이 변하는 것이 state를 바꾸는 예이다.

### **10-3. Redux 데이터 플로우**

- State를 관리하는 툴.
  1. `Action`: 어떤 일이 일어났는지 묘사.
  2. `Reducer(function)`: 이전 state 값과 action값을 반영하여 새로운 state 값 리턴.
  - pure function이기 때문에 내부에서 이 행동을 조심해야한다.
    - argument 바꾸기
    - API 호출이나 라우팅 이동 같은 side effect 수행
    - pure function가 아닌 함수를 부르기
  3. `Store`: object. App 내의 모든 state tree를 가지고 있음. 오직 action을 포착했을때 state를 바꿀 수 있음.
  4. `React Component`: Subscribe.
  5. `Action(go to 1.)`: Dispatch(action).

### **10-4. Redux 설치**

- Dpendency
  1. redux
  2. react-redux
  3. redux-promis
  4. redux-thunk
- redux 기본구조(Scaffolding) 만들기
  - <Privider/>는 hoc로 redux에서 제공한 것이다. 이것 때문에 react 요소에서 redux를 사용할 수 잇다.

## **11. React Hooks**

### **11-0. Component**

- Class형(과거에는 대부분 사용)

  - Provide more features
  - More Code
  - More Complex Code
  - Slower Performance

- Function형
  - Provide less features(state, lifeCycle 관련 기능 사용 불가능)
  - Less code
  - Simpler Code
  - Faster Performance

### **11-1. React Hook?**

- Hook은 함수형 컴포넌트의 한계를 개선해주는 툴이다.
  - state, lifeCycle 관련 기능 사용 가능
  - useState, useEffect

## **12. CSS Framework**

- Ant Design 설치

```
npm install antd --save
```

## **13. 진행하면서 막힌 점**

### **- token cookie(auth 인증)**

당시 클라이언트가 없어 포스트맨으로 로그인을 요청하고 로그아웃 요청을 테스트 하였다. 이 과정을 이틀에 걸쳐서 하다보니 로그인을 하고 DB에 토큰을 받은 것을 깨달은 후 컴퓨터를 종료하고 다음날 DB의 token만 보고 로그아웃을 시도한 것이 원인이었다.
이렇게 되면 DB에는 token이 있지만 브라우저(당시에는 포스트맨)에는 쿠키가 남아있지 않기 때문에(쿠키는 날라가는 것) auth인증을 할 수 없엇다. 당시는 쿠키가 어떤 기능인줄 모르고 썻던 것.

### **- javascript, node.js**

주로 파이썬을 사용하다가 웹프로젝트를 빠르게 만들기 위해 node.js를 사용하게 되었다. 파이썬과 다른 점이 많아 기본기를 다루는 영상, 문서 등을 게속 찾아보면서 공부하다보니 중간중간 끊기는 부분이 많았다.
특히, 호이스팅, var, let, const, 콜백함수, 비동기처리 등을 중심으로 많이 찾아봤다. 파이썬에서는 분명 인자나 함수를 사용하기 전에 선언, 초기화를 해줘야하는데 자바스크립트는 호이스팅, 그리고 var의 성격 때문에 코드 스크립트 앞부분에 다 쓰지 않아도 된다는 것이다. 그런 점이 처음에는 혼돈의 카오스였다. 그리고 파이썬과 또 다른점은 비동기처리가 된다는 것이었다. 파이썬은 중간부분이 느리게 작동한다고 해도 그 일을 다 마쳐야 다음 일을 진행하는 특성이 있는데 자바스크립트에서는 비동기적으로 코드가 돌아간다는 것이다. 그래서 콜백함수, 셋타임아웃, 프로미스 등이 나오게 된 것이라고 한다. 비동기적 처리를 알려하니 콜백, 셋타임, 프로미스 등 줄줄이 개념이 나와 꽤나 애를 먹었다.

### **- 웹 동작원리**

웹을 만들고 싶다! 막연한 생각에 뛰어든 것이라서 처음에는 거의 강의 영상을 따라치기만 하고 동작이 똑같이 되는지 안되는지만 확인했었다. 하지만 진정한 디벨로퍼가 되려면 각 단계에 대한 당위성을 이해해야한다고 생각했다. 그래서 강의를 중간중간 멈추고 하루종일 웹 동작원리 HTTP(S), DNS, Clienr/Server, DB 등에 관련한 영상과 글을 보았다. 너무나도 긴여정이었다. 덕분에 방향은 잡을 수 있었다. 웹 관련 기술도 찾아보다보니 도커, 아마존 웹서비스 등 많이 들어보았던 것들이 대강 어디에 쓰이는 지는 감이 오는 것 같다.

### **- react router ver 6.**

강의를 볼 때 구 버전으로 촬영이 된 강의를 보다보니 새로운 버전과 맞지 않는 부분이 있었다. 이를 찾기 위해 꽤나 시간이 걸렸다. 그래도 구 버전과 신 버전의 차이점을 알 수 있는 좋은 기회 였던 것 같다.

```javascript
// 구 버전의 history method가 작동이 안됨.
props.history.push("/");
// 페이지를 이동하려면 새로운 버전에서는 이렇게 써야함.
navigate("/");
```

### **- 함수형 컴포넌트와 클래스 컴포넌트**

함수형과 클래스형의 차이를 아직은 대략적으로 이해를 하는 상황이다. 특히 React component의 라이프 사이클에 대한 이해가 아직 부족하다는 느낌이 많이 들었다. 다음에 공부할 때는 이 부분을 집중적으로 공부해야겠다.(React Hook과 함께!)

### **- Redux**

리덕스 이전에 props와 state에 대한 정보를 알 수 있었다. 그리고 특히 리엑트 Hook 다음으로 가장 이해하기에 오래 걸렸던 것이 Redux였는데 나중에 Hook과 집중적으로 다뤄보는 프로젝트를 진행해야겠다는 생각이 들었다.

## **14. 느낀 점**

강의를 참고하면서 만든 이 프로젝트를 하기 전까지 많은 시행착오를 겪었던 것 같다. 파이썬에만 익숙해졌던 나에게 새로운 도전이었고, 또 웹에 대한 지식이 없었던 나에게 새로운 터닝 포인트가 되었던 것 같다. 강의 내용 뿐 아니라 유튜브에서 각종 웹과 관련한 지식에 대해 좀 더 관심을 가지고 보게 되었다. 자바스크립트 기초에 대해 공부하면서 비동기처리, 싱글스레드, ES6 문법, typescript 등의 내용을 자각하게 되었다. http(s), server-client, html, css 등을 알아가면서 웹을 제작하기 위해서는 정말 많은 공부가 필요하다는 것을 느끼게 되었고 한편으로는 공부할 것이 아직 많이 있다는 사실이 조금 흥미롭기도 하였다.
