---
title: Go语言项目使用Supervisor部署
date: 2023-03-26 02:00:00
tags:
  - 项目部署
  - supervisor
categories:
  - backend
  - Go
---

## 目录

[[toc]]

## supervisor 简介

> Supervisor 是业界流行的一个通用的进程管理程序，它能将一个普通的命令行进程变为后台守护进程，并监控该进程的运行状态，当该进程异常退出时能将其自动重启。
> Supervisor 是一个进程控制系统. 它是一个 C/S 系统(注意: 其提供 WEB 接口给用户查询和控制), 它允许用户去监控和控制在类 UNIX 系统的进程. 它的目标与 launchd, daemontools 和 runit 有些相似, 但是与它们不一样的是, 它不是作为 init(进程号 pid 是 1)运行. 它是被用来控制进程, 并且它在启动的时候和一般程序并无二致.

### 安装

```shell
# 1）centos 安装：
yum install supervisor

# 2）ubuntu安装：
apt-get install supervisor
# （如果安装失败检查镜像源，替换最新的更新下然后再安装）

# 3）masOS安装：
brew install supervisor

```

### Supervisor 配置

> Supervisor 的配置文件为：/etc/supervisor/supervisord.conf ，Supervisor 所管理的应用的配置文件放在 /etc/supervisor/conf.d/ 目录中，这个目录可以在 supervisord.conf 中的 include 配置。

```conf
[include]
files = /etc/supervisor/conf.d/*.conf
```

启动 supervisor 服务

```
supervisord -c /etc/supervisor/supervisord.conf
```

> 以 ubuntu 为例，在/etc/supervisor/conf.d 文件下添加`KitReWi.conf`文件

编辑文件

```shell
cd /etc/supervisor/conf.d/
nano KitReWi.conf
```

输入内容
简单说明下：
program：项目名称
command 执行命令 使用 go build -o KitReWi 编译后文件路径

注：分号（;）开头的配置表示注释

```conf
[program:KitReWi]  ;程序名称
user=root  ;执行程序的用户
command=./KitReWi  ;执行的命令
directory=/home/admin/XXX/ ;命令执行的目录
stopsignal=TERM  ;重启时发送的信号
autostart=true
autorestart=true  ;是否自动重启
startsecs=10
stdout_logfile=/home/admin/XXX/logs/KitReWi-stdout.log  ;标准输出日志位置
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
stdout_capture_maxbytes=1MB
stderr_logfile=/home/admin/XXX/logs/KitReWi-stderr.log  ;标准错误日志位置
stderr_logfile_maxbytes=1MB
stderr_logfile_backups=10
stderr_capture_maxbytes=1MB
stopsignal=INT
```

### 启动服务

```shell
supervisorctl start KitReWi
supervisorctl update # 更新配置文件并重启相关的程序
supervisorctl status KitReWi # 查看bluebell的运行状态
```

### 常用的 supervisr 管理命令

```shell
supervisorctl status       # 查看所有任务状态
supervisorctl shutdown     # 关闭所有任务
supervisorctl start 程序名  # 启动任务
supervisorctl stop 程序名   # 关闭任务
supervisorctl reload       # 重启supervisor
service supervisor stop # 停止supervisor服务
service supervisor start # 启动supervisor服务
supervisorctl stop|start program_name #启动或停止服务
```

## 参考

- [Go 语言项目部署的那些方式](https://zhuanlan.zhihu.com/p/266899863)
- [supervisor 守护 golang 进程](https://blog.csdn.net/qq_33229176/article/details/113055364)
- [如何使用 Docker 部署 Go Web 应用](https://www.liwenzhou.com/posts/Go/deploy-in-docker/)
- [supervisor 配置和使用详解](https://blog.csdn.net/zzhongcy/article/details/105071018)
