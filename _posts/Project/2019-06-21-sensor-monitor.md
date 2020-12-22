---
layout: post
category: project
title: Sensor Monitor - 고장 진단 시스템
description: >
  --- 2019. 06. 21. ~ 2019. 10. 18.
  <br>
  4학년 때 산학 협력 기업 인턴 중 진행한 프로젝트 ( 나의 첫 프로젝트 !! )
  <br><br>
  최대 수 십개의 센서 보드가 연결되며 각각의 센서 보드의 센서 값들을 모니터링하고 사용자가 지정한 안전 범위를 벗어날 때(고장 진단) 앱으로 알림을 보내주는 프로그램을 제작하였습니다.  

  **작성중 ...**
  <br><br>
  ![C#](https://img.shields.io/badge/-C%23-brightgreen)
  ![WPF](https://img.shields.io/badge/-WPF-blue)
  ![MySQL](https://img.shields.io/badge/-MySQL-blue)
  ![SQLLocalDB](https://img.shields.io/badge/-SQLLocalDB-blue)
  ![Android](https://img.shields.io/badge/-Android-green)
related_posts:
  - 
  # - project/_posts/2012-02-07-test-content.md
comments: true
---
<!-- blank -->
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

# 소개
<div id="sensor-monitor-carousel" class="swiper-container"></div>
<script>
  imgList = [];
  for(let i=1;i<=8;i++){
    imgList.push("MonitorApp_Usage_Private-" + i + ".jpg");
  }
  swiperInitialize("sensor-monitor-carousel", {
    path: "/img/project/sensor-monitor",
    imgList: imgList,
    size: "100%",
    dotted: false,
    millis: 5000
  })
</script>

## 구조