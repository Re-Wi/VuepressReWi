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

frp 服务端 DOCKER 安装方式（也可以直接安装在宿主机）
https://gitcode.net/mirrors/snowdreamtech/frp?utm_source=csdn_github_accelerator

```shell
sudo docker run --restart=always --network=host -d -v /home/frp/:/etc/frp --name frps snowdreamtech/frps
```

服务端配置文件 frps.ini 内容

```ini
# [common] is integral section
[common]
# A literal address or host name for IPv6 must be enclosed
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80"
# For single "bind_addr" field, no need square brackets, like "bind_addr = ::".
bind_addr = 0.0.0.0
bind_port = 7000

# if you want to support virtual host, you must set the http port for listening (optional)
# Note: http port and https port can be same with bind_port
vhost_http_port = 8080
vhost_https_port = 8443

# response header timeout(seconds) for vhost http server, default is 60s
# vhost_http_timeout = 60
# set dashboard_addr and dashboard_port to view dashboard of frps
# dashboard_addr's default value is same with bind_addr
# dashboard is available only if dashboard_port is set
dashboard_addr = 0.0.0.0
dashboard_port = 7500

# dashboard user and passwd for basic auth protect
dashboard_user=root
dashboard_pwd=xu1314

# authentication_method specifies what authentication method to use authenticate frpc with frps.
# If "token" is specified - token will be read into login message.
# If "oidc" is specified - OIDC (Open ID Connect) token will be issued using OIDC settings. By default, this value is "token".
authentication_method = token
# authenticate_heartbeats specifies whether to include authentication token in heartbeats sent to frps. By default, this value is false.
authenticate_heartbeats = false

# AuthenticateNewWorkConns specifies whether to include authentication token in new work connections sent to frps. By default, this value is false.
authenticate_new_work_conns = false

# auth token
token = xu1314
# only allow frpc to bind ports you list, if you set nothing, there won't be any limit
# allow_ports = 2000-3000,3001,3003,4000-50000

# pool_count in each proxy will change to max_pool_count if they exceed the maximum value
max_pool_count = 5

# max ports can be used for each client, default value is 0 means no limit
max_ports_per_client = 0
```

frp 客户端 DOCKER 安装方式（也可以直接安装在虚拟机）

```shell
sudo docker run --restart=always --network=host -d -v frp:/etc/frp --name frpc snowdreamtech/frpc
```

客户端配置文件 frpc.ini 内容

```ini
[common]
server_addr = 175.178.89.162
server_port = 7000
token = xu1314
login_fail_exit = false

[web]
type = http
local_port = 8080
remote_port = 8080
custom_domains = 175.178.89.162
```

移动配置文件到 docker 映射卷位置

```shell
cd /var/lib/docker/volumes/frp/_data/
cp /XXX/frpc.ini ./
```

示例（IP 为云服务器，内容来自虚拟机）：http://xxx.xxx.xx.xxx:8080/
