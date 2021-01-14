---
layout: post
title: SpringSecurity와 JWT를 이용한 사용자 인증과 인가
category:
    - log
    - develop
sitemap: false
---
#### SpringSecurity와 JWT를 이용한 사용자 인증과 인가

다른 인증 방식과의 비교는 [~~여기~~](javascript:console.log('아직'))에 정리합니다.  
<!-- HTTP는 연결 지향 프로토콜인 TCP 기반임에도 불구, 대표적인 비 연결 지향 프로토콜입니다. 한 번의 요청 - 응답 사이클이 완료되면 연결을 종료하기 대문에 각각의 요청은 모두 독립적인 요청으로 인지합니다. 따라서 클라이언트는 매 요청에 인증 정보를 포함시켜야 하며 서버 또한 이를 기반으로 인증 과정을 거쳐야 합니다.  
ex) 사용자 A가 작성한 게시글을 다른 사용자가 마음대로 수정/삭제할 수 없음 ([여기] 문서에 추가하자) -->
{:.note}
##### JWT 도입 이유
  다른 인증 방식과 비교 하여 서버 사이드의 별다른 저장소가 필요 없다는 점, 클라이언트와 서버의 연결고리가 없으므로 서버 확장성과 유지 보수측면에서 장점이 있어 Stateless Server에 보다 적절한 방식이라고 생각됩니다.
  또한 스마트폰, 태블릿과 같은 모바일 환경에서의 서비스도 고려했기 때문에 토큰 기반 인증이 적절하다고 생각했습니다.(쿠키 기반 인증의 경우 쿠키 컨테이너를 사용해야 함?)
###### 인증 정보의 위치 결정
우선 아래와 같은 조건을 생각합니다.  
* **모든 형태의 HTTP 요청에 사용** 가능해야 한다. (`GET`, `POST`, `PUT`, `DELETE` ...)
* 클라이언트 사이드에서 **쉽게 저장**하고 HTTP 요청 시 **쉽게 데이터를 실어줄** 수 있어야 한다.  

선택지는 request body, query parameter, cookie header, authorization header가 있었고 아래와 같은 이유로 **Authorization header**로 결정하였습니다.
* 인증 데이터는 metadata 성격이 강하여 **request body와 어울리지 않는다.**
* 게다가, `GET`, `HEAD`, `DELETE`, `TRACE`와 같은 메소드는 **request body를 사용할 수 없다.**
* 표준화 되어있는 Authorization Header 대신 **query string을 써서 얻을 메리트가 없다.**
* cookie header와 authorization header의 경우는 query string을 걸렀던 이유와 비슷하게 **인증이라는 맥락에서 authorization header가 어울린다.**

