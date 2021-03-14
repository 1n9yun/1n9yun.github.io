---
# Featured tags need to have either the `list` or `grid` layout (PRO only).
layout: page

# The title of the tag's page.
title: 정인균

# The name of the tag, used in a post's front matter (e.g. tags: [<slug>]).
slug: resume

# (Optional) Write a short (~150 characters) description of this featured tag.
description: >

# (Optional) You can disable grouping posts by date.
# no_groups: true

# Exclude this example category from the sitemap.
# DON'T USE THIS SETTING IN YOUR CATEGORIES!
--- 
# 정인균 --- Backend Developer
v210314
<br><br>
<span class="icon-mail"></span> jig7357@gmail.com  
<span class="icon-github"></span> <https://github.com/1n9yun>

## Education
**충북대학교** --- 컴퓨터 공학과 졸업 (2014. 03. ~ 2020. 02)  
**세광고등학교** --- 졸업 (2011. 03. ~ 2014. 02)  

## Experience

### 삼성 청년 소프트웨어 아카데미 ([SSAFY](https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp))
(2020. 01 ~ 2020. 12)

알고리즘 기반 코딩 역량 강화, **Java, Spring framwork**를 이용한 실무 기반의 프로젝트 수행을 통해 실전형 SW 개발자 양성 프로그램

## Project

### STEW --- 캠 스터디 플랫폼
<!-- ![stew](/assets/img/resume/stew.png) -->

<div id="stew-carousel" class="swiper-container"></div>
<script>
  swiperInitialize("stew-carousel", {
    path: "/img/project/stew",
    imgList: [
      "main.jpeg",
      "register-normal.jpeg", 
      "register-social.jpeg",
      "login.jpeg",
      "study-list.jpeg",
      "study-list-search.jpeg",
      "study-participate.jpeg",
      "study-private-accept.jpeg",
      "study-create.jpeg",
      "study-detail-1.jpeg",
      "study-detail-2.jpeg",
      "cam-study-ready.jpeg",
      "cam-study.jpeg",
      "mypage-1.jpeg",
      "mypage-2.jpeg",
      "mypage-3.jpeg",
      "guide.jpeg"
    ],
    size: "100%",
    dotted: false,
    millis: 4000
  })
</script>

#### SUMMARY
(2020. 07. 13 ~ 2020. 08. 21)  

코로나19로 인한 언택트 시대를 맞아 변화하는 스터디 형태를 따라서, **서로 만나지 않고 감시하며 공부할 수 있는 환경을 제공**하자는 의미에서 제작하게 되었습니다.

스터디 그룹을 만들어 모집할 수 있고, 어학, 자격증 등 분야별 카테고리를 제공하여 원하는 스터디 그룹을 찾아 참여할 수 있게 하였습니다.

마이크, 카메라를 통해 화상 회의 형태의 **실시간 스트리밍 서비스를 제공**하여 서로가 공부를 잘 하고 있는지 감시할 수 있으며 채팅 기능도 제공함으로써 여러 가지 소통 환경을 제공하였습니다.

#### 기여

* 회원 API 구성
  * Spring Security를 이용한 **회원의 인증/인가**
  * OAuth2를 이용한 **SNS 로그인**
  * 회원의 인증/인가와 SNS 로그인에 **JWT**를 사용하며 InMemory Token Store로 **Redis** 사용
* 회원 가입, 로그인 페이지
  * Vue.js, Vuetify를 이용

---

### Michin AI --- 인공지능 영어 공부 챗봇
<div id="michinai-carousel" class="swiper-container"></div>
<script>
  imgList = [];
  for(let i=1;i<=12;i++){
    imgList.push(i + ".png");
  }
  swiperInitialize("michinai-carousel", {
    path: "/img/project/michinai",
    imgList: imgList,
    size: "30%",
    dotted: false,
    millis: 3000
  })
</script>

#### SUMMARY
(2020. 08. 31 ~ 2020. 10. 08)

카카오톡 챗봇과 연동하여 봇과 영어로 대화함으로써 **영어 문장력을 기를 수 있는 서비스**를 제공하고자 제작하게 되었습니다.

챗봇과 영어로 대화한 기록들을 가지고 문장 교정을 하고, 모르는 단어를 등록하여 공부할 수 있는 단어장을 제공합니다.

#### 기여
* 인공지능 모델 비동기화
  * Backend 서버와 인공지능 모델을 **Websocket으로 연결, 메시지 큐를 이용하여 비동기 처리**
  * 답변 생성 모델 Agent들을 생성하여 **메시지 큐에서 사용자가 보낸 문장을 꺼내 처리**

---

### POPO --- 개발자 포트폴리오 제작 사이트
<div id="popo-carousel" class="swiper-container"></div>
<script>
  imgList = [];
  for(let i=1;i<=7;i++){
    imgList.push(i + ".jpg");
  }
  swiperInitialize("popo-carousel", {
    path: "/img/project/popo",
    imgList: imgList,
    size: "100%",
    dotted: false,
    millis: 3000
  })
</script>

#### SUMMARY
(2020. 10. 13 ~ 2020. 11. 20)  

디자이너 포트폴리오 사이트에서 영감을 받아 **개발자 전용 포트폴리오 제작 사이트**를 만들자는 생각에서 제작하게 되었습니다.

기본적인 인적사항부터, 경력, 학력, 자격, 어학 등을 입력한 후 PDF로 저장이 가능하고 링크를 통해 제 3자가 조회할 수 있습니다.

포인트 색상이나 템플릿을 변경하여 다양성 제공

진행했던 프로젝트를 추가하고 각 프로젝트 별 세부사항 설명, 코드, 예시화면을 추가할 수 있습니다.

#### 기여

* 프로젝트 세부사항 API
  * MongoDB에 Embedded Document 형식으로 프로젝트 세부사항들을 CRUD하는 API 작성
* 프로젝트 세부사항 페이지
  * 추가한 프로젝트에 대해 어필하고 싶은 세부사항을 추가하는 페이지
  * Microsoft의 Monaco Editor를 사용, HTML, CSS, Javascript 코드를 작성하여 실행해 볼 수 있는 페이지
* CI / CD
  * 서비스의 **Dockerizing**
  * Jenkins와 Docker, Nginx를 이용한 Blue/Green 배포 방식의 **무중단 배포**