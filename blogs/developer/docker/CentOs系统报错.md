---
title: CentOs系统报错
date: 2023-01-27 11:00:00
tags:
 - CentOs
categories:
 - 系统报错
---

## 【已解决】Error: Failed to download metadata for repo ‘appstream‘: Cannot prepare internal mirrorlist

- 参考：<https://blog.csdn.net/weixin_43252521/article/details/124409151>

> ✨上面的报错信息意思是，从仓库 ‘appstream’ 下载元数据失败：由于镜像列表中没有 URL，不能准备内部镜像列表。

> 🥎问题分析：
> ✨第一种可能的情况便是网络连接问题。检查是否可以连接外部网络，可以使用 ping baidu.com 查看是否有丢包情况。如果丢包，则进一步检查网络连接是否正常；如果没有丢包，继续阅读下文
> ✨那么第二种情况，便是 CentOS 已经停止维护的问题。2020 年 12 月 8 号，CentOS 官方宣布了停止维护 CentOS Linux 的计划，并推出了 CentOS Stream 项目，CentOS Linux 8 作为 RHEL 8 的复刻版本，生命周期缩短，于 2021 年 12 月 31 日停止更新并停止维护（EOL），更多的信息可以查看 CentOS 官方公告。如果需要更新 CentOS，需要将镜像从 mirror.centos.org 更改为 vault.centos.org
🥎那么针对上面提到的第二种情况，给出的解决方法如下：

1. 🔔 首先，进入到 yum 的 repos 目录

```shell
cd /etc/yum.repos.d/
```

2. 🔔其次，修改 centos 文件内容

```shell
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
```

3. 🔔 然后，生成缓存更新（第一次更新，速度稍微有点慢，耐心等待两分钟左右）

```shell
yum makecache
```

🔔 最后，运行 yum update

```shell
yum update -y
```
