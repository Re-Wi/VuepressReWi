---
title: Git操作项目报错处理
date: 2023-02-20 00:00:00
tags:
 - Git
categories:
 - 提交报错
---

## git提示“warning: LF will be replaced by CRLF”的解决办法

- <https://blog.csdn.net/u012757419/article/details/105614028>
- <https://blog.csdn.net/Babylonxun/article/details/126598477>

```shell
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true
```
