---
title: Gin编译程序报错处理
date: 2023-02-20 00:00:00
tags:
  - 编译报错
  - gin
categories:
  - Go
---

## 解决 golang 编译提示 dial tcp 172.217.160.113:443: connectex: A connection attempt failed

- <https://blog.csdn.net/weixin_37254196/article/details/110823033>

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## [error] failed to initialize database, got error Binary was compiled with 'CGO_ENABLED=0', go-sqlite3 requires cgo to work. This is a stub

- <https://blog.csdn.net/halo_hsuh/article/details/106573097>

| windows 安装 mingw32、mingw64 , linux 平台自身带 gcc 和 g++ 只要系统环境访问到即可，使用交叉编译的话 自行编译

> 需要命令行使用 gcc、g++

- 解决办法：<https://blog.csdn.net/jiqiren_dasheng/article/details/103775488>
- 下载地址（往下滑动，Windows 推荐下载`x86_64-win32-sjlj`）：<https://sourceforge.net/projects/mingw-w64/files/>
