---
title: Ubuntu系统报错
date: 2023-02-28 19:00:00
tags:
 - 系统报错
 - ubuntu
categories:
 - ubuntu
 - virtual-platform
---

## cgo: C compiler "gcc" not found: exec: "gcc": executable file not found in $PATH

> 安装gcc

- [Linux:GCC安装与编译（详细）](https://blog.csdn.net/m0_62291743/article/details/124345570)
- [Linux安装GCC(最新版)](https://blog.csdn.net/tongxin_tongmeng/article/details/127882711)
- [configure: error: no acceptable C compiler found in $PATH 问题解决](https://blog.csdn.net/caihuawei123/article/details/119778893)

```bash
apt install gcc
# 查看新版本
gcc -v
```

## System has not been booted with systemd as init system (PID 1). Can't operate

Failed to connect to bus: Host is down

- [错误：System has not been booted with systemd as init system (PID 1). Can‘t operate.](https://blog.csdn.net/xiao_yi_xiao/article/details/120672705)

```shell
sudo apt install systemctl
```

## x509: certificate signed by unknown authority

- [修复阿里云docker中certificate signed by unknown authority亲测有效](https://www.cnblogs.com/smartmsl/p/15437861.html)

```shell
apt-get update
apt-get -y reinstall ca-certificates
```