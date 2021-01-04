---
layout: post
category:
    - docs
    - java
tags:
    - collection-api
    
title: Queue Interface
description: >
related_posts:
    - 
---
<!-- blank -->

```java
public interface Queue<E> extends Collection<E>
```

* **처리 전에 element를 보관하도록 설계된 collection**
* **기본적인 collection의 기능들 외에 추가적으로 삽입, 추출, 검사 기능을 제공**
  * 이 추가적인 메소드들은 두 가지 형태로 존재
    * 동작이 실패하면 exception을 throw
      * add, remove, element
    * 동작이 실패하면 특별한 값을 반환(동작에 따라 null, false)
      * 용량이 제한된 Queue 구현에 사용되도록 특별히 설계,
        * 대부분의 구현에서 삽입 작업은 실패할 수 없다.
      * offer, poll, peek
* **Queue는 일반적으로 FIFO 방식으로 element를 유지하지만 반드시 그렇지는 않다.**
  * 예외로는 요소의 natural ordering에 따르거나 comparator에 의해 요소를 정렬하는 PriorityQueue와 LIFO Queue(or Stack)
  * 어떤 정렬을 사용하던, queue의 head element는 remove 또는 poll의 호출로 제거된다.
  * FIFO Queue의 경우 모든 새로운 element는 queue의 꼬리에 삽입된다.
    * 다른 종류의 Queue의 경우 다른 규칙을 사용한다.
  * 모든 Queue 구현체는 순서 속성을 지정해야 한다.

* **Offer 메소드는 element의 삽입이 가능하면 삽입하지만 불가능하면 false를 반환한다.**
  * 실패 시 unchecked exception을 throw하는 Collection.add 메소드와 차이
  * offer 메소드는 fixed-capacity(or bounded) Queue에서 처럼 예외적인 발생이 아닌 정상적인 오류일 때 사용하도록 설계되었다.

* **remove, poll 메소드는 queue의 head element를 제거하고 반환하는 메소드**
  * Queue에서 정확히 어떤 element가 제거되는지는 구현마다 다른 Queue의 order policy에 따라 다르다.
  * remove, poll 메소드는 오직 빈 queue에서의 동작에서 차이를 보인다.
    * remove 메소드는 exception을 throw
    * poll 메소드는 null을 리턴
* **element, peek 메소드는 Queue의 head element를 반환하고 제거하진 않는다.**
* **Queue interface는  concurrent programming에서 일반적인 blocking queue 메소드를 정의하지 않는다.**
  * element가 나타나거나 공간이 사용 가능해지길 기다리는 이런 메소드들은 이 interface를 상속받는 BlockingQueue interface에 정의되어 있다.

* **LinkedList와 같은 일부 구현체는 null의 삽입을 허용하지만, Queue의 구현체는 일반적으로 허용하지 않는다.**
  * 이를 허용하는 구현체에서도 null을 Queue에 삽입해서는 안된다.
    * null은 poll 메소드에서 Queue에 element가 없음을 나타내는 특별한 반환 값으로도 사용되기 때문
* **Queue 구현체는 일반적으로 equals, hashCode 메소드를 element 기반 버전에서 정의하지 않고 Object 클래스에서 ID 기반 버전을 상속한다.**
  * element기반 equality는 element는 같지만 순서 지정 속성이 다른 Queue에 대해 항상 잘 정의되지 않기 때문
* **Since 1.5**

## Referece
[Oracle Java 8 Docs Collection API](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html){:target="_blank"}