---
title: Python 技巧
date: 2024-07-22 10:55:00
tags:
  - 编程技巧
categories:
  - python
---

```
V0.0.0  创建日期：2022.10.31 内置变量
```

# 内置变量

## **name**

【Python】**name** 是什么？
https://zhuanlan.zhihu.com/p/157439994
https://www.jb51.net/article/173412.htm
http://c.biancheng.net/view/vip_6163.html

## **doc**

# Pyqt 默认 规则：

1. pyqtSignal 必须在类名下创建，在函数里创建会出错
2. 使用 **init** 初始化数据 的话，使用一次 ConfigHandler() 会执行一次，如：type(ConfigHandler())

# Python 库

- Rich
  - https://baijiahao.baidu.com/s?id=1722189639028588559&wfr=spider&for=pc
  - 终端高亮和色彩渲染 Python 工具
  - 读取 markdown 文件到终端显示
- jinja2
  - https://blog.csdn.net/weixin_39517298/article/details/121210492
  - 快速、表达式化的可扩展模板引擎，用于 html 页面的数据渲染
  - 加载 html 文件位置，用字典数据渲染 html 页面
  - 官网：https://jinja.palletsprojects.com/
- logging
  - https://docs.python.org/zh-cn/3.9/library/logging.html
  - Python 的日志记录工具
  - 使用标准库提供的 logging API 最主要的好处是，所有的 Python 模块都可能参与日志输出，包括你自己的日志消息和第三方模块的日志消息。

# 可视化编程

https://cloud.tencent.com/developer/article/1337958
Wood 编辑器
编程猫在线体验地址：https://wood.codemao.cn/
Blockpy
Github 上查看源代码和搭建教程。地址是：https://github.com/RealTimeWeb/blockpy
Blockpy 在线体验地址：https://think.cs.vt.edu/blockpy

# `Python 不定长参数 (\*args、\*\*kwargs 含义)，附使用范例`

https://www.cnblogs.com/oddpage/p/16171113.html


# pytest之命名规则和运行方式

1. 默认规则

```text
1. 模块名必须以test_开头或以_test结尾（如，test_login.py）

2. 测试类必须以Test开头，并且不能有init方法（如，class TestLogin:）

3. 测试方法必须以test开头（如，def test_01()或test02()）
```
