---
title: Python开发环境配置
date: 2023-03-02 00:00:00
tags:
  - 开发环境
categories:
  - python
---

# Linux 下源码安装 Python3 详细步骤

> https://blog.csdn.net/key_world/article/details/110214288 > https://zhuanlan.zhihu.com/p/403819436

```shell
# 刷新包目录
sudo apt update

# 卸载 上一小节使用 PPA 安装的 Python 3.9
sudo apt purge python3.9

# 刷新包目录
sudo apt update

# 安装依赖
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev

# wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
# Download Python 3.9.0
sudo wget https://www.python.org/ftp/python/3.9.0/Python-3.9.0.tar.xz

# tar -zxvf Python-3.8.0.tgz
# cd Python-3.8.0
# ./configure --prefix=/usr/local/python3.8
# 解压
tar -xf Python-3.9.0.tar.xz

# 切换目录
cd <path to download location>/Python-3.9.0

# 检查依赖
sudo ./configure --enable-optimizations

# Make - 编译安装 Python - 这会费点时间，休息一下再回来吧
sudo make
# 或者 - 指定使用的处理器核心数
sudo make -j 4

# 安装二进制文件
sudo make altinstall

# Switch active Python
# 切换活动的 Python
sudo update-alternatives --config python3

# 不会为 python3 显示任何选项

# 检查安装
python3 --version

vi /etc/profile
export PYTHON_HOME=/usr/local/python3.8
export PATH=${PYTHON_HOME}/bin:$PATH
source /etc/profile
```

# 如何在 Ubuntu 上安装 Python 3.9

- https://zhuanlan.zhihu.com/p/403819436

## 检查 Python 版本

```shell
# 刷新软件包索引
sudo apt update

# 检查Python版本
python --version
# 检查Python版本
python3 --version
```

## 删除现有的 Python

```shell
# 删除 Python —— 在运行前请再三确认
# 这也会移除所有依赖于此的包，包括 gimp, mysql 等
sudo apt purge python3
```

## 使用 PPA 源安装 Python

```shell
# 更新包目录
sudo apt update

# 安装依赖
sudo apt install software-properties-common

# 添加 deadsnakes PPA 源
sudo add-apt-repository ppa:deadsnakes/ppa

# 按下 Enter 以继续

# 安装 Python 3.9
sudo apt install python3.9
```
