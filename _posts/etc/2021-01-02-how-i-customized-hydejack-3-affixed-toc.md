---
title: How I customized Hydejack(3) - Affixed TOC
written_by: 1n9yun
date: 2021-01-02 23:08 +0900
categories: [Etc]
tags: [hydejack, jekyll]
mermaid: true
---

![affixed-toc](/assets/img/posts/etc/customize-hydejack/affixed_toc.gif)
_계속 따라오며 현재 보고 있는 목차는 bold 처리_

글의 목차(table of contents)가 스크롤을 할 때 따라오면 굉장히 편할 것 같아서 추가했습니다.  

hydejack pro버전에는 포함되어있는 기능같은데  
  
starter-kit에는 일부러 넣지 않은건지 동작하지 않아서 살짝 얹었습니다.

* toc
{:toc}

## 수정/추가한 파일

`_include/my-head.html`

### my-head.html

`my-head.html`에 있던 다른 모듈들의 시작이 모두 
```javascript 
document.querySelector('hy-push-state').addEventListener('load', () => {
```
로 시작하는데 [hy-push-state](https://github.com/hydecorp/push-state) 여기에 설명이 되어있다.  

요약하자면 새 페이지를 불러들일 때, 하얀 배경이나 Unstyled 컨텐츠가 나타나는 일이 없이 새 페이지를 간지나게 로딩한다는 것 같다.  

한마디로
> Turn static web sites into dynamic web apps

라고 한다. 내가 이 부분에 꽂혀서 hydejack 테마를 쓰려고 github pages를 버리지 못하고 있다.  

어쩃든. 다시 돌아와서!  
이 `hy-push-state`의 `load` 이벤트를 이용하여 구현합니다.

간단한 내용이라 어떻게 했는지만 요약하겠습니다!  

`#markdown-toc` element를 고정시키면 됩니다.  
고정 위치의 기준은 맨 처음에 `toc element` 위치에 `relative div`를 추가해두고 그 `div`의 위치를 계속 체크합니다.  
스크롤에서 벗어나게 되면 `toc element`에 `affix` 클래스를 추가합니다.  
그 반대 경우엔 `affix` 클래스를 제거하여 고정을 풀어줍니다.

~~관련 자바스크립트는 제외했는데 왜 `affix`클래스는 있을까?~~  

같은 방법으로 **헤더 태그들의 위치를 추적**하며 현재 읽는 위치에 `bold` 스타일 추가 삭제해서 구현했습니다.

#### Source
```html
<script type="module">
document.querySelector('hy-push-state').addEventListener('load', () => {
    let tocElement = document.getElementById("markdown-toc");

    if(tocElement){
        let affixedDiv = document.createElement("div");
        affixedDiv.style.position = "relative";
        affixedDiv.style.top = "-1rem";
        tocElement.parentNode.insertBefore(affixedDiv, tocElement);
        
        let headerList = document.getElementsByClassName("permalink");
        let prevElement;
        window.addEventListener("scroll", () => {
            let hurdleTop = affixedDiv.getBoundingClientRect().top;
            if(hurdleTop <= 0) tocElement.classList.add("affix");
            else tocElement.classList.remove("affix");

            for(let i=0;i<headerList.length;i++){
                if(headerList[i].getBoundingClientRect().top >= 0){
                prevElement?.style.removeProperty("font-weight");
                let tocId = "markdown-toc-" + headerList[i].parentNode.id;
                prevElement = document.getElementById(tocId);
                prevElement.style.fontWeight = "bold";;

                break;
                }
            }
        });
    }
});
</script>
```