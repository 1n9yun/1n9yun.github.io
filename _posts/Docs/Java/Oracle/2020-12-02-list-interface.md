---
layout: post
category:
    - docs
    - java
tags:
    - collection-api
    
title: List Interface
description: >
related_posts:
    - 
---
<!-- blank -->

```java
public interface List<E> extends Collection<E>
```

* **An ordered Collection**
  * interface 사용자는 List의 integer index로 element에 access 가능하다.
* **Set과 다르게 List는 중복을 허용한다.**
  * More formally, allows pairs of elements e1, e2 such that e1.equals(e2)
  * null element를 허용한다면 여러 개의 null elements도 허용한다.
  * 중복 불가능하게 구현하여 exception을 throw하도록 할 수 있지만 흔하지 않은 사용법이다.
* **Collection interface 이상으로 추가적인 조건이 있다.**
  * iterator, add, remove, equals, hashCode methods에 대한 contract
* **List interface는 List elements에 positional access를 지원하는 네 가지 method를 제공한다.**
  * 어떤 구현체에서는 index value에 비례하는 시간에 실행된다.
    * ex) LinkedList ...
    * 따라서 구현을 알지 못하는 사용자는 indexing하는 것 보다 iterating하는 것이 더 낫다? (Thus, iterating over the elements in a list is typically preferable to indexing through it if the caller does not know the implementation.)
* **ListIterator라는 특별한 iterator를 제공한다.**
  * 기본적인 Iterator가 제공하는 동작과 더불어 element의 insertion, replacement, 양방향 access를 허용한다.
  * List의 특정 위치에서 시작하는 iterator를 얻는 메소드가 제공된다.
* **List interface는 특정 object를 search하는 두 가지 메소드를 제공한다.**
  * performance 관점에서 이런 메소드의 사용은 주의를 기울여야 한다.
  * 많은 구현체에서, 이 메소드들은 선형 검색 시간을 소요할 것이다.
* **List interface는 효율적으로 여러 elements를 임의의 위치에 insert, remove 하는 두 메소드를 제공한다.**
  * List를 자신 스스로를 element로 가질 수 있지만 그 경우 극히 주의가 필요하다.
    * equals, hashCode 메소드는 그런 List에 대해서 더 이상 잘 정의되지 않는다.(?)
* **어떤 List 구현체는 그들이 가질 수 있는 element에 제한이 있다.**
  * null element 금지
  * type 제한
  * ineligible element의 add 동작의 경우 unchecked exception을 throw한다.
    * NullPointerException
    * ClassCastException
  * ineligible element의 presence를 query하는 시도에 throw exception
    * 또는 간단하게 false를 return
* **Since 1.2 ~**
* **See Also**
  * Collection
  * Set
  * ArrayList
  * LinkedList
  * Vector
  * Arrays.asList(Object[])
  * Collections.nCopies(int, Object)
  * Collections.EMPTY_LIST
  * AbstractList
  * AbstractSequentialList

## Referece
[Oracle Java 8 Docs Collection API](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html){:target="_blank"}