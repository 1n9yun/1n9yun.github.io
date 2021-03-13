---
layout: post
title: Transaction
category:
    - docs
    - computer-science
tags:
    - database
description: >
    데이터베이스에서 ACID와 Transaction Isolation Level에 대해
---
<!-- blank -->
* toc
{:toc}

데이터베이스의 데이터를 조작하는 작업의 단위
{:.note title="Transaction ?"}

## ACID
* Atomicity --- 작업이 부분적으로 성공하는 일이 없도록 보장하는 성질
* Consistency --- `transaction`이 끝날 때 DB의 여러 제약 조건에 맞는 상태를 보장하는 성질
* Isolation --- `transaction`이 진행되는 중간 상태의 데이터를 다른 `transaction`이 볼 수 없도록 보장하는 성질
* Durability --- `transaction`이 성공했을 경우 해당 결과가 영구적으로 적용됨을 보장하는 성질

### ACID 원칙은 종종 지켜지지 않는다.
strict하게 지키려면 동시성이 매우 떨어지기 때문이다.

따라서 DB 엔진은 ACID 원칙을 희생하여 동시성을 얻을 수 있는 방법을 제공한다.  
바로 `transaction`의 `Isolation Level`이다.

## Isolation Level
각 `level`에 따라 서로 다른 `locking`전략을 취하는데, `level`이 높아질수록 더 많이 더 빡빡하게 `lock`을 거는 것이다.  

또한 각 `level`을 언제 사용해야 하는지, 위험성은 무엇인지 알기 위해서는 각 `locking`전략을 파악해야 한다.

[InnoDB Lock](/docs/computer-science/2021-01-13-innodb-lock)  
<br>
**Consistent Read(Consistent Non-locking Read)**  
non-locking read operation(기본 select)을 수행할 때 동시에 실행중인 다른 트랜잭션에서 데이터를 변경하더라도 특정 시점의 DB snapshot을 이용하여 기존과 동일한 결과를 읽어오는 것이다.  
간단히, Lock을 이용해 구현가능해 보이지만 동시성이 매우 떨어질 수 있다.  
따라서 InnoDB 엔진은 실행했던 쿼리의 log를 통해 지원한다.  
<br>
**Phantom Read**  
간단히, `transaction`중에 없던 행이 추가되어 새로 입력된 데이터를 읽는 것 또는 `transaction`중에 데이터가 삭제되어 다음 읽기 시 이전에 존재하던 행이 사라지는 것  
<br>
**Dirty Read**  
생성, 갱신, 혹은 삭제 중에 커밋 되지 않은 데이터 조회를 허용함으로써, 트랜잭션이 종료되면 더 이상 존재하지 않거나, 롤백되었거나, 저장 위치가 바뀌었을 수도 있는 데이터를 읽어들이는 현상  
<br>
**Unrepeatable Read**  
트랜잭션 내에서 한 번 읽은 데이터가 트랜잭션이 끝나기 전에 변경되었다면, 다시 읽었을 때 새로운 값이 읽히는 것을 의미한다.  
{:.note title="Prerequisites"}

### REPEATABLE READ
InnoDB 엔진에서 사용하는 기본 레벨이며 간단히 말해서 <u>transaction이 시작되기 전에 commit된 내용에 대해서만 조회할 수 있는 isolation level이다.</u>  
이를 만족시키기 위해 MySQL InnoDB 엔진은 아래 두 가지 방식을 사용한다.

* consistent non-locking read를 사용한다.
* 명시적으로 Locking read를 할 수 있도록 `select ... for share`, `select ... for update` 구문을 제공

**처음으로 read operation을 수행한 시간을 기록하고 그 이후의 read operation마다 기록한 시점을 기준으로 consistent read를 수행한다.**

첫 read 시의 snapshot을 보기 때문에 새로 commit된 데이터는 보이지 않는다.

SQL 표준에 따르면 **REPEATABLE READ의 경우 phantom read가 발생**하지만 <u>MySQL InnoDB 엔진의 경우 consistent read를 사용하기 때문에 발생하지 않는다고 한다.</u>
{:.note}

