---
title: Docker使用Ubuntu容器参考
date: 2023/02/28 16:30
tags:
 - backend
categories:
 - Docker
---

## Docker 创建

```shell
sudo docker run -d --name=UbuntuGoReWi  -it -p 3680:80 -p 3443:443 -p 3622:22 -p 3688:3688 -p 5688:5688 -p 7688:7688 -p 9688:9688 -v /home/www/UbuntuGoReWi:/home --privileged=true --restart=always  ubuntu:18.04
```

## Ubuntu 新建用户及文件夹

- <https://blog.csdn.net/qq_43847153/article/details/126583197>

### 1. 看当前所有用户

   默认新用户创建后都会在/home目录下有个用户的主目录。

```shell
ls /home
```

### 2. 创建用户

> 可以看到只有XXX一个用户，接下来创建一个名为admin的用户。
  -m是useradd的一个选项，为自动创建主目录。
  -d是设置用户的主目录。
  -s是指定用户所用的shell。

```shell
useradd admin -m -d /home/admin -s /bin/bash
```

### 3. （不做）修改用户所属组

这里的话其实就是将admin这个用户加入了root组。然后就有了root的一个权限。
   这里的话可以将root和admin换为自己想要的，这里的root是想要加入的组，admin是想要添加进这个组的用户。

```shell
sudo usermod -a -G root admin
```

### 4. （不做）删除用户

```shell
userdel -r MySQL
```

### 5. 分配权限的两种方式

   将读的权限为4，以写的权限为2，以执行的权限为1.每一个小块为权限的数字累加，每个小块为前面所提到的当前用户，用户所在组，其它用户。结合chmod命令使用。
   通过下面这种方式可以递归的赋予权限，也就是该目录下及所有子目录添加权限。权限的表示包括字母的表示权限和数字的表示权限。

```shell
chmod -R 777 /home/admin
```

### 6. 设置密码

> 在Ubuntu18.04系统中，如需要设置用户密码，要手动执行以下命令来设置新用户的密码.

```shell
passwd admin
<密码>
<密码>
```

## Ubuntu安装ssh服务详细过程

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
