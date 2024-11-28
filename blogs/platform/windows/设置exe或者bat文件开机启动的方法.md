---
title: 设置exe或者bat文件开机启动的方法
date: 2023-08-16 11:00:00
tags:
 - windows 10
 - windows 11
 - 开机自启动 
categories:
 - operating-system
 - windows
---

## 前言

> <https://blog.csdn.net/xiangshangdemayi/article/details/124191178>

Windows设置开机启动的办法有很多种，

## 1. 将快捷方式放入系统启动路径

> 参考：<https://blog.csdn.net/xiangshangdemayi/article/details/124191178>

```shell
# 首先 Windows+R 打开 运行窗口
Windows+R
# 然后输入 内容
shell:common startup
# 打开的路径是：C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
```

## 2. 将快捷方式放入用户启动路径

> 参考：<https://blog.csdn.net/xiangshangdemayi/article/details/124191178>
> 参考：<https://blog.csdn.net/wyl20082988/article/details/119272689>

```shell
# 首先 Windows+R 打开 运行窗口
Windows+R
# 然后输入 内容
shell:startup
# 打开的路径是：C:\Users\用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

## 3. 任务计划程序方式

> 参考：<https://blog.csdn.net/xiangshangdemayi/article/details/124191178>

```shell
# 搜索并打开 计算机管理
# 找到 系统工具>任务计划程序
# 选择  创建基本任务 或者 创建任务
```

## 4. 注册表方式

> 参考：<https://blog.csdn.net/xiangshangdemayi/article/details/124191178>

```shell
# 首先 Windows+R 打开 运行窗口
Windows+R
# 然后输入 内容
regedit
# 用户启动项路径
计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
# 系统启动项路径1
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
# 系统启动项路径2
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
# 设置exe或者bat的路径
程序名字 REG_SZ 程序所在位置
```

## 5. 创建Windows服务方式

> 参考：<https://blog.csdn.net/xiangshangdemayi/article/details/124191178>
> 部分机器使用这两个命令并不生效，本人就遇到过，读者可以使用其他几种方式进行设置，不能再一棵树上吊死。

```shell
# 创建服务
sc create ServiceName binPath= D:\Debug\authSender.exe start= auto
# 删除服务
sc delete ServiceName
```
