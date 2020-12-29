---
layout: post
category:
    - docs
    - java
tags:
    - collection-api
    
title: Collection Interface
description: >
related_posts:
    - 
comments: true
---
<!-- blank -->

```java
public interface Collection<E> extends Iterable<E>
```

* **The root interface in the collection hierarchy.**
* **A collection represents a group of objects, known as its elements.**
  * 어떤 건 중복을 허용하거나 안하거나.
  * 어떤 건 정렬되어 있거나 안되어 있거나.
* **The JDK does not provide any direct implementations of this interface.**
  * it provides implementations of more specific subinerfaces.
    * like Set, List...
  * This interface is typically used to pass collections around and manipulate them where maximum generality is desired.
  * but Bags or multisets(unordered collections that may contain duplicate elements) should implement this interface directly.
* **일반적인 목적으로 한 subinterface를 통해 이 interface를 간접적으로 구현하는 class들은 두 표준 생성자를 제공해야 한다.**
  * void constructor (no arguments) : 빈 collection을 생성
  * a constructor with a single argument of type Collection : argument와 같은 elements를 가진 새 collection을 생성
  * 이 convention을 강제하진 않으나 모든 Java platform libraries의 general-purpose collection의 구현체에는 적용되어 있다.
* **collection이 지원하지 않는 operation에 대해 UnsupportedOperationException을 throw 하도록 하는 methods를 포함한다.**
  * 호출이 collection에 변화를 주지 않는다면 exception은 필요하지 않다.
  * ex) addAll(Collection) method를 불변 collection에 호출한 경우 
    * 하지만 추가할 collection이 비어있다면 예외를 throw할 필요는 없다.
* **some collection 구현체는 가지고 있을 수 있는 element에 제한을 가지고 있다.**
  * null element를 금지
  * element type에 제한
  * ineligible element를 추가할 때 unchecked exception을 throw
    * NullPointException, ClassCastException ...
  * ineligible element의 presence를 query하는 시도에 throw exception
    * 또는 간단하게 false를 return
* **자체 동기화 정책을 결정하는 것은 각 collection에 달려있다.**
  * 강력한 지침(stronger guarantee)이 구현에 없는 경우 다른 스레드에 의해 변경되는 컬렉션에 대한 메서드의 호출로 예상치 못한 동작이 발생할 수 있다.
    * 직접 호출, 메서드에 컬렉션 전달, iterator
* **Collections Framework interfaces의 많은 메소드들은 `equals`메소드에 관해 정의되어 있다.**
  * `contains(Object o)`
    * Collection.contains를 호출하면 o.equals(e)가 모든 요소 e에 대해 호출된다는 것을 의미하는 것으로 해석되어서는 안된다.
    * 두 요소의 해시 코드를 먼저 비교하여 equals 호출을 피하는 최적화를 자유롭게 구현할 수 있다.
* **collection의 재귀적 순회를 수행하는 일부 collection operation은 collection이 직/간접적으로 자신을 포함하는 자체참조 instance에 대한 exception과 함께 실패할 수 있다.**
  * `clone()`
  * `equals()`
  * `hashCode()`
  * `toString()`
  * 선택적으로 자체 참조 시나리오를 처리할 수 있지만 대부분의 현재 구현체는 그렇지 않다.

* **기본 메소드 구현에서 동기화 프로토콜을 적용하지 않는다.**
  * collection 구현에 특정 동기화 프로토콜이 있는 경우 해당 프로토콜을 적용하려면 기본 구현을 재정의 해야 한다.
* **Since 1.2 ~**
* **See Also**
  * Set
  * List
  * Map
  * SortedSet
  * SortedMap
  * HashSet
  * TreeSet
  * ArrayList
  * LinkedList
  * Vector
  * Collections
  * Arrays
  * AbstractCollection


## Referece
[Oracle Java 8 Docs Collection API](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html){:target="_blank"}