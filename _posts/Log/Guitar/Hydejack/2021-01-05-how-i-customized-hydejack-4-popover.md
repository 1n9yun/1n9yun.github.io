---
layout: post
category: 
  - log
  - guitar
tags: 
  - jekyll
  - hydejack
title: How I customized Hydejack(4) - Sub Menu pop-over
description: >
  사이드바의 각 메뉴 아래에 서브 메뉴를 생성하는 방법
related_posts:
  - 
  # - project/_posts/2012-02-07-test-content.md
comments: true
---
<!-- blank -->
{% assign post_vars = site.data["post_vars"] %}
![hydejack-sub-menu-spread]({{ post_vars.guitar.imgpath}}/hydejack/submenu/hydejack-submenu-2.png)

[지난 번 펼치기 글](/log/guitar/2020-12-28-how-i-customized-hydejack-2-spread/)에서 서브메뉴를 만들었는데... 서브 메뉴가 많아지니까 스크롤이 생기는게 불편해서 팝오버로 다시 만들게 되었습니다!

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

설명은 이전 글을 참고하시면 바로 이해될거라 생각하고 소스만 변경해서 첨부하겠습니다.

\+ 혹시 팝오버의 background-color 추천해주실분 추천 부탁드려요..

### Source 
#### nav.html
```django
{% raw %}
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<ul>
  {% if site.menu %}
    {% for node in site.menu %}
      {% assign url = node.url | default: node.href %}
      {% assign count = count | plus: 1 %}
      <li>
        <div class="menu-wrapper" onmouseover="javascript:spread({{count}})" onmouseout="javascript:spread({{count}})">
          {% if node.submenu %}
          <button class="spread-btn">
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
        
          {% if node.submenu %}
          <div id="submenu-{{count}}" class="menu-wrapper submenu hide">
            <ul style="list-style: none;">
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
       </div>
      </li>
    {% endfor %}

생략
{% endraw %}
```

#### sidebar-folder.js
```javascript
function spread(count){
    let submenu = document.getElementById('submenu-' + count);
    if(submenu){
        if(submenu.classList.contains('hide')) submenu.classList.remove('hide');
        else submenu.classList.add('hide');
    }

    let spreadIcon = document.getElementById('spread-icon-' + count);
    if(spreadIcon){
        if(spreadIcon.innerHTML == 'arrow_right') {
            spreadIcon.innerHTML = 'arrow_drop_down';
            spreadIcon.style.color = 'grey';
        }else{
            spreadIcon.innerHTML = 'arrow_right';
            spreadIcon.style.color = 'white';
        } 
    }
}

```

#### my-style.scss
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
.menu-wrapper {
  text-align: left;
  margin-left: 10%;
}
.submenu.menu-wrapper{
  position: absolute;
  background-color: rgb(34,31,32);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  // width: 15rem;

  ul{
    margin: 0;
    padding: 0 1.25rem;
  }
}
.submenu.menu-wrapper.hide{
  display: none;
}

생략
```