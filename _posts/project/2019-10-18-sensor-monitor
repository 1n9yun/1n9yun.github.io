---
title: Sensor Monitor
author: 1n9yun
date: 2019-10-18 09:00 +0900
categories: [Project]
tags: [wpf]
mermaid: true
---

<div 
id="monitor-swiper"
class="swiper-container"
data-dotted='true'
data-loop='true'
data-autoplay='{"delay": 4000, "disableOnInteraction": false}'
data-pagination='{"el": ".swiper-pagination", "clickable": true}'
data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}'
data-lazy='{"loadPrevNext": true}'
>
  <img src="/assets/img/posts/project/sensor-monitor/graph.png">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-1.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-2.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-3.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-4.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-5.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-6.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-7.jpg">
  <img src="/assets/img/posts/project/sensor-monitor/MonitorApp_Usage_Private-8.jpg">
</div>

## Summary

(2019. 06. 21 ~ 2019. 10. 18)

산학협력기업 인턴 중 개발자가 없어서 진행하지 못했던 사업에 소프트웨어 개발을 맡아서 진행했었다.

많게는 수십 개의 센서 보드가 연결된 상태에서, 모든 센서 보드의 값들을 통해 배전반 등의 고장 진단하는 시스템이다.

사용자가 설정한 값의 범위를 벗어난 경우 경고를 보내고 안드로이드 앱과 연동해 어디서든 확인할 수 있도록 했다.

### 주요 기능
* 날짜 / 센서 종류 별 데이터 **그래프로 시각화**
  * 마우스 포인터 위치 데이터의 **상세 정보 확인**
* 사용자가 지정한 정상 범위 외의 경우 알림
* 어디서든 모니터링 할 수 있도록 **Android App**에서 확인 가능
  * 서버 사용이 불가능한 이유로 **TCP Socket**을 통해 연결

### 구조
![Architecture](/assets/img/posts/project/sensor-monitor/architecture.png)

## 짧후기
개발인력이 없어서 오랫동안 진행하지 못했던 사업인데 내가 인턴으로 들어오면서 이 프로젝트를 넘겨주셨는데...  
한 번도 사용해 본적 없는 C#을 비롯해 WPF, Android를 이용한 개발을 했습니다.  
그래서 오래걸린듯..  
그러나 처음으로 혼자서 많은 것을 공부해가며 진행한 프로젝트로 얻은 것은 많다고 생각됩니다!

### 주요 수행 역할
1인 프로젝트입니다.

#### 요청/응답 프로토콜 문서 최신화
처음에 센서 보드 두개, 초기 버전 프로그램, 요청/응답 프로토콜 문서를 받았는데 보드 버전에 비해 문서가 최신화가 안되어 있었다.  

처음엔 와이어샤크로 패킷을 하나하나 분석했고 **리틀 엔디안**이라는 것 외에 별 진전이 없었다.  
**결국 보드를 만든 회사에 연락해서 최신 문서를 요청해서 받았다!**  

그마저도 들어오는 패킷과 달라 다시 분석하여 새로 작성 후 사용했다...

#### UDP BroadCasting
서브넷 마스크가 255.255.255.0 이므로 xxx.xxx.xxx.255가 Broadcast IP  
Broadcasting 후에 한꺼번에 들어오는 응답들을 하나씩 처리하여 발신 IP주소에 따라 센서를 구분했다.  
구분된 센서 별로 DB에 데이터를 저장하고 View에 추가되도록 했다.

#### 데이터 그래프와 이분 탐색
![Data Graph](/assets/img/posts/project/sensor-monitor/graph.png){:width="100%"}
1초 마다 추가되는 점들이 모여 최대 86400(지난 24시간) * 3개의 점으로 그래프가 그려진다.  
마우스를 따라 노란 선이 움직이고 노란 선과 겹치는 점의 데이터 세부 정보를 오른쪽 위에서 보여준다.
{:.figcaption}

마우스가 움직일 때마다 포인터의 위치에 대응되는 점을 찾기 위해 앞에서부터 선형적으로 찾는데, 조금만 빠르게 움직여도 **CPU 사용량이 80%까지 상승**하는 모습을 볼 수 있었다.  
중간 위치인 약 40000번 째 점 위에 마우스가 있다면, 마우스를 조금만 좌우로 흔들어도 40000번의 연산이 수 천, 수 만번 일어날 것이다.  

아래 두 가지 방법으로 개선하고자 했다.
* 보여지는 점의 개수(그래프가 보여지는 시간의 범위)를 줄이거나
* 탐색 알고리즘 개선

첫 번째 방법은 고객사의 **요구사항**이었기 때문에 바꾸기 쉽지 않았다.  
두 번째 방법은 **이분 탐색**을 적용하기로 했다.

```csharp
//  Binary Search
int left = 0, 
int right = TemperatureLine.Points.Count - 1;
int center = (left + right) / 2;

while (!(TemperatureLine.Points[center].X <= HoverPointX &&
        HoverPointX <= TemperatureLine.Points[center + 1].X)) {

    if (TemperatureLine.Points[center].X > HoverPointX) 
      right = center - 1;
    else if (TemperatureLine.Points[center + 1].X < HoverPointX)
      left = center + 1;

    center = (left + right) / 2;
}
```

마우스를 어디에 올려두어도 **17번 이하의 연산**으로 해당 위치의 점을 찾을 수 있게 되었다.  
그 결과 마우스를 마구 휘저어도 CPU 사용량이 **10% 내외**에서 왔다갔다 하는 것을 확인할 수 있었다.  

#### Android 앱과 TCP 소켓 통신
아래와 같은 이유 때문에 TCP 소켓을 사용했다.
* **서버 사용 불가**
* Wifi, Cellular 환경에서 계속해서 **변하는 IP주소** 때문에 응답을 제대로 보내줄 수 없다.

따라서 소켓 연결을 유지함으로써 실시간 모니터링을 가능하게 했다.

#### Install Wizard 배포
**Visual Studio Intaller Project**를 이용하여 `LocalDB`, `재배포 패키지`등 필요한 **Dependency**를 포함한 설치 파일을 생성하여 배포를 완료하였다.