---
layout: post
title: InnoDB Lock
category:
    - docs
    - computer-science
tags:
    - database
description: >
    InnoDB 엔진에서 사용하는 Lock의 종류에 대해
---
<!-- blank -->
* toc
{:toc}

## InnoDB의 Lock
lock은 모두 `transaction`이 `commit`되거나 `rollback`될 때 함께 unlock된다.

### Row-level Lock
테이블의 row마다 걸리는 가장 기본적인 lock.  
shared lock과 exclusive lock 두 종류가 있다.

#### Shared Lock(S Lock)
read에 대한 lock.

일반적인 `select`쿼리는 lock을 사용하지 않고 DB를 읽어들이지만 `select ... for share` 등 일부 `select` 쿼리는 read작업을 수행할 때 InnoDB가 각 row에 S Lock을 건다.

#### Exclusive Lock(X Lock)
write에 대한 lock.

`select ... for update`, `update`, `delete`등의 수정 쿼리를 날릴 때 각 row에 걸리는 lock

#### 규칙
* 여러 `transaction`이 동시에 한 row에 S Lock을 걸 수 있다. 즉, 여러 `transaction`이 동시에 한 row를 읽을 수 있다.
* S Lock이 걸려있는 row에 다른 `transaction`이 X Lock을 걸 수 없다. 즉, 다른 `transaction`이 읽고 있는 row를 수정하거나 삭제할 수 없다.
* X Lock이 걸려있는 row에는 다른 `transaction`이 S Lock과 X Lock 둘다 걸 수 없다. 즉, 다른 `transaction`이 수정하거나 삭제하고 있는 row는 읽기, 수정, 삭제가 불가능하다.

<u>S Lock을 사용하는 쿼리끼리는 같은 row에 접근 가능</u>  
<u>X Lock이 걸린 row는 다른 어떠한 쿼리도 접근 불가능</u>

### Record Lock
row가 아니라 DB의 index record에 걸리는 lock.  
마찬가지로 S Lock과 X Lock이 있다.

### Gap Lock
<!-- DB index에 대해 공부한 다음 정리! -->