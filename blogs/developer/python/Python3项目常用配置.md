---
title: Python3项目常用配置
date: 2024-09-26 11:00:00
tags:
  - 编程技巧
categories:
  - python
---

# 运行环境搭建

## 虚拟环境（Linux）

```shell
# 切换到需要创建虚拟环境的目录
python3 -m venv venv
# 激活
source venv/bin/activate
# 退出虚拟环境
deactivate
```
## 虚拟环境（Windows）

```shell
# 切换到需要创建虚拟环境的目录
python -m venv venv
# 激活
.\venv\Scripts\activate
# 退出虚拟环境
deactivate
```

## 安装依赖（Linux）

```shell
python3 -m pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python3 -m pip install --upgrade setuptools -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python3 -m pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```
## 安装依赖（Windows）

```shell
python -m pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python -m pip install --upgrade setuptools -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python -m pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```
# FAQ
## Pip报错ValueError: check_hostname requires server_hostname

> https://zhuanlan.zhihu.com/p/498672371

```shell
pip install urllib3==1.25.8 -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
pip install --upgrade pip -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
```