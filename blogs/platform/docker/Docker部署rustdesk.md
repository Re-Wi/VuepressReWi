---
title: Docker部署rustdesk
date: 2024/11/30 09:24:00
tags:
  - 项目部署
categories:
  - rustdesk
  - docker
---

# 目录

[[toc]]

> <https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/>

# Install your own server with Docker

```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v /home/www/rustdesk:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v /home/www/rustdesk:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```

# Ports Required

```text
Core Ports:
TCP 21114-21119
UDP 21116
```

# 客户端连接

```test
设置
网络
ID服务器
XXX.XXX.XXX.XXX
中继服务器
<不填>
API服务器
<不填>
Key
<来自服务器文件`id_ed25519.pub`>
```
