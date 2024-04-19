---
title: Python开发环境配置
date: 2023-03-02 00:00:00
tags:
 - 开发环境
 - python
categories:
 - developer
 - programming language
---

## Linux下源码安装Python3详细步骤

> https://blog.csdn.net/key_world/article/details/110214288

```shell
wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
tar -zxvf Python-3.8.0.tgz
cd Python-3.8.0
./configure --prefix=/usr/local/python3.8

vi /etc/profile
export PYTHON_HOME=/usr/local/python3.8
export PATH=${PYTHON_HOME}/bin:$PATH
source /etc/profile
```
