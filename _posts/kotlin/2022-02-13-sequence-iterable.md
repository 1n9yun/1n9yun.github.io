---
title: Sequence.kt (feat. Iterable)
author: 1n9yun
date: 2022-02-13 03:21 +0900
categories: [Kotlin]
tags: [kotlin, collections]
mermaid: true
---

> References  
> [kotlinlang](https://kotlinlang.org/docs/sequences.html)

## 시작

블로그를 다시 시작해보기로 하면서, 미래의 유입을 위해 한창 코테 준비할 때 풀었던 알고리즘 문제의 정답 코드들을 올려놓자는 생각을 했다.

당연히 너무 많아서 하나하나 풀이를 다시 정리할 건 아니었고, 정답 코드만 올려놓으려고 코틀린으로 파일들을 만들어 한 번에 올리려고 했는데.. 이상한 현상(?)들이 있어서 기록하고자 한다.

### Sequence

`Kotlin`에는 `Sequence`라는 컨테이너 타입이 있다. `Iterable`과 같은 기능을 제공하지만, 여러 단계로 이루어진 컬렉션 처리에서 다르게 동작하도록 구현되어 있다.

간단히 말하면,

`Iterable`은 각 단계를 바로바로 처리하여 중간 결과를 가지고 다음 단계를 처리한다.  

반면 `Sequence`는 `Collection`의 모든 단일 요소에 대해 모든 처리 과정이 중간 결과 없이 처리되며, 실제 처리는 `lazy`하게 전체 처리 결과가 요청될 때 실제 연산이 수행된다.

따라서 `Sequence`는 `Iterable`에 비해 향상된 퍼포먼스를 얻을 수 있다.

다만 작은 크기의 `Collection`이나, 간단한 연산을 수행하는 경우, 또는 결과를 여러 번 요청하게 되는 경우에는 오히려 오버헤드를 유발할 수 있으므로 상황에 따라 `Iterable`과 함께 고려되어야 한다.

#### Example

`someList`는 `Int`로 구성된 `List`라고 생각하면

```kotlin
val squaredList = someList
    .map { (it * it).also { result -> println("$it * $it = $result") } }

println("Squared Complete")

val evenList = squaredList
    .filter { (it % 2 == 0).also { result -> println("$it is ${if (result) "even" else "odd"}")} }

println("Filtered Complete")

val result = evenList.sum()

println(result)
```
의 결과는 어떻게 될까?

현재 코틀린을 사용한 지 4개월이 되었지만 오늘까지만 해도 위 코드의 결과는 당연히

```
1 * 1 = 1
2 * 2 = 4
3 * 3 = 9
4 * 4 = 16
5 * 5 = 25
Squared Complete
1 is odd
4 is even
9 is odd
16 is even
25 is odd
Filtered Complete
20
```
라고 생각했었다. 

하지만 someList가 `Sequence`를 구현하고 있었다면 결과는 다음과 같다.

```
Squared Complete
Filtered Complete
1 * 1 = 1
1 is odd
2 * 2 = 4
4 is even
3 * 3 = 9
9 is odd
4 * 4 = 16
16 is even
5 * 5 = 25
25 is odd
20
```
실제 값의 참조가 필요한 `sum` 메서드에서 쌓여있는 `Sequence`의 모든 처리 과정이 각 요소마다 수행되면서 결과를 만들어낸다.

위 처럼 내가 예상했던 순서로 결과가 나오지 않는 것이 `이상한 현상 1` 이었다.

##### Misuse

다음은 `이상한 현상 2`이면서 `Sequence`의 잘못된 사용 예시다.

실제로 [하고 싶었던 것](#시작)을 하기 위해 아래와 같은 코드를 작성했다.

```kotlin
val files = File(path).walk()
```
> `walk`메서드는 `path`에 있는 파일, 디렉토리를 재귀적으로 탐색할 수 있게 해준다.

바로 이 메서드의 리턴이 `Sequence`를 구현하고 있었는데

```kotlin
val result = files
    .filter { it.isFile }
    .filter { runCatching { mayThrowSomething(it) } }

result
    .filter { it.isSuccess }
    .forEach { doSomething(it) }

result
    .filter { it.isFailed }
    .forEach { doSomeOtherthing(it) }
```
이 코드에서 주의사항이 있다. 바로

<div class="collapsible-header" markdown="1">
###### **요거다**
</div>
<div class="collapsible-body" markdown="1" style="display: none">

`1 ~ 3` 라인이 `5 ~ 7`, `9 ~ 11` 라인에서 중복 실행된다.  
`mayThrowSomething` 메서드가 10초 걸리는 메서드라면 하나의 요소에 대해 20초를 기다려야 하며 불필요한 10초가 낭비되는 것이다.

이 상황에선 `files`의 결과를 `Iterable`로 변환하여 사용하거나, `result`까지의 결과를 미리 만들어두어야 할 것이다.

다만 미리 결과를 만들어 두는 경우는 `Iterable`과 중복되는 역할이므로 두 `filter`를 처리하는 과정이 `Iterable`이 효율적인지, `Sequence`가 효율적인지에 대한 판단이 필요할 것이다.
</div>

끗