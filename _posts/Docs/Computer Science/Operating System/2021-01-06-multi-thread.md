---
layout: post
title: Multi Thread
category:
    - docs
    - computer-science
tags:
    - operating-system

description: >
    많은 분량이 예상되서 [Thread, Process](/docs/computer-science/2021-01-04-thread-process) 글에 다 적지 못했던 Multi-Thread에 대한 이야기.

related_posts:
    - /docs/computer-science/2021-01-04-thread-process/
---
<!-- blank -->
* toc
{:toc}

## Prerequisites
<u>Multi Thread</u>를 다룰 때 기초가 되는 가시성과 원자성의 정의  
또한 이러한 성질은 <u>Thread</u>가 동시에 접근이 가능한 공유 변수에 대한 이야기이다.

### 가시성(Visibillity)
CPU는 메모리에 왔다갔다 하는 시간을 아끼기 위해 <u>CPU cache</u>라는 것을 가지고 있는데 Thread가 동작하는 시점에 선언한 변수의 값이 메모리에만 존재하는 것이 아니라 이 <u>CPU cache</u>에도 가지고 있다.  
문제는 이 <u>CPU cache</u>에 있는 값이 언제 메모리에 옮겨 갈지 모른다는 것이다.  

따라서 <u>한 스레드에서 변경한 특정 메모리 값이 다른 스레드에서 제대로 읽어지는가?</u>를 가시성이라고 한다.  

또한 이 가시성을 보장하기 위해 뮤텍스, 임계영역을 사용해 메모리 장벽을 만든다고 한다.  