<!-- index 공부 하고 ~~
REPEATABLE READ에서 locking이 어떻게 사용되는지 케이스별 분석
locking read 구문들과, UPDATE, DELETE이 수행될 때 실제 lock이 적용되는 방식은 SQL statement의 조건과, 대상 테이블의 컬럼에 index가 걸려있는지, 해당 index가 unique 한지에 따라 달라진다. 아래에 상황별로 정리를 해 보았다.

unique index가 적용된 컬럼을 특정 값으로 검색
예) ... WHERE pk=8
찾아진 하나의 인덱스 레코드에만 lock적용
그 외의 경우
unique index 컬럼을 범위로 검색
예) ... WHERE pk > 100
non-unique index 컬럼을 특정 값 또는 범위로으로 검색
예) ... WHERE field = 3 or ... WHERE field > 4
gap lock 또는 next-key lock을 이용해서 스캔한 인덱스 범위에 lock을 적용해서 다른 세션이 해당 범위에 INSERT하는 것을 막는다.
위에 언급된 개별적인 lock 들에 대한 더 자세한 설명은 MySQL InnoDB lock & deadlock 포스팅을 참고하면 된다. -->

<!-- REPEATABLE READ vs READ COMMITTED 
https://suhwan.dev/2019/06/09/transaction-isolation-level-and-lock/
-->

### READ UNCOMMITTED
READ UNCOMMITTED 레벨의 경우 lock을 사용하지 않는다.  
따라서 `dirty read`가 발생할 수 있는데 이는 InnoDB 엔진이 `transaction`을 `commit`하는 방법 때문이다.

InnoDB엔진은 일단 실행된 모든 쿼리를 `commit`이 되지 않았어도 DB에 적용한다. 따라서 `consistent read`를 하지 않고 해당 시점의 DB를 읽으면 `dirty read`가 발생하는 것이다.

> InnoDB uses an optimistic mechanism for commits, so that changes can be written to the data files before the commit actually occurs. This technique makes the commit itself faster, with the tradeoff that more work is required in case of a rollback. --- *from MySQL Reference*


### READ COMMITTED
commit된 데이터만 보이는 수준의 isolation을 보장하는 level이다.
`REPEATABLE READ`와는 다르게 **매 read operation마다 DB snapshot을 생성한다.** 그러므로 다른 `transaction`이 commit한 후 다시 read operation이 수행되면 해당 변화를 볼 수 있다. 또한 `phantom read`가 발생할 수 있다.

`REPEATABLE READ`와 같이 locking read를 할 수 있도록 동일하게 `select ... for share`, `select ... for update`구문이 제공되지만 **적용되는 lock의 범위가 달라지는 것에 주의해야 한다.**

<!-- index 공부하고 ~~
READ COMMITTED 레벨에서 locking이 어떻게 사용되는지 케이스별 분석
READ COMMITTED 레벨로 설정된 경우 동일하게 locking read 구문 및, UPDATE, DELETE이 수행되더라도 REPEATABLE READ일 때보다 더 적은 범위에 대해서 lock이 적용된다.

locking read, UPDATE, DELETE 구문이 실행될때 “찾아진 레코드”에만 락을 건다.
레코드를 찾기위해 스캔했던 인덱스 레코드에 대해서는 gap lock을 적용하지 않기 때문에 해당 gap에 대해 다른 트랜잭션에서 자유롭게 INSERT가 가능하다. (Phantom read 발생)
foreign-key 제약과 duplicate-key 확인을 위해서만 gap lock이 사용된다.
lock이 적어지는 만큼 동시성이 좋아진다.
deadlock이 발생할 확률이 REPEATABLE READ보다는 줄어들지만, 여전히 발생 가능성은 존재한다. -->

### SERIALIZABLE
`Transaction Isolation Level`이 `SERIALIZABLE`로 설정되면 InnoDB는 자동으로 일반적인 `select`구문을 `select ... for share`로 변경하여 실행한다. 그 외에는 `REPEATABLE READ`레벨과 동일하다.

<!-- deadlock이 걸리는 경우 -->
`SERIALIZABLE` 레벨의 경우 데이터를 안전하게 보호할 수는 있지만 **굉장히 쉽게 deadlock에 걸릴 수 있다.** 따라서 신중하게 계산하고 사용해야 한다.

## Reference
<https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html>
<https://www.letmecompile.com/mysql-innodb-transaction-model/>
<https://suhwan.dev/2019/06/09/transaction-isolation-level-and-lock/>
