---
layout: post
category: 
  - log
  - guitar
tags: 
  - jekyll
  - hydejack
title: How I customized Hydejack(1) - Use LiveReload.
description: >
  `windows` 환경 local에서 blog 작업 후 한 번에 반영하기로 하면서 `livereload`를 사용하고 싶었으나 hydejack starter kit bundle에 포함되어 있음에도 오류와 함께 실행되지 않았다.  
  그 해결 방법을 정리합니다.
related_posts:
  - 
  # - project/_posts/2012-02-07-test-content.md
comments: true
---
<!-- blank -->

* toc
{:toc}

## Prerequisite
* [RubyInstaller](https://rubyinstaller.org/downloads/){:target="_blank"} 에서 `ruby+devkit` 설치  

`ruby`에 대해 무지하므로 `gem`을 `npm`과 비교하여 이해하였습니다.
따라서  
`gem install` == `npm install -global`,
`bundle install` == `npm install` 로 이해하였습니다.  
또한 `bundle`은 `gem install bundler`를 통해 설치 후 사용 가능합니다.
{:.note}

## 원인

* `livereload`는 `platform` 옵션으로 `ruby`, `x64-mingw32`를 적용해야 한다.
* `Gemfile`의 `platform` 옵션이 제대로 적용되지 않는 것 같다.

## 시도한 방법
* `Gemfile.lock`에 `platform` 옵션 추가
  * `bundle lock --add-platform ruby`
  * `bundle lock --add-platform x64-mingw32`  
    * ~~이 명령은 시도해보지 않았지만 작성 중 생각해보니 이게 제대로 된 해결 방법일 것 같다는 느낌이 듭니다. 추후에 시도 해보고 수정하겠습니다.~~ 안됨!

## 해결 방법
* `gem install eventmachine --platform=ruby`
* `%ruby_path%\lib\ruby\gems\2.7.0\gems\eventmachine` `CTRL+C`
* `%your_hydejack_path%\vendor\bundle\ruby\2.7.0\gems`에 `eventmachine-{version}-x64-mingw32`로 이름 변경 후 `CTRL+V`
* `bundle exec jekyll serve --livereload` 실행 하면 정상적으로 동작하는 것을 확인 가능

`_config.yml`는 자동 반영되지 않습니다.
{:.note}

## 다른 방법
* `linux` 환경에서 작업
* `WSL` 설치 후 `rbenv`, `rvm` 과 같은 가상 컨테이너를 사용
* 물론 시도해보지 않았음. 언젠가 `ruby`를 배워보고 싶을 때나 해볼듯