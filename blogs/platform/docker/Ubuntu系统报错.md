---
title: Ubuntu系统报错
date: 2023-02-28 19:00:00
tags:
 - 系统报错
 - ubuntu
categories:
 - docker
 - virtual-platform
---

## cgo: C compiler "gcc" not found: exec: "gcc": executable file not found in $PATH

> 安装gcc

- <https://blog.csdn.net/m0_62291743/article/details/124345570>
- <https://blog.csdn.net/tongxin_tongmeng/article/details/127882711>
- <https://blog.csdn.net/caihuawei123/article/details/119778893>

```bash
apt install gcc
# 查看新版本
gcc -v
```

## System has not been booted with systemd as init system (PID 1). Can't operate

Failed to connect to bus: Host is down

- <https://blog.csdn.net/xiao_yi_xiao/article/details/120672705>

```shell
sudo apt install systemctl
```
