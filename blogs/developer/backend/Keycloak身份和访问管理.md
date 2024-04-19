---
title: Keycloak身份和访问管理
date: 2023/09/19 21:00:00
tags:
 - 程序安装
 - keycloak
categories:
 - docker
 - virtual-platform
# 设置多个密码
password: 
 - 5cde5596ace9b1e212ab3ace1f083815
 - a5db2fd9def8a592756d4ca2b5301c20
hideComments: false
---

## 目录

[[toc]]

## 1. 进入官网，获取最新安装信息

[keycloak](https://www.keycloak.org/getting-started/getting-started-docker)

## 2. Start Keycloak

:::: code-group
::: code-group-item 输入
```shell
sudo docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.3 start-dev
```
:::
::: code-group-item 输出
```text
too much
```
:::
::::
