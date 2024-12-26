---
title: Pipenv-新一代Python项目环境与依赖管理工具
date: 2024-09-19 17:00:00
tags:
  - 项目环境
categories:
  - python
---

# 使用 Pipenv

- https://zhuanlan.zhihu.com/p/37581807
- https://pipenv.pypa.io/zh-cn/latest/basics.html

```shell
apt-get install pipenv
```

# 创建虚拟环境

```shell
cd myproject
pipenv install
```

# 激活虚拟环境

```shell
pipenv shell
```

# 安装依赖到虚拟环境

```shell
$ pipenv install "requests>=1.4"   # will install a version equal or larger than 1.4.0
$ pipenv install "requests<=2.13"  # will install a version equal or lower than 2.13.0
$ pipenv install "requests>2.19"   # will install 2.19.1 but not 2.19.0
# ~= 比 == 标识符更加推荐，因为后者会使得pipenv无法更新包：:
pipenv install "requests~=2.2"  # locks the major version of the package (this is equivalent to using ==2.*)
```

## 从 requirements.txt 中导入

```shell
pipenv install -r path/to/requirements.txt
```
