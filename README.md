# Bolier Plate: 로그인/회원가입 기능

## <b>0. Bolier Plate code</b>

- 바꾸지 않고 계속 재사용할 수 있는 코드를 말한다.

# BE

## <b>1. Node.js & Express.js</br>

### **1-1. Node.js**

- 원래 자바스크립트는 웹브라우저 안에서만 돌아가는 언어이다. HTML을 좀 더 자유롭게 다루기 위해 만들어진 언어라고 볼 수 있다. 웹브라우저 안에서만 작동하는 한계가 있었는데 이를 웹브라우저 바깥에서도 돌아갈 수 있게 도와준 것이 Node.js라고 할 수 있다. 정확한 명칭은 *Javascript runtime environment*이다.

- Node.js 설치확인

        node -v

- npm package 생성

  > npm(Node Package Manager) 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자

        npm init

  - 설치를 하고 나면 여러 파일 중에 *pakage.json*이라는 파일이 생성된다. 이는 프로젝트 정보와 여러개의 dependency를 관리하는 문서이다.

  - 생성된 *index.js*라는 파일은 백엔드 시작점이 될 중심 파일이라고 할 수 있다.

### **1-2. Express.js**

- Node.js의 웹 어플리케이션 제작을 위한 '프레임 워크'이다. 웹 서버를 구현할 때 많이 쓰인다.
- 설치 하게되면 pakage.json에 반영이 되고 새로운 node_module 폴더가 생기는데 여기선 express를 포함한 dependency가 관리된다.

## **2. Mongo DB**

### **2-1. mongoDB 클러스터 생성 및 연동**

- Mongoose

  > mongoDB를 편하게 쓸 수 있는 Object Modeling Tool

        npm install mongoose -save

## **2-2 MongoDB Model & Schema 생성**

- Model

  - Schema를 감싸주는 역할. 데이터베이스 인터페이스를 제공한다.

- Schema

  - 문서, 초기값 등의 구조를 정의한다.

## **3. Git & GitHub**

### **3-1. Git 설치**

- 설치확인

        git --version

- git 저장소 생성

      git init

- git에서 staging file 확인

        git status

- git commit 내역 확인

        git log

- git 저장소 저장 순서

        git add .
        git commit -m "프로젝트 이름"

- git에 저장하지 않을 파일들은 gitignore에 이름을 써준다.(for 개인정보 보호)

### **3-2. GitHub SSH 연동**

- GitHub 새 저장소 생성

  - 우리 컴퓨터와 GitHub 서버와 안전하게 통신하려면 특별한 방법이 필요하다. 그래서 크게 HTTPS, SSH 통신 방법이 있다.

    - HTTPS
      - GitHub의 아이디와 비밀번호로 인증하여 서버와 연결
    - SSH

      - SSH 설정 확인

              ls -a ~/.ssh
              # id_rsa
              # is_rsa.pub (public key)

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

        npm install body-parser --save

### **4-2. Post Man**

- 클라이언트가 없는 상황에서는 Post Man을 사용하여 server에 *request*를 보낼 수 있다.
- 사용하기 전에 라우터를 생성하고 서버를 실행해야한다.

### **4-3. Nodemon**

- 소스 변경을 감지하여 자동으로 서버를 재시작해줌
- nodemon 설치

        # --save(node_modules에  설치, pakage.json 업데이트)
        # -dev(앱을 실질적으로 동작하기에 필요하지 않은 것)
        npm install nodemon --save-dev

- 설치 후 package.json script에 서버 시작 명령어 추가

### **4-4. gitignore(비밀 정보 보호)**

- mongoDB 비밀번호 보호 -코드에 비밀번호가 들어가기 때문에 비밀번호가 담긴 코드를 메인 파일이 아닌 다른 파일에 저장한 후 그 비밀번호가 들어간 파일을 한 폴더에 모아서 그 폴더만 .gitignore 파일에 넣어준다. 이러면 원격 저장소에서 보이지 않는다.
  - 개발환경이 로컬인지 배포모드인지에 따라서도 다르게 넣어줘야하니 주의해야한다. (ex. heroku 서비스를 통해 배포할 때)
