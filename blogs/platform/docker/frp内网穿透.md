---
title: frp内网穿透
date: 2023-05-11 14:30:00
tags:
  - 内网穿透
  - frp
categories:
  - docker
  - virtual-platform
---

https://blog.csdn.net/qq_36981760/article/details/115713179
https://blog.csdn.net/qq_45695716/article/details/123600408

# frp 服务端 DOCKER 安装方式（也可以直接安装在宿主机）

https://gitcode.net/mirrors/snowdreamtech/frp?utm_source=csdn_github_accelerator

```shell
sudo docker run --restart=always --network=host -d -v /home/www/frp/:/etc/frp --name frps snowdreamtech/frps
```

## 服务端配置文件 frps.toml(旧 frps.ini) 内容

```ini
# frps.toml

bindPort = 7000
vhostHTTPPort = 8080

# Server Dashboard
# The default value is 127.0.0.1. Change it to 0.0.0.0 when you want to access it from a public network.
webServer.addr = "0.0.0.0"
webServer.port = 7500
# dashboard's username and password are both optional
webServer.user = "admin"
webServer.password = "admin"

# Token Authentication
auth.method = "token"
auth.token = "admin"

# Connection Pooling
transport.maxPoolCount = 5

```

# frp 客户端 DOCKER 安装方式（也可以直接安装在虚拟机）

```shell
sudo docker run --restart=always --network=host -d -v frp:/etc/frp --name frpc snowdreamtech/frpc
```

## 客户端配置文件 frpc.toml(旧 frpc.ini) 内容

```ini
# frpc.toml
serverAddr = "x.x.x.x"
serverPort = 7000
# includes = ["./confd/*.toml"]

# Client Admin UI
webServer.addr = "0.0.0.0"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"

# Token Authentication
auth.method = "token"
auth.token = "admin"

# Connection Pooling
transport.poolCount = 3

[[proxies]]
name = "telnet"
type = "tcp"
localIP = "0.0.0.0"
localPort = 19021
remotePort = 19021
```

## 移动配置文件到 docker 映射卷位置

```shell
cd /var/lib/docker/volumes/frp/_data/
cp /XXX/frpc.ini ./
```

## 示例（IP 为云服务器，内容来自虚拟机）：http://xxx.xxx.xx.xxx:8080/

# frp 客户端 Windows 安装

> https://www.cnblogs.com/cxfs/p/13071969.html

## 下载 Windows 版本

网站：https://github.com/fatedier/frp/releases

## 配置

- 见上文客户端配置

## 运行

```shell
frpc.exe -c frpc.toml
```

# FAQ(Frequently Asked Questions)

## 001

A: error unmarshaling JSON: while decoding JSON: json: cannot unmarshal string into Go value of type v1.ServerConfig
Q: https://github.com/fatedier/frp/issues/3657
value 的值如果是字符串用""包起来试试看。
