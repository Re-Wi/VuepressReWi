---
title: Linux权限问题
date: 2023-02-28 19:00:00
tags:
 - 权限问题
 - command line
categories:
 - operating-system
 - linux
---

## 文件夹无法访问

- [linux 文件夹权限/所有者修改](https://blog.csdn.net/Tourior/article/details/84784516)

### 修改文件夹所有者

```shell
# chown 用户名 文件或目录名
sudo chown XXX dir
```

### （多个文件夹）递回的方式逐个修改文件夹所有者

```shell
# chown 用户名 文件或目录名
sudo chown -R XXX dir
```

### 修改文件所属组

```shell
# chown 用户名 文件或目录名
chgrp 
```

## 文件无法访问

- [Linux命令:修改文件权限命令chmod、chgrp、chown详解](https://www.cnblogs.com/cwwmmv/p/10535175.html)
- [chmod命令用法详解-chmod修改目录权限](https://www.cnblogs.com/linuxandy/p/10881918.html)

### 修改文件权限

```shell
# chmod ［who］ ［+ | – | =］ ［mode］ 文件名¼
sudo chmod XXX file
```

### （多个文件）递回的方式逐个修改文件权限

```shell
# chmod [-cfvR] [--help] [--version] [who] [+ | - | =] [mode] 文件名
sudo chmod -R 750 file
```