###### 인증 스키마
[MDN docs - Authorization header](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Authorization){: target="_blank"}  
[Bearer Spec - RFC6750](https://tools.ietf.org/html/rfc6750){: target="_blank"}
{:.note title="Prerequisite"}
이전(로그인 시 서버는 해당 사용자를 나타내는 특별한 값을 만들어 전달하여 권한을 부여하고 사용자는 나중에 Authorization header로 그 인증 데이터를 보내주는 것)까지의 과정이 결정되었고 이제 **'사용자를 나타내는 특별한 값'**을 어떻게 만들어낼 지는 표준이 결정해 줄 것입니다.

authorization header의 값인 `<type> <credentials>`에서 인증 type에 따라 **credential을 만들어내는 방식이 정해져** 있기 때문에 인증 스키마에 대한 의사 결정이 필요합니다. 아래와 같은 조건을 생각합니다.
* 표준을 따르지 않는다면 **충분한 이유와 대안이 필요**하다.
* 확장 가능성을 위해 **토큰 기반 인증 시스템이면 좋다**.
* 충분히 **암호화된 상태**로 주고받을 수 있거나, 비밀번호와 같이 **민감한 데이터를 값 내부에 포함시키지 않는 방식**이어야 한다.

표준 상 authorization header 값에는 **RFC에 의해 표준화**된 인증 스키마를 사용할 수 있게 되어있습니다.   
따라서 다음의 선택지에서 선택하겠습니다.
* Basic
* (non-standard) OAuth 1.0a를 사용하는 Bearer
* OAuth 2.0을 사용하는 Bearer
* (non-standard) JWT, JWT를 사용하는 Bearer

아래와 같은 이유로 JWT를 사용하는 Bearer를 선택합니다.  
* Basic은 사용자ID와 비밀번호를 콜론을 이용하여 합친 후 `base64`로 인코딩합니다. 하지만 **base64는 별도의 key 없이 복호화가 가능한 인코딩**이므로 안전하지 않다.
* OAuth 1.0a는 Bearer 인증 표준이 아니다.
* Bearer에서 사용하는 OAuth 2.0 방식은 확장성이 매우 높다. 그러나 **자체 암호화를 지원하지 않기** 때문에 **HTTPS를 쓰는 것을 권고**하고 있으며 **비용 문제가 발생**한다. *(letsencrpyt에서 무료 SSL 인증서를 발급 받을 수 있다. 당시에 알았다면 OAuth 2.0 방식을 시도했을 것 같다.)* 또한 스펙 자체에서 명확하게 정의하지 않은 부분이 꽤 있어 고민이 깊어진다고 한다 ?
* 하지만 **Bearer에 JWT, JWT라는 타입을 쓰는 것도 표준이 아니다.** 그러나 **OAuth 2.0을 보류**하게 되어 대신 쓸 토큰 기반 인증 시스템으로 **JWT가 적절**하다고 생각했다.
* JWT는 자료(사례, 라이브러리, 예제 등)가 많다.

###### Refresh Token
자세한 내용은 [~~여기~~](javascript:console.log('아직'))에 정리합니다.
{:.note}
토큰 탈취 위협에 대비하기 위한 방법으로 `Refresh Token`을 추가로 사용합니다.  
[RFC-6749](https://tools.ietf.org/html/rfc6749){:target="_blank"}에서 소개되었습니다.

###### 토큰 저장 위치
가장 고민이 많았던 부분입니다.  
서버에서는 두 개의 토큰을 발급하고 `Refresh Token`을 `Redis`에 저장합니다.  
클라이언트에서의 저장 위치는 다음의 선택지에서 선택합니다.
* HTML5 Local Storage, Session Storage
* Cookie
* Session
<!-- * 별도의 DB ? -->

아래와 같은 이유로 `Local Storage`에 저장하도록 하였습니다.
* `Session Storage`는 **브라우저가 종료되면 데이터가 삭제**되기 때문에 **로그인 유지 구현이 힘들다.**
* `Local Storage`는 **`Javascript`로 쉽게 제어가 가능**하다. 그러나 **XSS 공격에 취약**할 수 있다.
* `Cookie`의 경우도 **`Javascript`로 쉽게 제어가 가능**하지만 생성 시 **`HttpOnly`옵션을 적용하면 접근이 불가능** 해지고 오직 `HTTP` 통신을 통해서만 쿠키가 전송된다. 또한 **`Secure`옵션을 통해 `HTTPS` 통신을 통해서만 전송**되도록할 수 있다.
* 또 `Cookie`는 **CSRF 공격에 취약**하다. 그러나 **`CSRF Filter`를 이용해 방어**가 가능하다.
* 그러나 `Cookie`는 인증 정보 위치 결정 과정 결과와 모순된다.
<!-- * `SPA + RESTful Server`의 조합으로 **Client Side에서 별도의 DB 사용**은 불가능하다. -->

##### 구현

SpringSecurity Architecture (제공되는 Interface, Implementations ...) 는 [~~여기~~](javascript:console.log('아직'))에 정리합니다.  
[SpringSecurity docs - Authentication ...](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-authentication){: target="_blank"}
{:.note title="prerequisite"}

###### 흐름 파악

아래와 같은 구조로 Authentication을 구현합니다.
![SpringSecurity Architecture](https://chathurangat.files.wordpress.com/2017/08/blog-post-spring-security-basic-authentication-3.png)

###### Authentication
제공되는 필터 중 `UsernamePasswordAuthenticationFilter`를 커스터마이징하여 사용합니다. 이 필터의 인증 결과가 `SecurityContextHolder`에 등록되고 이후에 권한에 따른 요청의 필터링이 가능해집니다.  

`AuthenticationManager`에 나름의 인증 과정을 포함시키기 위해 `AuthenticationProvider` 인터페이스를 구현하고 주입했습니다.

`UserDetails` 인터페이스를 이용해 테이블과 매핑하며 `UserDetailsService` 인터페이스를 구현하여 DB와 통신합니다. 이를 이용해 로그인 요청 정보를 검증했습니다.

`AuthenticationSuccessHandler`를 구현하여 인증 결과를 이용해 JWT를 생성하여 전달하는 인증 후처리를 하였습니다.
* `Refresh Token`을 `Redis`에 저장하여 만료시간을 설정
* 응답으로 `Access Token`과 `Refresh Token`을 반환

###### Authorization
`OncePerRequestFilter`를 상속하여 구현한 필터를 사용했습니다.
해당 필터에서 토큰의 변조 여부, 만료 여부 등의 토큰 검증을 수행합니다.

그리고 토큰의 정보를 토대로 `SecurityContext`를 생성합니다.
`Configurer`에서 요청 `EndPoint`별 필요 권한을 부여하여 사용자가 가진 권한으로 접근할 수 있는 요청과 할 수 없는 요청을 분리하였습니다.

`AuthenticationEntryPoint`를 정의하여 인증/인가단계에서의 예외 처리를 하였습니다.


## Reference
* [JWT 사용 이유](https://velog.io/@city7310/%EB%B0%B1%EC%97%94%EB%93%9C%EA%B0%80-%EC%9D%B4%EC%A0%95%EB%8F%84%EB%8A%94-%ED%95%B4%EC%A4%98%EC%95%BC-%ED%95%A8-5.-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9D%B8%EC%A6%9D-%EB%B0%A9%EC%8B%9D-%EA%B2%B0%EC%A0%95) - 많이 배웠고 의사 결정 과정의 구체적인 좋은 예시라고 생각함. 어쩌다보니 베낀 것 처럼 되었다. 문제 시 수정하도록 하겠습니다.  