---
layout: post
title: Concurrent Programming
category:
    - docs
    - java
tags:
    - 
    # - operating-system

description: >
    [Thread, Process](/docs/computer-science/2021-01-04-thread-process) 글에 다 적지 못했던 Multi-Thread에 대한 이야기.

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
문제는 이 <u>CPU cache</u>에 있는 값이 **언제 메모리에 옮겨 갈지 모른다는 것이다.**  

따라서 <u>한 스레드에서 변경한 특정 메모리 값이 다른 스레드에서 제대로 읽어지는가?</u>를 가시성이라고 한다.  

또한 이 가시성을 보장하기 위해 뮤텍스, 임계영역을 사용해 메모리 장벽을 만든다고 한다.  

### 원자성(Atomicity)
원자단위 연산(Atomic Operation)은 <u>실행중에 중단하지 않는 하나 이상의 순차적인 기계어 명령</u>으로 이루어져있으며 대개 2개 이상의 기계어 명령으로 이루어진 경우는 원자단위 연산이라 하지 않는다.  

따라서 하나의 기계어 명령은 항상 원자성을 가지며 여러 명령이 원자성을 가지게 하고 싶다면 `locking`등의 동기화 방법을 사용해야 한다.  

공유되는 변수를 변경할 때 기존의 값을 기반으로 새로운 값이 결정되는 과정에서 여러 Thread가 이를 동시에 수행할 때 생기는 이슈  

>   **i++ 연산**  
    자연어 입장에서는 하나의 문장이지만 CPU가 이를 수행하기 위해서는 3가지 명령이 동작한다.  
>   1. i의 기존 값을 읽는다.  
>   2. i에 1을 더한다.  
>   3. 새로운 i의 값을 변수에 할당한다.
>
>   이를 2개 이상의 스레드가 동시에 실시한다고 했을 때 `i++`가 원자성을 가진 연산이 아니기 때문에 `Thread-1`이 값을 읽고 i+1을 할당하기 이전에 `Thread-2`가 i를 읽어 i+1를 수행하고 할당한다면 후자의 연산은 무효가 되는 현상이 발생한다.

