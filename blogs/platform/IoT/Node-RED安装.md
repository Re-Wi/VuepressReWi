---
title: Node-RED安装
date: 2024-11-1 16:00:00
tags:
  - Node-RED
categories:
  - IoT
---

@[TOC](Node-RED安装)

> https://nodered.org/docs/getting-started/docker

# Running under Docker

```
sudo docker run -it -p 1880:1880 -v /home/www/node_red_data:/data -e TZ=Asia/Shanghai --name mynodered nodered/node-red
```

You can then browse to http://{host-ip}:1880 to get the familiar Node-RED desktop.
To reattach to the terminal (to see logging) run:

```shell
docker attach mynodered
```

If you need to restart the container (e.g. after a reboot or restart of the Docker daemon):

```shell
docker start mynodered
```

and stop it again when required:

```shell
docker stop mynodered
```

## 安装好用的插件
可视化界面安装：用户设置>控制板
```text
输入控件和数据可视化：node-red-dashboard
telnet连接设备：node-red-contrib-telnet-client
监控系统：node-red-contrib-prib-functions
```
