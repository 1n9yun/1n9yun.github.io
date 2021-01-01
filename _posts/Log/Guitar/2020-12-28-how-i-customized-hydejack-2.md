---
layout: post
category: 
  - log
  - guitar
tags: 
  - jekyll
  - hydejack
title: How I customized Hydejack(2) - Sub Menu
description: >
  사이드바의 각 메뉴 아래에 서브 메뉴를 생성하는 방법
related_posts:
  - 
  # - project/_posts/2012-02-07-test-content.md
comments: true
---
<!-- blank -->
![hydejack-sub-menu](/assets/img/log/guitar/hydejack-1.png)

* toc
{:toc}

## 수정/추가한 파일
```
_includes/body/nav.html  
assets/js/sidebar-folder.js  
_sass/my-style.scss
_includes/my-head.html  
_config.yml  
```

### nav.html
#### Source 
```django
{% raw %}
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<ul>
  {% if site.menu %}
    {% for node in site.menu %}
      {% assign url = node.url | default: node.href %}
      {% assign count = count | plus: 1 %}
      <li>
        <div class="menu-wrapper">
          {% if node.submenu %}
            <button class="spread-btn" onclick="javascript:spread({{count}})">
              <span id="spread-icon-{{count}}" class="material-icons">arrow_right</span>
            </button>
          {% endif %}
          <a
            {% if forloop.first %}id="_drawer--opened"{% endif %}
            href="{% include_cached smart-url url=url %}"
            class="sidebar-nav-item {% if node.external  %}external{% endif %}"
            {% if node.rel %}rel="{{ node.rel }}"{% endif %}
            >
            {{ node.name | default:node.title }}
          </a>
        </div>
        {% if node.submenu %}
          <div class="menu-wrapper">
            <input type="checkbox" id="folder-checkbox-{{count}}">
            <ul>
            {% for subnode in node.submenu %}
              <li>
                <a
                  class="sidebar-nav-item {% if node.external  %}external{% endif %}"
                  href="{% include_cached smart-url url=subnode.url %}"
                  >
                  {{ subnode.title }}
                </a>
              </li>
            {% endfor %}
            </ul>
          </div>
        {% endif %}
      </li>
    {% endfor %}

생략
{% endraw %}
```

#### 코드 설명
##### sub-menu 버튼
```django
{% raw %}
생략

<!-- 복수의 메뉴 각각을 식별하기 위한 인덱스 -->
{% assign count = count | plus: 1 %}
<li>
  <div class="menu-wrapper">
    <!-- submenu 변수는 아래 _config.yml 에서 추가합니다 -->
    {% if node.submenu %}
      <!-- spread 함수는 js 파일로 작성하고 my-head.html에 추가합니다 -->
      <!-- spread-btn class는 my-style.scss에 추가합니다. -->
      <button class="spread-btn" onclick="javascript:spread({{count}})">
        <!-- marterial stylesheet를 my-head.html에 추가합니다 -->
        <span id="spread-icon-{{count}}" 
        class="material-icons">arrow_right</span>
      </button>
    {% endif %}

생략
{% endraw %}
```

##### sub-menu list
```django
{% raw %}
생략

{% if node.submenu %}
  <div class="menu-wrapper">
    <!-- 접힘/펼침 여부를 체크박스로 관리합니다 -->
    <input type="checkbox" id="folder-checkbox-{{count}}">
    <ul>
      {% for subnode in node.submenu %}
        <li>
          <a
            class="sidebar-nav-item {% if node.external  %}external{% endif %}"
            href="{% include_cached smart-url url=subnode.url %}"
            >
            {{ subnode.title }}
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>
{% endif %}

생략
{% endraw %}
```

### sidebar-folder.js
#### Source
```javascript
function spread(count){
  // check 상태와 화살표 방향을 변경합니다.
  document.getElementById('folder-checkbox-' + count).checked = 
  !document.getElementById('folder-checkbox-' + count).checked
  document.getElementById('spread-icon-' + count).innerHTML = 
  document.getElementById('spread-icon-' + count).innerHTML == 'arrow_right' ?
  'arrow_drop_down' : 'arrow_right'
}

```

### my-style.scss
#### Source
```scss
생략

.spread-btn{
  left: 7%;
  position: absolute;
  padding: 0;
  padding-top: 2px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
}

.spread-btn:hover{
  color: grey;
}

.menu-wrapper{
  display: flex;
  text-align: left;
  margin-left: 10%;
  
  input[type=checkbox]{
    display: none;
  }
  input[type=checkbox] ~ ul{
    display: none;
    list-style: none;
  }
  input[type=checkbox]:checked ~ ul{
    display: block;
  }
}

생략
```
### my-head.html
#### Source
```html
생략

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<script src="/assets/js/sidebar-folder.js"></script>

생략
```
### _config.yml
이제 _config.yml에서 menu 속성을 변경하면 서브 메뉴를 사용할 수 있습니다.
#### Source
```yml
생략

menu:
  - title:             Project
    url:               /project/
  - title:             Docs
    url:               /docs/
    submenu:           
      - title:           Java
        url:             /java/
      - title:           Spring
        url:             /spring/
      - title:           Computer Science
        url:             /computer-science/
  - title:             Algorithm
    url:               /algorithm/
    submenu:
      - title:           Theory
        url:             /theory/
      - title:           Problem Solving
        url:             /problem-solving/
  - title:             Log
    url:               /log/
    submenu:
      - title:           Develop
        url:             /develop/
      - title:           Book
        url:             /book/
      - title:           Guitar
        url:             /guitar/
  - title:             About
    url:               /about/

생략
```
이 블로그의 메뉴 구조입니다
{:.figcaption}