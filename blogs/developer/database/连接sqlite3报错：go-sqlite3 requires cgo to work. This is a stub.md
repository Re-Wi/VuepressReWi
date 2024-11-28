---
title: 连接sqlite3报错：go-sqlite3 requires cgo to work. This is a stub
date: 2024-06-18 16:30:00
tags:
  - sqlite3
  - 开发报错
categories:
  - database
---

@[TOC](连接 sqlite3 报错：go-sqlite3 requires cgo to work. This is a stub)

# 报错信息：

> register db Ping `default`, Binary was compiled with 'CGO_ENABLED=0', go-sqlite3 requires cgo to work. This is a stub

# Windows 解决办法

## 1. 新建环境变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/a747c6630d3d4b14affbc42699d1c7b5.png)

## 2. 出现新的报错

报错信息：

> Failed to build the application: # runtime/cgo
> cgo: C compiler "gcc" not found: exec: "gcc": executable file not found in %PATH%

## 3. 安装 GCC

### 3.1 进入 Sqlite3 官网

- [github](https://github.com/mattn/go-sqlite3)

### 3.2 找到 Windows 部分

![在这里插入图片描述](https://img-blog.csdnimg.cn/96a31ecb62df4206a8a9082e3836a9a7.png)

### 3.2 点击下载链接

![在这里插入图片描述](https://img-blog.csdnimg.cn/3217ad9dd6d64d55bb644e59aa621aca.png)

### 3.3 按自己喜好下载一个

![在这里插入图片描述](https://img-blog.csdnimg.cn/66b6bf1730644beb9db70814b9e5778c.png)

### 3.4 安装

![在这里插入图片描述](https://img-blog.csdnimg.cn/d960452db1c049c0a22eaa673d119ee0.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/8236f77961d84e80b32a557117be50b6.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/935d1287460846948c6a91498de7c4d9.png)

## 到这里就成功解决了！！！

![在这里插入图片描述](https://img-blog.csdnimg.cn/cc1ef18866794c50bfa4b6a6bca8c8d9.png)
