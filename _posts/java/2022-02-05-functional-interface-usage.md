---
title: Java의 Functional Interface 활용해보기 (feat. 배치)
author: 1n9yun
date: 2022-02-05 17:50 +0900
categories: [Java]
tags: [functional-interface, java, paging]
mermaid: true
---

## 시작

우연히 처음으로 Java의 Functional Interface를 사용해볼 계기가 생겨서 해봤는데 재밌어서 정리해본다.

배치성 작업에서 DB 데이터를 페이징하여 모든 데이터를 탐색할 때, 계속해서 다음 페이지를 탐색하는 로직이 반복되는 상황을 개선하기 위해 사용해보았다.

```java
// query
List<Entity> query(SearchCondition search, int page, int pageSize) {
    // query a page
}

// action
void action(List<Entity> queryResult) {
    // do something ...
}

// batch
void batch() {
    // ...

    int page = 0;
    int pageSize = 5;

    boolean hasNext = true;

    while(hasNext) {
        List<Entity> result = query(search, page++, pageSize);
        hasNext = result.size() == pageSize;

        action(result);
    }

    // ...
}
```

위의 batch 메서드와 같이 while loop를 반복적으로 작성해야하는 문제가 있다.

## Java Function Interface (Java 8+)

관련 내용을 한 번도 공부해 본 적은 없지만 대충 찾아가며 해보았다.
우선 간단하게 어떤 기능들이 있는지 보면?

### Supplier

파라미터를 받지 않고 T타입 객체를 반환한다.

```java
public interface Supplier<T> {
    T get();
}
```

### Consumer

T타입 객체를 파라미터로 받고 반환은 하지 않는다.

```java
public interface Consumer<T> {
    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

### Function

T타입 객체를 파라미터로 받고 R타입 객체를 반환한다.

```java
public interface Function<T, R> {
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

### Predicate

T타입 객체를 파라미터로 받고 Boolean을 반환한다.

```java
public interface Predicate<T> {
    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

이 외에도 몇 가지 있는 것 같은데 일단 하고 싶었던 것 부터 해보자

## 구현

```java
static final int PAGE_SIZE = 10;

<R extends Collection<?>> void pageStream(
        Function<Pageable, R> query,
        Consumer<R> action
) {
    pageStream(query, action, PAGE_SIZE);
}

<R extends Collection<?>> void pageStream(
        Function<Pageable, R> query,
        Consumer<R> action,
        int pageSize
) {
    int currentPage = 0;
    boolean hasNext = true;

    while(hasNext) {
        R result = query.apply(new Pageable(currentPage++, pageSize));
        hasNext = result.size() == pageSize;

        action.accept(result);
    }
}

// query
List<Entity> query(SearchCondition search, Pageable pageable) {
    // query a page
}

// action
void action(List<Entity> queryResult) {
    // do something ...
}

void batch() {
    pageStream(
        (pageable) -> query(search, pageable),
        (queryResult) -> action(queryResult)
    );
}
```

이제 앞으로 batch 메서드처럼 사용하면 된다. 이전의 batch 메서드보다 훨씬 간단하다.

action에서 리턴 값이 있다거나하면 알아서 커스터마이징하면 될 것 같다.

끗