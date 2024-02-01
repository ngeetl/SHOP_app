## Shop_app은 어떤 프로젝트인가요? 🙋 
이번 프로젝트는 MERN(MongoDB, Express, React, NodeJS) 스택을 이용한 누구나 올릴 수 있는 쇼핑몰입니다. <br />
로그인만 한다면 누구나 다양한 상품 게시글을 사진과 함께 업로드할 수 있습니다.<br />
상품을 장바구니에 담을 수 있으며, 결제버튼을 누르면 주문내역과 팔린 갯수가 업데이트 됩니다.<br />

![fullshop](https://github.com/ngeetl/SHOP_app/assets/53422022/e927378f-8b03-4af7-83a2-28c638393c74)


## Shop_app은 어떤 기능들이 구현되어 있나요? 👓
* axios query와 데이터베이스를 이용해 페이지네이션 기능을 구현하였습니다.
* MongoDB를 사용한 카테고리별 필터링 및 검색 기능을 구현했습니다.
* React Persist 및 Redux-Thunk 미들웨어를 사용하여 UserSlice에서 각 상태(pending, fulfilled, rejected)를 효율적으로 관리했습니다.
* JWT를 이용해 사용자 인증 토큰 로직을 구현하였습니다.
* Multer를 이용해 DiskStorage로의 접근을 가능하게 하고, Dropzone을 이용해 게시물 업로드 기능을 추가했습니다.
* 회원별 장바구니와 결제 기능을 구현하여 주문 내역과 팔린 갯수가 업데이트 되도록 구현하였습니.
* 사용자 인증에 따라 작동하는 UI/UX를 구현하였습니다.
* React-Hook-From을 이용해 회원가입시 유효성 체크 기능을 추가하였습니다.
* axios instance, axios intorceptors를 활용하였습니다.
* React Toastify를 활용하여 토스트 기능을 구현하였습니다.
* aws s3 + cloud front를 이용해 프론트단을 배포하였고, aws ec2로 서버단을 배포하였습니다.

## 프로젝트를 진행하면서 느낀점은요?
이번 프로젝트에서는 리덕스 상태 관리 서비스인 Redux-Thunk와 React Persist를 사용하였는데, <br/> 
비동기 작업과 상태의 영속성을 관리하면서 프론트엔드 개발의 복잡성을 체계적으로 다루는 방법을 배웠습니다.<br/> 
또한, JWT를 사용한 토큰 인증 시스템 구현은 쿠키, 세션 등 보안에 대한 이해를 높이는 계기가 되었으며,<br/> 
결제 API 기능 연동에 어려움을 겪으면서 결제 시스템의 복잡성과 백엔드 학습의 필요성을 느꼈습니다.

#### Full-Shop 바로가기: https://d3idixhyot0xmi.cloudfront.net

## 기술 스택
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/mongoDB-003545?style=for-the-badge&logo=mongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/axios-A86454?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">


