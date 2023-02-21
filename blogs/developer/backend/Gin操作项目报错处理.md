---
title: Gin操作项目报错处理
date: 2023/02/20
tags:
 - 报错处理
categories:
 - 后端开发
---

## 解决golang编译提示dial tcp 172.217.160.113:443: connectex: A connection attempt failed

- https://blog.csdn.net/weixin_37254196/article/details/110823033

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## [error] failed to initialize database, got error Binary was compiled with 'CGO_ENABLED=0', go-sqlite3 requires cgo to work. This is a stub

<!-- TODO -->