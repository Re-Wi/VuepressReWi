---
title: Python3项目常用配置
date: 2024-09-26 11:00:00
tags:
  - 编程技巧
  - python
categories:
  - developer
  - programming-language
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

## 安装依赖（Linux）

```shell
python3 -m pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python3 -m pip install --upgrade setuptools -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
python3 -m pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```
