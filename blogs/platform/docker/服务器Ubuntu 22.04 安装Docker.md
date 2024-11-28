---
title: 服务器Ubuntu 22.04 快速安装、更新、卸载 Docker
date: 2023/09/19 16:00:00
tags:
  - 程序安装
categories:
  - docker
  - ubuntu
  - virtual-platform
hideComments: false
---

## 目录

[[toc]]

---

_下面步骤有可能已经不再适用，建议优先访问官网，获取最新步骤_

---

## 1. 进入官网，获取最新安装信息

[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## 2. Uninstall old versions（卸载旧版本）

:::: code-group
::: code-group-item 输入

```shell
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

:::
::: code-group-item 输出

```text
正在读取软件包列表... 完成

正在分析软件包的依赖关系树... 完成

正在读取状态信息... 完成

软件包 docker.io 未安装，所以不会被卸载
。。。

软件包 docker-doc 未安装，所以不会被卸载
。。。

软件包 docker-compose 未安装，所以不会被卸载
。。。
软件包 podman-docker 未安装，所以不会被卸载
。。。
软件包 containerd 未安装，所以不会被卸载
。。。

软件包 runc 未安装，所以不会被卸载

升级了 0 个软件包，新安装了 0 个软件包，要卸载 0 个软件包，有 8 个软件包未被升级。
```

:::
::::

## 3. Installation methods（选择安装方式）

可以选择：

[桌面版安装 ](https://docs.docker.com/desktop/install/linux-install/)

[Apt 仓库（命令行）安装](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

[手动（离线）安装](https://docs.docker.com/engine/install/ubuntu/#install-from-a-package)

[脚本安装](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)

## <a name="my-section4"></a>4. Install using the Apt repository（Apt 仓库 "命令行" 安装 步骤）

### 4.1 Set up Docker's Apt repository（设置 Apt 仓库）

:::: code-group
::: code-group-item 输入

```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

:::
::: code-group-item 输出

```text
too much
```

:::
::::

## 4.2 Install the Docker packages.（选择安装包）

:::: code-group
::: code-group-item 安装最新版

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

:::
::: code-group-item 指定版本

```shell
# To install a specific version of Docker Engine, start by listing the available versions in the repository:
# List the available versions:
apt-cache madison docker-ce | awk '{ print $3 }'

5:24.0.0-1~ubuntu.22.04~jammy
5:23.0.6-1~ubuntu.22.04~jammy
# Select the desired version and install:
VERSION_STRING=5:24.0.0-1~ubuntu.22.04~jammy
sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
...
```

:::
::::

### 4.3 Verify that the Docker Engine installation is successful by running the hello-world image.（验证是否安装成功）

:::: code-group
::: code-group-item 输入

```shell
sudo docker run hello-world
```

:::
::: code-group-item 输出

```text
Unable to find image 'hello-world:latest' locally

latest: Pulling from library/hello-world

719385e32844: Pull complete

Digest: sha256:4f53e2564790c8e7856ec08e384732aa38dc43c52f02952483e3f003afbf23db

Status: Downloaded newer image for hello-world:latest



Hello from Docker!

This message shows that your installation appears to be working correctly.



To generate this message, Docker took the following steps:

 1. The Docker client contacted the Docker daemon.

 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.

    (amd64)

 3. The Docker daemon created a new container from that image which runs the

    executable that produces the output you are currently reading.

 4. The Docker daemon streamed that output to the Docker client, which sent it

    to your terminal.



To try something more ambitious, you can run an Ubuntu container with:

 $ docker run -it ubuntu bash



Share images, automate workflows, and more with a free Docker ID:

 https://hub.docker.com/


For more examples and ideas, visit:

 https://docs.docker.com/get-started/

```

:::
::::

## 5. Upgrade Docker Engine（更新 Docker）

To upgrade Docker Engine, follow step 2 of the installation instructions, choosing the new version you want to install.（指定版本安装，或 再次安装最新版）（见 [4. 安装步骤](#my-section4)）

## 6. Uninstall Docker Engine（卸载 Docker）

### 6.1 Uninstall the Docker Engine, CLI, containerd, and Docker Compose packages:（卸载包）

:::: code-group
::: code-group-item 输入

```shell
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
```

:::
::: code-group-item 输出

```text
正在读取软件包列表... 完成

正在分析软件包的依赖关系树... 完成

正在读取状态信息... 完成

下列软件包是自动安装的并且现在不需要了：

  pigz slirp4netns

使用'sudo apt autoremove'来卸载它(它们)。

下列软件包将被【卸载】：

  containerd.io* docker-buildx-plugin* docker-ce* docker-ce-cli*

  docker-ce-rootless-extras* docker-compose-plugin*

升级了 0 个软件包，新安装了 0 个软件包，要卸载 6 个软件包，有 5 个软件包未被升级。

解压缩后将会空出 408 MB 的空间。

您希望继续执行吗？ [Y/n] y
。。。
正在清除 docker-ce (5:24.0.6-1~ubuntu.22.04~jammy) 的配置文件 ...

正在清除 containerd.io (1.6.24-1) 的配置文件 ...

```

:::
::::

### 6.2 Images, containers, volumes, or custom configuration files on your host aren't automatically removed. To delete all images, containers, and volumes:（删除数据）

:::: code-group
::: code-group-item 输入

```shell
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

:::
::: code-group-item 输出

```text

```

:::
::::

## 附录

- [访问个人主页](https://www.rewi.xyz/)
