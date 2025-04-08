---
title: Docker部署MySql
date: 2024/11/30 09:24:00
tags:
  - 项目部署
categories:
  - MySql
  - docker
---

# 目录

[[toc]]

> https://www.runoob.com/docker/docker-install-mysql.html

# 1. 拉取 MySQL 镜像

```shell
sudo docker pull mysql
```

# 运行容器

```shell
sudo docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

# 登录mysql
```shell
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Lzslov123!';
```

# 添加远程登录用户
```shell
USE mysql;
SELECT host, user FROM user;
CREATE USER 'test'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' WITH GRANT OPTION;
```