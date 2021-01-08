---
layout: post
category:
    - docs
    - computer-science
tags:
    - network
title: Blocking I/O, Non-blocking I/O
description: >

---
<!-- blank -->
{% assign network_imgpath = site.data['post_vars'].network.imgpath %}
* toc
{:toc}

<u>I/O 작업을 실제로 수행하는 것은 Kernel에서만 가능</u>하다.
유저 프로세스는 커널에게 요청을 하고 작업 완료 후 <u>커널이 반환하는 결과를 기다릴 뿐이다.</u>
{:.note}

## Blocking I/O
![blocking-io-model]({{network_imgpath}}/blocking-io-model.jpg)

유저가 커널에 `read`작업을 요청하고 `block`된다.  
커널은 데이터가 **입력될 때 까지 대기**한다.  
데이터가 입력되고 <u>유저에게 결과가 전달되어야만 유저 자신의 작업에 복귀할 수 있다.</u>  

유저는 요청을 보내놓고 응답이 올 때까지 하염없이 기다려야하므로 자원이 낭비된다.  

## Non-blocking I/O
`Blocking Model`의 비효율성을 극복하고자 도입된 방식이다.  
<u>I/O 작업이 진행되는 동안 유저 프로세스의 작업을 중단시키지 않는 방법</u>

![non-blocking-io-model]({{network_imgpath}}/non-blocking-io-model.jpg)

유저가 커널에 `read`작업을 요청하면 <u>데이터가 입력이 있건 없건 바로 결과가 반환된다.</u>  

유저는 입력 데이터가 있을 때까지 `read`작업을 반복하며(`polling`) **결과 메세지를 받은 유저는 다른 작업을 진행한다.**  

**그러나** 메세지를 확인하는 중간 중간에 다른 작업을 수행할 수 있다고 하더라도 <u>반복적인 시스템 호출은 자원 낭비이다.</u>  
이 문제를 해결하기 위해 `sync / async model`이 제안되었다.
