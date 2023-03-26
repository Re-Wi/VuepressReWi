---
title: nginx运行报错处理
date: 2023/02/20
tags:
 - nginx
categories:
 - 报错处理
---

## nginx: [emerg] getpwnam("www") failed in

- https://blog.csdn.net/u012383839/article/details/72875210

```shell
/usr/sbin/groupadd -f www
/usr/sbin/useradd -g www www
```
