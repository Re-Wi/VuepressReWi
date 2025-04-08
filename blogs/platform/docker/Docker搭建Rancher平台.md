---
title: Docker搭建Rancher平台
date: 2023/09/22 16:50:00
tags:
  - 程序安装
  - rancher
categories:
  - docker
# 设置多个密码
password:
  - 5cde5596ace9b1e212ab3ace1f083815
  - a5db2fd9def8a592756d4ca2b5301c20
hideComments: false
---

## 目录

[[toc]]

## 1. 访问官网，获取最新安装信息

- [Rancher 中文文档](https://docs.rancher.cn/)
- [Rancher 英文](https://www.rancher.com/)

## 2. Deploy Rancher[（快速部署 server）](https://www.rancher.com/quick-start)

### 2.1 Prepare a Linux Host（准备一个 Linux 虚拟机）

> Prepare a Linux host with any supported Linux distribution including openSUSE and at least 4GB of memory. Install a supported version of Docker on the host.

### 2.2 Start the server（安装服务器）

> To install and run Rancher, execute the following Docker command on your host:

```shell
sudo docker run --privileged -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
```

> To access the Rancher server UI, open a browser and go to the hostname or address where the container was installed. You will be guided through setting up your first cluster. To get started quickly, have a look at out additional resources and getting started guide.

[Get Started Guide（使用指南）](https://ranchermanager.docs.rancher.com/pages-for-subheaders/quick-start-guides)

## 参考

- [docker 搭建 rancher 平台](https://zhuanlan.zhihu.com/p/620671840)
