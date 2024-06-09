---
title: Docker使用Portainer CE可视化管理操作
date: 2023/09/19 18:00:00
tags:
 - 程序安装
categories:
 - docker
 - virtual-platform
hideComments: false
---

## 目录

[[toc]]

## 1. 进入官网，获取最新安装信息

[Portainer Community Edition (CE)](https://docs.portainer.io/start/install-ce/server/docker/linux)

## 2. Deployment（部署步骤）

### 2.1 First, create the volume that Portainer Server will use to store its database:（创建数据卷）

:::: code-group
::: code-group-item 输入
```shell
sudo docker volume create portainer_data
```
:::
::: code-group-item 输出
```text
portainer_data
```
:::
::::

### 2.2 Then, download and install the Portainer Server container: （安装 Portainer）

:::: code-group
::: code-group-item 输入
```shell
# SELinux is disabled on the machine running Docker. If you require SELinux, you will need to pass the --privileged flag to Docker when deploying Portainer.
# If you require HTTP port 9000 open for legacy reasons, add the following to your docker run command: -p 9000:9000
sudo docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```
:::
::: code-group-item 输出
```text
Unable to find image 'portainer/portainer-ce:latest' locally

latest: Pulling from portainer/portainer-ce

7bd7f95ed7eb: Pull complete 

9d019f0c1f3a: Pull complete 

5171176db7f2: Pull complete 

52e9438966a5: Pull complete 

43d4775415ac: Pull complete 

c1cad9f5200f: Pull complete 

4de43b91ce75: Pull complete 

d7c8d69c556b: Pull complete 

173ea6e5087e: Pull complete 

90767cd90d02: Pull complete 

4f4fb700ef54: Pull complete 

Digest: sha256:54ec8c7776cf9759f3e4c665a9596c4e0069d6359f4cc012377c6e5f104d8a94

Status: Downloaded newer image for portainer/portainer-ce:latest

1cdbf0e1a4342ac7028b11a89f13886c92ff24b85982ef0afbce75e144c229da
```
:::
::::

### 2.3 Portainer Server has now been installed. You can check to see whether the Portainer Server container has started by running docker ps:（查看是否成功）
:::: code-group
::: code-group-item 输入
```shell
sudo docker ps
```
:::
::: code-group-item 输出
```text
CONTAINER ID   IMAGE                          COMMAND                  CREATED       STATUS      PORTS                                                                                  NAMES             
de5b28eb2fa9   portainer/portainer-ce:latest  "/portainer"             2 weeks ago   Up 9 days   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp, 0.0.0.0:9443->9443/tcp, :::9443->9443/tcp   portainer
```
:::
::::

## 3. Logging In （打开浏览器访问）

```shell
# 在其他浏览器，则使用IP代替localhost
https://localhost:9443
```

## 4. Initial setup（初始化操作）

### 4.1 Creating the first user（根据界面提示创建 用户名、密码（至少12位））

### 4.2 Enabling or disabling the collection of statistics（复选框选择是否允许收集统计信息）

### 4.3 Connecting Portainer to your environments（如果是本地环境，直接开始操作）

## 附录

- [访问个人主页](https://www.rewi.cc/)

## How do I remove Portainer?

### Stop the Portainer container

```
sudo docker stop portainer
```
### Delete the Portainer container
```
sudo docker rm portainer
```