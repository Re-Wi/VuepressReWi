---
title: Docker--Ubuntu编译运行Go程序
date: 2023-02-28 16:40:00
tags:
 - 程序安装
 - go
 - ubuntu
categories:
 - docker
 - virtual-platform
---

## Ubuntu 安装go（命令方式）

```shell
apt-get install -y golang
```

## Ubuntu 安装go（源码方式）

- <https://blog.csdn.net/liangcsdn111/article/details/115405223>
- <https://blog.csdn.net/dlh918/article/details/127524625>
- <https://studygolang.com/dl>

### 1. 下载安装包

> 首先在本地电脑上，打开 go 语言国内官网 <https://golang.google.cn/dl/>，选择linux版本，右击选择复制连接地址，然后登录ubuntu ssh上，执行下载命令。
 wget是下载工具，如果没有安装的话，先执行 apt-get install wget
 后边的地址就是刚才赋值的
 命令执行完毕后会将压缩包下载到当前目录中。

```shell
wget https://golang.google.cn/dl/go1.20.2.linux-amd64.tar.gz
```

### 2. 解压到指定文件中

```shell
tar -C /usr/local -xzf go1.20.2.linux-amd64.tar.gz
```

### 3. 设置go环境变量

sudo nano 打开/etc/profile文件，追加导出命令
安装nano： apt-get install nano

```shell
echo "### Go ###" >> /etc/profile
echo "export GOROOT=/usr/local/go" >> /etc/profile
echo "export PATH=\$PATH:\$GOROOT/bin" >> /etc/profile
```

### 4. 生效环境变量

```shell
source /etc/profile
```

### 5. 验证是否生效

   输出版本信息为正常

```shell
go version
```

### 6. 其他环境变量

```shell
#配置 GOPROXY 环境变量
export GOPROXY=https://goproxy.io,direct
```

## Go代码 运行

1. 使用支持`sftp`等传文件的协议的工具上传代码到一个目录
2. 通过控制台进入Ubuntu命令行，执行运行代码命令
   > 关闭控制台程序就退出：在命令行末尾加上 &

```bash
go run main.go
```
