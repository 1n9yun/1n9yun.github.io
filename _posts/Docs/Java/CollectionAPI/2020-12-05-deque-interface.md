---
layout: post
category:
    - docs
    - java
tags:
    - collection-api
title: Deque Interface
description: >
related_posts:
    - 
---
<!-- blank -->

```java
public interface Deque<E> extends Queue<E>
```

* **양 끝에서 삽입 삭제를 지원하는 linear collection**

* **deque는 "double ended queue"의 줄임말이다.**

  * 보통 "deck" 발음한다.
  * 대부분의 deque 구현체는 포함할 수 있는 element 수의 고정된 제한이 없다.

  * 하지만 이 interface는 크기 제한이 없는 deque 뿐만 아니라 제한이 있는 deque도 지원한다.

* **deque의 양 끝을 access하는 메소드들을 정의한다.**

  * insert, remove, examine the element
  * 이러한 메소드들은 두 가지 형태다.
    * 동작이 실패하면 exception을 throw하거나 special value를 반환하거나.
    * special value : null or false (depending on operation)
    * 후자의 insert 동작은 크기 제한이 있는 Deque 구현체에서만 특별히 디자인된다.
      * 대부분의 insert 동작은 실패할 수 없다.

* **Summary of deque method**

  * First Element(Head)
    * throws exception
      * addFirst(e), removeFirst(), getFirst()
    * returns special value
      * offerFirst(e)
      * pollFirst()
      * peekFirst()

  * Last Element(Tail)
    * throws exception
      * addLast(e), removeLast(), getLast()
    * returns special value
      * offerLast(e)
      * pollLast()
      * peekLast()

* **이 interface는 Queue 인터페이스를 상속받는다.**

  * deque가 queue로써 사용될 때는 FIFO로 동작한다.
  * element들은 deque의 맨 끝에 추가되고 시작점에서 삭제된다.
  * queue interface로부터 상속받은 메소드들은 아래와 같이 deque의 메소드들과 정확히 동일하다.
    * add == addLast
    * offer == offerLast
    * remove == removeFirst
    * poll == pollFirst
    * element == getFirst
    * peek == peekFirst

* **또한 deque는 LIFO stacks 처럼 사용될 수 있다.**

  * 이 interface는 legacy stack class에 우선하여 사용되어야 한다.
  * stack으로 사용되는 경우 deque의 시작점에서 push, pop이 이루어진다.

  * stack 메소드들은 아래와 같이 deque의 메소드들과 정확히 동일하다.
    * push == addFirst
    * pop == removeFirst
    * peek = peekFirst

* **peek 메소드는 deque가 queue나 stack으로 사용될 때 동일하게 잘 동작한다.**
  * 어떤 경우든 deque의 element는 시작점으로부터 그려진다.

* **내부 element를 지울 때 두 가지 메소드를 제공한다.**

  * removeFirstOccurrence
  * removeLastOccurrence

* **List interface와 다르게 deque interface는 indexed access를 지원하지 않는다.**

* **Deque 구현체는 null element의 삽입을 엄격하게 금지할 필요가 있기 때문에 그렇게 하기를 강력히 권장한다.**

  * null element를 허용하는 deque 구현체의 사용자들은 null을 삽입하지 않는 것이 강력히 권장된다.
  * deque의 다양한 메소드에서 deque가 비어있음을 가리키는 special value로 쓰이기 때문이다.

* **Deque 구현체는 일반적으로 equals, hashCode 메소드를 element 기반 버전에서 정의하지 않고 Object 클래스에서 ID 기반 버전을 상속한다.**

* **Since 1.6**

## Referece
[Oracle Java 8 Docs Collection API](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html){:target="_blank"}