---
title: Go语言项目部署
date: 2023-03-26 02:00:00
tags:
 - 项目部署
 - Go
categories:
 - developer
 - backend
---

## supervisor

- <https://zhuanlan.zhihu.com/p/266899863>
- <https://blog.csdn.net/qq_33229176/article/details/113055364>
- <https://www.liwenzhou.com/posts/Go/deploy-in-docker/>
- <https://blog.csdn.net/zzhongcy/article/details/105071018>

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

> Supervisor 的配置文件为：/etc/supervisor/supervisord.conf ，Supervisor 所管理的应用的配置文件放在 /etc/supervisor/conf.d/ 目录中，这个目录可以在 supervisord.conf 中的include配置。

```conf
[include]
files = /etc/supervisor/conf.d/*.conf
```

启动supervisor服务

```
supervisord -c /etc/supervisor/supervisord.conf
```

> 以ubuntu为例，在/etc/supervisor/conf.d 文件下添加`KitReWi.conf`文件

编辑文件

```shell
cd /etc/supervisor/conf.d/
nano KitReWi.conf
```

输入内容
简单说明下：
program：项目名称
command 执行命令 使用go build -o KitReWi 编译后文件路径

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

### 常用的supervisr管理命令

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
