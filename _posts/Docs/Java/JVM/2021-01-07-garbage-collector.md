---
layout: post
category:
    - docs
    - java
tags:
    - first-java
title: Garbage Collector
description: >
    garbage collection과 그 과정에 대해

---
<!-- blank -->
* toc
{:toc}

## Prerequisites

* Garbage - 주소를 잃어버려 사용할 수 없는 메모리
* 앞으로 사용하지 않고 메모리를 가지고 있는 객체 역시 Garbage
* C++같은 언어는 개발자가 직접 해제해주어야 하지만 자바는 GC가 잡아주니 개발자 입장에서는 편리하다. 하지만 모든 메모리 누수를 잡아주는 것은 아니므로 경계해야 한다.

### Stop the World

* GC실행을 위해 JVM이 어플리케이션 실행을 멈추는 것
* GC가 실행될 때는 GC를 실행하는 스레드를 제외한 모든 스레드들이 작업을 멈춘다.
* GC작업이 완료된 이후에야 중단했던 작업을 다시 시작한다.
* 대개 GC 튜닝이란 이 시간을 줄이는 것을 말한다.

### Reachable

* Stack에서 Heap 영역의 객체에 대해 참조할 수 있는가
* 어떤 객체에 유효한 참조가 있으면 Reachable or unreachable
* unreachable객체가 garbage

## GC 과정

* Mark and Sweep 이라고도 함
* Mark - 스택의 모든 변수 또는 Reachable 객체를 스캔하며 어떤 객체를 참조하고 있는지 찾는 과정, 이 과정에서 Stop the World가 발생
* 이후 Mark되어 있지 않은 객체들을 힙에서 제거하는 과정이 Sweep

### Minor GC & Magor GC

* JVM의 Heap은 Young, Old, Perm 세 영역으로 나뉜다.
* Young 영역에서 발생한 GC를 Minor GC
* 나머지 두 영역에서 발생한 GC를 Magor GC(Full GC)

#### Young

* 새롭게 생성한 객체가 위치
* 대부분의 객체가 금방 unreachable상태가 되기 때문에 많은 객체가 Young 영역에 생성되었다가 사라진다.
* eden과 두 개의 Survivor 영역으로 나뉜다.

#### Eden

* 새로 생성한 대부분의 객체가 위치
* GC가 한 번 발생한 후 살아남은 객체는 Survivor 영역 중 하나로 이동
* Survivor 영역에 객체가 계속 쌓인다.
* 하나의 Survivor 영역이 가득 차게 되면 그 중에서 살아남은 객체를 다른 Survivor 영역으로 이동한다.
* 가득한 Survivor 영역은 아무 데이터도 없는 상태로 된다.
* 이 과정을 반복하다가 계속해서 살아남아 있는 객체는 Old영역으로 이동한다.
* 과정을 보면 알 수 있듯 Survivor 영역 중 하나는 반드시 비어있는 상태로 남아 있어야 한다.
* 두 Survivor영역에 모두 데이터가 존재하거나 두 영역 모두 사용량이 0이라면 시스템이 정상적인 상황이 아니라고 생각하면 된다.

#### Old
* Young 영역에서 reachable 상태를 유지해 살아남은 객체가 여기로 복사된다.

* 대부분 Young 영역보다 크게 할당. 크기가 큰 만큼 Young 영역보다 GC는 적게 발생

### GC

* 기본적으로 데이터가 가득 차면  GC를 실행
* GC 방식에 따라 절차가 달라진다.
* JDK 7을 기준으로 5가지 방식
    * Serial GC - 서버에서 사용하면 절대 안됨 싱글 코어용
        * Old 영역에 살아있는 객체를 Mark
        * 힙의 앞 부분부터 확인하여 살아있는 것만 남긴다(Sweep)
        * 마지막으로 각 객체들이 연속되게 쌓이도록 힙의 가장 앞 부분부터 채워서 객체가 존재하는 부분과 객체가 없는 부분으로 나눈다(Compaction)
    * Parallel GC
        * Serial GC를 여러 스레드로 처리하는 것
    * Parallel Old GC
    * Concurrent Mark & Sweep GC
    * G1(Garbage First) GC

### Perm
* Method Area라고도 한다
* 클래스와 메소드 정보와 같이 자바 언어 레벨에서는 거의 사용되지 않는 영역이다.


## Reachability

> 기본적으로 new로 할당되는 메모리들은 모두 Strong Reference를 가지기 때문에 캐시와 같은 것을 만든다고 할 때 메모리 누수에 조심해야 한다.
>
> 캐시의 키가 원래 데이터에서 삭제가 된다면 캐시 내부의 키와 같은 값은 더이상 의미가 없는 데이터, 즉 가비지가 된다.
>
> 그럼에도 GC는 삭제된 캐시의 키를 가비지로 인식하지 못한다.
>
> 이는 캐시에 넣어준 데이터가 String Reference로 독자적인 Reachability를 가지기 때문
>
> 따라서 캐시에 데이터를 넣어줄 때 원래 데이터에 Weak Reference를 넣어준다면 이러한 문제를 방지할 수 있다.
>
> Weak Reference는 new로 할당된 객체의 유효 참조를 인위적으로 설정할 수 있게 해주기 때문에 원래 데이터가 삭제되면 이 객체에  Weak Reference가 걸려있는 객체들은 모두 가비지로 인식된다.
>
> 위와 같은 이유로 캐시를 만들고자 할 때는 WeakHashMap을 사용하는 것을 권장한다.



