---
title: Docker使用Ubuntu容器参考
date: 2023-02-28 16:30:00
tags:
  - ubuntu
  - backend
categories:
  - docker
  - virtual-platform
---

## Docker 创建

- <https://hub.docker.com/search?q=ubuntu>
- <https://hub.docker.com/_/ubuntu>

```shell
sudo docker run -d --name=UbuntuGoReWi  -it -p 3680:80 -p 3443:443 -p 3622:22 -p 3688:3688 -p 5688:5688 -p 7688:7688 -p 9688:9688 -v /home/www/UbuntuGoReWi:/home --privileged=true --restart=always  ubuntu:22.04

# 不想指定端口 用 --network NginxNet 代替 -p （加入一个网络，网络内的容器可用容器名代替IP访问）
sudo docker run -d --name=UbuntuGoReWi  -it --network NginxNet -v /home/www/UbuntuGoReWi:/home --privileged=true --restart=always  ubuntu:24.04
# 再建一个容器
sudo docker run -d --name=UbuntuPyReWi  -it --network NginxNet -v /home/www/UbuntuPyReWi:/home --privileged=true --restart=always  ubuntu:24.04
```

## Ubuntu 新建用户及文件夹

- <https://blog.csdn.net/qq_43847153/article/details/126583197>

### 1. 看当前所有用户

默认新用户创建后都会在/home 目录下有个用户的主目录。

```shell
ls /home
```

### 2. 创建用户

> 可以看到只有 XXX 一个用户，接下来创建一个名为 admin 的用户。
> -m 是 useradd 的一个选项，为自动创建主目录。
> -d 是设置用户的主目录。
> -s 是指定用户所用的 shell。

```shell
useradd admin -m -d /home/admin -s /bin/bash
```

### 3. （不做）修改用户所属组

这里的话其实就是将 admin 这个用户加入了 root 组。然后就有了 root 的一个权限。
这里的话可以将 root 和 admin 换为自己想要的，这里的 root 是想要加入的组，admin 是想要添加进这个组的用户。

```shell
sudo usermod -a -G root admin
```

### 4. （不做）删除用户

```shell
userdel -r MySQL
```

### 5. 分配权限的两种方式

将读的权限为 4，以写的权限为 2，以执行的权限为 1.每一个小块为权限的数字累加，每个小块为前面所提到的当前用户，用户所在组，其它用户。结合 chmod 命令使用。
通过下面这种方式可以递归的赋予权限，也就是该目录下及所有子目录添加权限。权限的表示包括字母的表示权限和数字的表示权限。

```shell
chmod -R 777 /home/admin
```

### 6. 设置密码

> 在 Ubuntu18.04 系统中，如需要设置用户密码，要手动执行以下命令来设置新用户的密码.

```shell
passwd admin
<密码>
<密码>
```

## Ubuntu 安装 ssh 服务详细过程

- <https://cloud.tencent.com/developer/article/2054751>
- <https://blog.csdn.net/weixin_43833430/article/details/127262464>
- <https://blog.csdn.net/m0_46392035/article/details/124835203>

```shell
#更新安装环境
apt-get upgrade -y
apt-get update -y
#安装ssh服务
apt-get install openssh-server -y
#启动sshserver
/etc/init.d/ssh start
#重启ssh服务
/etc/init.d/ssh restart

#启动ssh服务并配置开机自启
systemctl enable ssh #开机启动
systemctl restart ssh #重启ssh
systemctl status ssh #查看ssh状态
```

## 启用中文支持

- <https://blog.csdn.net/llllllloooooo/article/details/102852027>
- <https://zhuanlan.zhihu.com/p/165961076>

> 简单的说是因为服务器没有安装 zh_CN.UTF-8 字符集，导致不支持中文！
> locale 执行这个命令，查看和语言编码有关的环境变量

### 查看

```shell
# 查看当前语言
locale
# 查看当前已安装的语言
locale -a
```

### 安装语言包

```shell
# 1.安装基本的软件包（第2步安装 zh_CN 中文字符集时要用到）
sudo apt-get update   # ubuntu系统更新软件包列表
sudo apt-get install -y language-pack-zh-hans
sudo apt-get install -y language-pack-zh-hant
# 字符集
locale-gen zh_CN.UTF-8
# 再次查看
locale -a
```

### 添加到文件

```shell
echo "export LC_ALL=zh_CN.UTF-8">> /etc/profile
source /etc/profile
# 如果这里添加失败，提示没有这种语言包，退出容器，再重新进入，就可以添加了

# 完成
locale
```

## 在.sh 文件中使用 source 命令不生效

- <https://www.cnblogs.com/CharrammaBlog/p/13540302.html>

```shell
# 使用 source 命令
source XXX.sh
```

# FAQ

## libGL.so.1: cannot open shared object file: No such file or directory

> https://blog.csdn.net/qq_50195602/article/details/124188467

```shell
apt-get install ffmpeg libsm6 libxext6  -y
apt-get update && apt-get install libgl1
```
