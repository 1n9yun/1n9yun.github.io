---
title: How I customized Hydejack(1) - Use LiveReload
written_by: 1n9yun
date: 2020-12-26 05:40 +0900
categories: [Etc]
tags: [hydejack, jekyll]
mermaid: true
---

`windows` 환경 local에서 blog 작업 후 한 번에 반영하기로 하면서 `livereload`를 사용하고 싶었으나 hydejack starter kit bundle에 포함되어 있음에도 오류와 함께 실행되지 않았다.  
  그 해결 방법을 정리합니다.

* toc
{:toc}

## Prerequisite
* [RubyInstaller](https://rubyinstaller.org/downloads/){:target="_blank"} 에서 `ruby+devkit` 설치  
* `gem install bundler`로 `bundler` 설치
{:.note}

## 원인

* `livereload`설치 시 `platform` 옵션으로 `ruby`, `x64-mingw32`를 적용하고 있는데..
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

> hydejack에선 이렇게 해결했었으나 현재 테마에선 적용이 어려워 다른 방법을 찾았는데 매우 간단하다.
> `Gemfile`에 
  ```
  gem 'eventmachine', '1.2.7', git: 'https://github.com/eventmachine/eventmachine', tag: 'v1.2.7'
  ```
  한 줄 추가해주면 된다.

`_config.yml`는 자동 반영되지 않습니다.
{:.note}

## 다른 방법
* `linux` 환경에서 작업
* `WSL` 설치 후 `rbenv`, `rvm` 과 같은 가상 컨테이너를 사용
* 물론 시도해보지 않았음. 언젠가 `ruby`를 배워보고 싶을 때나 해볼듯