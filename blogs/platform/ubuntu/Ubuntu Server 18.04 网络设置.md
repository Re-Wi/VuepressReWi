---
title: Ubuntu Server 18.04 网络设置
date: 2023-08-28 17:00:00
tags:
 - command line
 - ubuntu
 - 网络设置
categories:
 - operating-system
 - ubuntu
---

## 如何在Ubuntu Server 18.04 LTS中配置静态IP地址

> https://www.cnblogs.com/nuoforever/p/14177682.html

```shell
# 运行ip link show命令，它将列出服务器上所有可用的网络接口。
ip link show
# 要查看当前的IP配置，运行ip addr命令
ip addr
# ...
sudo netplan apply
ip add
```
