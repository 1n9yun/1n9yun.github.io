---
layout: post
title: 디스크 스케줄링
category:
    - docs
    - computer-science
tags:
    - operating-system
description: >
    디스크 스케줄링 알고리즘에 대해
---
# 디스크 스케줄링

{% assign os_imgpath = site.data['post_vars'].os.imgpath %}

* toc
{:toc}

디스크 접근 시간은 탐색 시간과 회전 지연 시간으로 이루어진다.  
디스크 대역폭은 단위 시간 당 전송되는 총 바이트 수를 의미한다.  
효율적인 스케줄링은 이 둘을 모두 향상 시킬 수 있다.

프로세스가 입/출력을 필요로 할 때마다 운영체제에 system call을 하는데 이 호출에는 여러가지 인수가 주어진다.

* 입력인가 출력인가
* 디스크 주소
* 메모리 주소
* 전송될 섹터 수

디스크가 유휴상태라면 즉시 처리되지만 아니라면 큐에 들어가 기다려야 한다. 다중 프로그래밍에서는 많은 프로세스들이 디스크를 공유하므로 이 큐에는 여러 디스크 입/출력 요청들이 함께 대기하고 있을 수 있다.

이 때 대기하는 작업의 처리 순서를 제어하는 여러 알고리즘을 정리함.

## 선입 선처리 (FCFS)
가장 간단한 형태이며 공평해 보이지만 빠른 서비스를 제공하지는 못한다.

![FCFS]({{os_imgpath}}/disk-scheduling-fcfs.png)

## 최소 탐색 시간 우선 (SSTF)
현재 위치에서 <u>가장 가까운 위치에 있는 요청을 먼저 처리한다.</u>  
**starvation이 발생할 수 있다.**

![SSTF]({{os_imgpath}}/disk-scheduling-sstf.png)

## SCAN
디스크 암이 한쪽 끝에서 시작하여 다른 끝으로 이동하며 <u>가는 길에 있는 모든 요청을 처리한다.</u>  
그리고 다른 <u>한쪽 끝에 도달하면 역 방향으로 이동</u>하면서 오는 길에 있는 요청을 처리한다.

![SCAN]({{os_imgpath}}/disk-scheduling-scan.png)

## C-SCAN
SCAN 스케줄링에서 각 요청에 걸리는 시간을 좀 더 균등하게 하기 위한 방법이다.  
한쪽 끝에 다다르면 반대 방향으로 헤드를 이동하며 처리하는 것이 아니라 <u>처음 시작했던 자리로 되돌아가서 서비스를 시작한다.</u>  

![C-SCAN]({{os_imgpath}}/disk-scheduling-c-scan.png)

## LOOK
SCAN이나 C-SCAN은 헤드를 디스크의 끝에서 끝으로 이동한다는 점에 유의해야 한다. 그러나 실제로 이런 방식으로 구현하지는 않는다.  
<u>각 방향으로 가다가 그 방향에서 기다리는 요청이 없다면 이동 방향을 즉시 바꾼다.</u>  

SCAN 또는 C-SCAN에서 현재 방향에 남은 요청이 있는지 확인(Look for)하기 때문에 각각 LOOK, C-LOOK 스케줄링이라 한다.

![C-LOOK]({{os_imgpath}}/disk-scheduling-c-look.png)