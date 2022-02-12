---
title: How I customized Chirpy(1) - utterances 테마
author: 1n9yun
date: 2022-02-12 20:47 +0900
categories: [Etc]
tags: [jekyll, chirpy]
mermaid: true
---

![utterances](/assets/img/posts/etc/customize-chirpy/utterances.gif)
_블로그 테마 변경과 연동되는 utterances_

이 블로그는 댓글 컴포넌트로 `utterances`를 사용하고 있습니다.  
그런데 `chirpy`는 블로그 왼쪽 메뉴에 있는 버튼이나, 시스템 설정의 변경으로 다크/라이트 테마로 변경이 가능한데, `utterances`의 테마가 자동으로 그에 따라 바뀌진 않는데요!

당연히 테마 변경 시 부자연스러우니 댓글 창의 테마도 따라 바뀌었으면 해서 작업 한 내용을 작성하고자 합니다.

## 수정 / 추가한 파일

`_includes/posts.html`

를 변경하긴 했지만 해당 수정 내용은 그저 함수를 추가하고, 테마 변경 시 그 함수를 끼워넣은 것이기 때문에 댓글 창과 같은 페이지에 있을 수 있는 곳에 추가해도 됩니다. (다른 파일로 만들고 포함시켜도 됨)

### mode-toggle.html

위 파일에 테마 변경에 대한 것이 클래스로 정의되어 있어요.

봐야할 건 두 가지 함수입니다.

```javascript
this.sysDarkPrefers.addListener(function() {
    if (self.hasMode) {
        if (self.isDarkMode) {
        if (!self.isSysDarkPrefer) {
            self.setDark();
        }

        } else {
            if (self.isSysDarkPrefer) {
                self.setLight();
            }
        }
        self.clearMode();
    }
    self.updateMermaid();
});
```
여기서는 시스템 설정이 변경된 걸 감지하고 테마를 바꿔주는 부분이에요.

```javascript
flipMode() {
    if (this.hasMode) {
        if (this.isSysDarkPrefer) {
            if (this.isLightMode) {
                this.clearMode();
            } else {
                this.setLight();
            }
        } else {
            if (this.isDarkMode) {
                this.clearMode();
            } else {
                this.setDark();
            }
        }
    } else {
        if (this.isSysDarkPrefer) {
            this.setLight();
        } else {
            this.setDark();
        }
    }
    this.updateMermaid();
}
```
여기가 변경 버튼 클릭 시 이벤트를 정의해 놓은 곳입니다.

얘네 둘에 내가 원하는 동작을 끼워넣어주면 되겠죠?!

### posts.html

```django
{% raw %}
{% if site.comments.provider == 'disqus' %}
    {% if site.disqus.comments and page.comments %}
        {% include disqus.html %}
    {% endif %}
{% elsif site.comments.provider == 'utterances' %}
    {% assign utterances = site.utterances %}
    <script src="https://utteranc.es/client.js"
        repo=           {{ utterances.repo }}
        issue-term=     {{ utterances.issue-term }}
        theme=          {{ utterances.theme }}
        crossorigin=    "anonymous"
        async>
    </script>
    <script>
        function updateUtterancesTheme() {
            const message = {
                type: 'set-theme',
                theme: 'github-' + toggle.modeStatus
            };
            const utterances = document.querySelector('.utterances-frame').contentWindow;
            utterances.postMessage(message, 'https://utteranc.es');
        };

        addEventListener('message', event => {
            if (event.origin !== 'https://utteranc.es') {
                return;
            }
            updateUtterancesTheme();
        });
        
        toggle.originFlipMode = toggle.flipMode;
        toggle.flipMode = function() {
            this.originFlipMode();
            updateUtterancesTheme();
        };
        toggle.sysDarkPrefers.addListener(updateUtterancesTheme)
    </script>
{% endif %}
{% endraw %}
```

`updateUtterancesTheme` 메서드부터~~

`utterances` 렌더링되는 위치에 같이 때려박았습니다. 

끗