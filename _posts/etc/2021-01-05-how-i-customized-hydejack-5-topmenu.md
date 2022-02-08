---
title: How I customized Hydejack(5) - Top Navigation
author: 1n9yun
date: 2021-01-05 22:40 +0900
categories: [Etc]
tags: [hydejack, jekyll]
mermaid: true
---

![top-nav](/assets/img/posts/etc/customize-hydejack/top-nav.png)
_사이드 바의 메뉴들과 같이 `_config.yml`에 카테고리를 추가하면 자동으로 추가됩니다._

사이드바가 들어갔을 때 다시 펼쳐서 메뉴 누르기가 불편하다고 생각되서 상단 네비게이션 바도 추가하게 되었습니다.  

뭔가 잡다해지는거 같기도 한데..  

어차피 글 볼땐 숨겨질테니! 아무튼 불편해서 추가했습니다!

* toc
{:toc}

## 수정/추가한 파일

`_include/body/menu.html`  
`_sass/my-style.scss`  

### menu.html
`nav.html`에서처럼 `_config.yml`을 불러와서 추가해줬습니다.

```django
{% raw %}
<div id="_navbar" class="navbar fixed-top">
    <div class="content">
        <span class="sr-only">{{ site.data.strings.jump_to | default:"Jump to" }}{{ site.data.strings.colon | default:":" }}</span>
        <div class="nav-btn-bar">
            <a id="_menu" class="nav-btn no-hover" href="#_drawer--opened">
            <span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}</span>
            <span class="icon-menu"></span>
            </a>
            <div class="top-menu">
                {% if site.menu %}
                    {% for node in site.menu %}
                        {% assign url = node.url | default: node.href %}
                            <a 
                            {% if forloop.first %}id="_drawer--opened"{% endif %}
                            href="{% include_cached smart-url url=url %}"
                            class="nav-btn top-menu {% if node.external %}external{% endif %}"
                            {% if node.rel %}rel="{{ node.rel }}"{% endif %}
                            >
                            {{ node.name | default:node.title }}
                            </a>
                    {% endfor %}
                {% endif %}
            </div>
            <div class="nav-span">
            </div>
        </div>
    </div>
</div>
<hr class="sr-only" hidden />
{% endraw %}
```

### my-style.scss
`hydejack`의 css 클래스를 찾아서 덮어쓰고 추가했습니다. 

```scss
.top-menu-wrapper{
  display: inline-block;
}

.nav-btn, .nav-btn-bar{
  height: 3rem;
}
.top-menu{
  overflow-x: auto;
  // overflow-y: hidden;
  white-space: nowrap;
}
.top-menu.nav-btn{
  border: none;
  display: inline-flex;
  width: 6rem;
  margin-left: -1px;
}
.nav-btn:hover,.nav-btn:focus{
  color: grey;
  background-color: rgba(0,0,0,0.05);
}

.nav-span{
  flex: none;
}
```