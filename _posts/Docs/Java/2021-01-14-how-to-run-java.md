---
layout: post
title: How to run .java
category:
    - docs
    - java
tags:
    - first-java
description: >
    .java 파일을 실행하는 방법과 과정
---
# How to run .java
{% assign java_imgpath = site.data['post_vars'].java.imgpath %}

[JVM](/docs/java/2021-01-08-jvm/)
{:.note title="prerequisites"}

## Compile
`.java` 파일을 `.class` 파일(**byte code**)로 만든다는 것을 의미한다.  
<u>JDK 안에 javac라는 java compiler의 명령을 통해 컴파일한다.</u>

> **Byte code**  
> 특정 하드웨어가 아닌 가상 컴퓨터에서 돌아가는 실행 프로그램을 위한 이진 표현법

`javac Main.java`과 같이 컴파일할 수 있다. 
```java
public class Main{
    public static void main(String[] args){
        System.out.println("Hello, World!");
    }
}
```

## Run
그리고 `java {package.className}`와 같이 실행할 수 있다.
![run java]({{java_imgpath}}/run-java.png)

이처럼 `compile`을 해야 실행 가능한 파일이 되지만 `.class`파일은 아직 컴퓨터가 읽을 수 없는 `byte code`이다. 그 후에 이를 `JVM`이 기계어로 변환하며 실행되는 것이다.

## JIT Compiler
실행 시간에 `byte code`를 인터프리터 방식으로 기계어로 번역하여 실행하는 기법이다.  

또한 생성한 기계어 코드를 캐싱하여 같은 함수가 여러 번 호출 될 때 매번 번역하는 것을 방지한다.