- 환경변수 설정

        # Local 환경
        process.env.NODE_ENV = developement
        # Deploy(배포) 환경
        process.env.NODE_ENV = production

### **4-5. Bcrypt(비밀번호 암호화)**

-

## **5. 로그인 기능**

## **6. Auth 기능**

## **7. 로그아웃 기능**

# FE

## **1. React JS**

## **2. Create React App**

## **3. React Router Dom**

## **4. Ant Design(CSS Framework)**

## **5. Redux**

## **6. React Hooks**

## **7. HOC**

# FE & BE

## **1. Axios**

## **2.CORS**

- Proxy Server

## **3. Concurrently**

## **3. Concurrently**

## 진행하면서 막힌 점

##- token cookie(auth 인증)
당시 클라이언트가 없어 포스트맨으로 로그인을 요청하고 로그아웃 요청을 테스트 하였다. 이 과정을 이틀에 걸쳐서 하다보니 로그인을 하고 DB에 토큰을 받은 것을 깨달은 후 컴퓨터를 종료하고 다음날 DB의 token만 보고 로그아웃을 시도한 것이 원인이었다.
이렇게 되면 DB에는 token이 있지만 브라우저(당시에는 포스트맨)에는 쿠키가 남아있지 않기 때문에(쿠키는 날라가는 것) auth인증을 할 수 없엇다. 당시는 쿠키가 어떤 기능인줄 모르고 썻던 것.

##- javascript, node.js
주로 파이썬을 사용하다가 웹프로젝트를 빠르게 만들기 위해 node.js를 사용하게 되었다. 파이썬과 다른 점이 많아 기본기를 다루는 영상, 문서 등을 게속 찾아보면서 공부하다보니 중간중간 끊기는 부분이 많았다.
특히, 호이스팅, var, let, const, 콜백함수, 비동기처리 등을 중심으로 많이 찾아봤다. 파이썬에서는 분명 인자나 함수를 사용하기 전에 선언, 초기화를 해줘야하는데 자바스크립트는 호이스팅, 그리고 var의 성격 때문에 코드 스크립트 앞부분에 다 쓰지 않아도 된다는 것이다. 그런 점이 처음에는 혼돈의 카오스였다. 그리고 파이썬과 또 다른점은 비동기처리가 된다는 것이었다. 파이썬은 중간부분이 느리게 작동한다고 해도 그 일을 다 마쳐야 다음 일을 진행하는 특성이 있는데 자바스크립트에서는 비동기적으로 코드가 돌아간다는 것이다. 그래서 콜백함수, 셋타임아웃, 프로미스 등이 나오게 된 것이라고 한다. 비동기적 처리를 알려하니 콜백, 셋타임, 프로미스 등 줄줄이 개념이 나와 꽤나 애를 먹었다.

##- 웹 동작원리
웹을 만들고 싶다! 막연한 생각에 뛰어든 것이라서 처음에는 거의 강의 영상을 따라치기만 하고 동작이 똑같이 되는지 안되는지만 확인했었다. 하지만 진정한 디벨로퍼가 되려면 각 단계에 대한 당위성을 이해해야한다고 생각했다. 그래서 강의를 중간중간 멈추고 하루종일 웹 동작원리 HTTP(S), DNS, Clienr/Server, DB 등에 관련한 영상과 글을 보았다. 너무나도 긴여정이었다. 덕분에 방향은 잡을 수 있었다. 웹 관련 기술도 찾아보다보니 도커, 아마존 웹서비스 등 많이 들어보았던 것들이 대강 어디에 쓰이는 지는 감이 오는 것 같다.

react router ver 6.
props.history.push("/");
navigate("/");
