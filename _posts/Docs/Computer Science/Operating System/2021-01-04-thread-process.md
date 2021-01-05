---
layout: post
category: 
  - docs
  - computer-science
tags: operating-system
title: Process, Thread
description: >
  프로세스와 스레드에 대한 내용 정리
related_posts:
  - 
  # - project/_posts/2012-02-07-test-content.md
comments: true
---
<!-- blank -->

* toc
{:toc}

## Process
간단히, **실행중인 프로그램**  

사용자가 작성한 프로그램이 운영체제에 의해 메모리 공간을 할당받아 실행 중인 것

### 구조
* Code 영역 - 프로그램을 실행시키는 실행 파일 내의 명령어들이 올라감 (**소스코드**)
* Data 영역 - **전역 변수, static 변수**의 할당
* Heap 영역 - **동적할당**을 위한 메모리 영역
* Stack 영역 - **지역변수**, 함수 호출 시 전달되는 **파라미터**를 위한 메모리 영역
  * 함수 호출 시 스택의 모습은? or 재귀 호출 시?

### Multi-Processing
* 하나의 프로그램을 여러 프로세스로 구성하여 `Context Switching`을 통해 실행하는 것
* 하나의 프로세스에 문제가 생기더라도 **다른 프로세스에 영향을 미치지 않는다.**
  * 한편, 다른 프로세스의 변수나 자료 구조에 접근할 수 없다.
    * IPC(inter-process-communication)을 사용해야 한다. (파이프, 파일, 소켓 등)

### Context Switching
* 인터럽트에 의해 다음 우선 순위의 프로세스가 실행되어야할 때 기존 프로세스의 상태 또는 레지스터 값을 저장,
* 다음 프로세스를 수행하도록 새로운 프로세스의 상태 또는 레지스터 값을 교체하는 작업

### 교착 상태
서로 다른 프로세스가 서로의 자원을 요구하며 무한정 기다리는 현상

#### 조건
* **상호 배제** - 한 번에 한 프로세스만이 자원을 점유할 수 있다.
* **점유 대기** - 프로세스가 이미 자원을 점유하는 상태에서 다른 자원을 무한정 기다린다.
* **비선점** - 프로세스가 어떤 자원의 점유를 끝낼 때까지 그 자원을 뺏을 수 없다.
* **순환 대기** - 각 프로세스들이 원형으로 구성되어 순환적으로 자원을 요구한다.

## Thread
프로세스 내에서 실제로 작업을 수행하는 주체

모든 프로세스에는 한 개 이상의 스레드가 존재하여 작업을 수행한다.
* 프로세스가 실행되면 기본적으로 하나의 메인 스레드가 생성된다.
* 프로세스 내에서 각각 Stack만 따로 할당받고 나머지 Code, Data, Heap영역을 공유한다.

### Multi-Threading
* 프로그램을 한 프로세스 내에 여러 개의 스레드로 구성하여 실행하는 것
* 멀티 프로세스보다 멀티 스레드가 효율적이다.
  * 스레드 간의 통신 비용이 훨씬 적기 때문
* 동기화에 신경써야 한다.
  * 스레드 간의 자원 공유는 전역 변수를 이용하기 때문.

웹 서버가 대표적인 Multi Threaded Application
{:.note}

#### 동시성 (Concurrency)
**하나의 코어에서 멀티 스레드를 동작**시키기 위한 방식.  
여러 개의 스레드가 번갈아가면서 실행되는 성질이다.  
스레드들이 병렬적으로 실행되는 것 처럼 보이지만 사실은 번갈아가면서 조금씩 실행되고 있는 것.  

##### 동시성 제어







#### 병렬성 (Parallelism)
**멀티코어에서 멀티 스레드를 동작**시키는 방식.  
한 개 이상의 스레드를 포함하는 각 코어들이 동시에 실행되는 성질.  

##### 데이터 병렬성(Data parallelism)
전체 데이터를 쪼개 서브 데이터들로 만든 뒤, **서브 데이터들을 병렬 처리**하여 작업을 빠르게 수행하는 것.  
<!-- parallelStream 장애 사례 https://multifrontgarden.tistory.com/254 -->
`Java 8`에서 지원하는 `ParallelStream`이 이것을 구현한 것이다.  
서브 데이터는 **멀티 코어의 수만큼 쪼개어 각각의 데이터들을 분리된 스레드에서 병렬 처리**한다.

##### 작업 병렬성(Task parallelism)
**서로 다른 작업을 병렬 처리**하는 것.  

대표적으로 **웹 서버 어플리케이션**이 있다.  
각각의 브라우저에서 **요청한 내용을 개별 스레드에서 병렬로 처리**한다.

[~~Blocking I/O & non-Blocking I/O~~](javascript:console.log('아직'))
{:.note title="참고"}

### Thread Pool
* 특정 스레드 개수 + 작업 큐를 만들어 놓고 **작업들을 큐에 넣어 둔다.**  
* **작업이 끝난 스레드가 큐에서 작업을 꺼내** 기능을 수행하도록 한다.  

아무리 요청이 폭주해도 스레드의 전체 개수가 늘어나지 않기 때문에 **어플리케이션의 성능이 급격히 저하되지 않는다.**  

<!-- 스레드 풀 정리하기 https://honbabzone.com/java/java-thread/ -->
[~~자세한 내용~~](javascript:console.log("아직"))

## Thread & Process
{% assign post_vars = site.data['post_vars'] %}

![thread process]({{ post_vars.os.imgpath }}/thread_process.gif)
from IBM knowledgecenter
{:.figcaption}

## Scheduling
일반적으로 `CPU 스케줄링`, `프로세스 스케줄링`, `커널 스레드 스케줄링`을 모두 같은 개념으로 사용한다.

## Reference
<https://honbabzone.com/java/java-thread/>