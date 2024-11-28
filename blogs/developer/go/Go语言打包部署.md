---
title: Go语言打包部署
date: 2024-02-17 10:30:33
tags:
  - 打包部署
categories:
  - Go
---

## golang 在 windows 环境下 build 生成 linux 程序

- <https://zhuanlan.zhihu.com/p/644741838>

```shell
# 查看之前的golang编译环境
# 设置成linux对应的
set GOARCH=amd64
go env -w GOARCH=amd64
set GOOS=linux
go env -w GOOS=linux
​
​
go build -o [目标可执行程序] [源程序]
# 例子
go build -tags dev -o D:\MasterStudy\wormhole\build\hole main.go
​
​
# 还原之前的编译环境
​
set GOARCH=amd64
go env -w GOARCH=amd64
set GOOS=windows
go env -w GOOS=windows
```
