---
layout: post
category:
    - docs
    - computer-science
title: Blocking / Non-blocking, Sync / Async
description: >
---
<!-- blank -->
{% assign cs_imgpath = site.data['post_vars'].cs.imgpath %}
![2:2 Matrix]({{ cs_imgpath }}/blocking_non-blocking-2.png)

* toc
{:toc}

blocking과 sync, non-blocking과 async가 각각 비슷하지만 위 그림에서 다른 축으로 자리잡고 있는 이유가 있다.  
각각의 관심사가 다르기 때문인데 그것을 아래에 간단히 정리.

## Blocking / Non-blocking
* `호출된 함수`가 자신이 할 일을 모두 마칠 때까지 제어권을 계속 가지고 `호출한 함수`에게 돌려주지 않으면 `Block`
* `호출된 함수`가 자신이 할 일을 마치지 않았더라도 바로 제어권을 건네주어 `호출한 함수`가 다른 일을 진행할 수 있도록 하면 `Non-block`

## Synchronouse / Asynchronouse
* `호출된 함수`의 수행 결과 및 종료를 `호출한 함수`가 신경쓰면 `Sync`
* `호출된 함수`의 수행 결과 및 종료를 `호출된 함수` 혼자 직접 신경 쓰고 처리한다면 `Async`

## 2:2 Matrix
![2:2 Matrix]({{ cs_imgpath }}/blocking_non-blocking-1.png)