---
title: Git操作项目报错处理
date: 2023-02-20 00:00:00
tags:
  - 提交报错
categories:
  - Git
---

## git 提示“warning: LF will be replaced by CRLF”的解决办法

- https://blog.csdn.net/u012757419/article/details/105614028
- https://blog.csdn.net/Babylonxun/article/details/126598477

```shell
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true
```

## ✖ subject may not be empty [subject-empty] ✖ type may not be empty [type-empty]

> https://blog.csdn.net/to_the_Future/article/details/127893906

```shell
git commit -m 'feat：初始化项目'  提交时feat后面的冒号必须是英文的，并且需要敲一个空格
```
