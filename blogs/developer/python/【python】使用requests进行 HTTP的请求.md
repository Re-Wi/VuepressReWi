---
title: 【python】使用requests进行 HTTP的请求
date: 2024-06-18 17:00:00
tags:
  - requests
  - web
categories:
  - Python
---

@[TOC](【python】使用 requests 进行 HTTP 的请求)

# 1 预备知识

## 1.2 具有一个提供请求的服务器

- 可用`python`的`Django`框架自己搭建（为防止篇幅太长，参见上一篇[【python】Django 2.2 搭建注册、登录服务器，带管理员查看权限验证](https://blog.csdn.net/rejoicewindow/article/details/119791721)。）

## 1.1 python json 转对象

想获取更多`json`知识，随便百度一篇吧：[https://www.cnblogs.com/qttblog/p/8615205.html](https://www.cnblogs.com/qttblog/p/8615205.html)

- 需要安装库： `json`
  - 安装方法：自行百度

## 1.2 requests 库的使用

想获取更多 requests 知识，随便百度一篇吧：[https://www.cnblogs.com/lanyinhao/p/9634742.html](https://www.cnblogs.com/lanyinhao/p/9634742.html)

- 需要安装库： `requests`
  - 安装方法：自行百度

# 2 POST 请求：登录

- post 注册请看上一篇[【python】Django 2.2 搭建注册、登录服务器，带管理员查看权限验证](https://blog.csdn.net/rejoicewindow/article/details/119791721)。

## 2.1 创建文件、导入库

- 新建随便找个地方，`HTTP_login.py`（名字随意，`*.py`的文件类型就好）
  加入代码：

```python
# HTTP_login.py
import requests
import json
```

## 2.2 发起请求，打印内容

```python
#往文件后面增加代码
datas = {"u_phone": "12345678902", "u_password": "666666"}
r = requests.post("http://127.0.0.1:8000/bike/appserver/users/?action=login", data=datas)
print(r.text)
print(r.status_code)
```

- 运行、输出：
-

```powershell
{"msg":"login success","user_id":7,"status":200,"token":"6f815a78c6c742558cef3be088089322"}
200
```

## 2.3 转化为对象、查看数据类型

```python
#往文件后面增加代码
res=r.text
print(type(res))
print(res)
res=json.loads(res)
print(type(res))
print(res)
```

- 运行、输出：
-

```powershell
{"msg":"login success","user_id":7,"status":200,"token":"081e5e8b5c65472592827567a5ec3045"}
200
<class 'str'>
{"msg":"login success","user_id":7,"status":200,"token":"081e5e8b5c65472592827567a5ec3045"}
<class 'dict'>
{'msg': 'login success', 'user_id': 7, 'status': 200, 'token': '081e5e8b5c65472592827567a5ec3045'}
```

# 3 GET 请求：获取个人数据：

## 3.1 将获取到的`token`加入请求头

```python
#往文件后面增加代码，为了直观，已将前面的 print行注释掉
headers = {'Authorization':res['token']} #转化为对象的好处之一，取数据方便
r = requests.get("http://127.0.0.1:8000/bike/appserver/users/7/", headers=headers)
print(r.request.headers)
print(r.text)
```

- 运行、输出：
-

```powershell
 {'User-Agent': 'python-requests/2.25.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Authorization': '182cc0e0d0954de58a0a5337cd070694'}
{"url":"http://127.0.0.1:8000/bike/appserver/users/7/","id":7,"u_name":"","u_phone":"12345678909","u_password":"666666","u_admin":false}
```

# 4 PATCH 请求：更新个人信息

- 题外话：暴露网络安全问题、`u_admin`字段也能被更新，获得了超级权限

```python
#往文件后面增加代码，为了直观，已将前面的 print行注释掉
headers = {'Authorization':res['token']} #转化为对象的好处之一，取数据方便
datas = {"u_name":"怿窗","u_phone": "12345678909", "u_password": "666666"}
r = requests.patch("http://127.0.0.1:8000/bike/appserver/users/7/",  data=datas,headers=headers)
print(r.text)
```

- 运行、输出：
-

```powershell
 {"url":"http://127.0.0.1:8000/bike/appserver/users/7/","id":7,"u_name":"怿窗","u_phone":"12345678909","u_password":"666666","u_admin":false}
```

# 4 put 、delete 请求：考虑操作性

- 可自己在服务器增加 API `URL`测试（直接继承`REST framework`封装好的，很方便）

# 5 options 请求：几乎所有 URL 都可用

```python
#往文件后面增加代码，为了直观，已将前面的 print行注释掉
r =requests.options("http://127.0.0.1:8000/bike/appserver/users/7/",  data=datas,headers=headers)
print(r.text)
```

- 运行、输出：
-

```powershell
{"name":"User Api","description":"","renders":["application/json","text/html"],"parses":["application/json","application/x-www-form-urlencoded","multipart/form-data"],"actions":{"PUT":{"url":{"type":"field","required":false,"read_only":true,"label":"Url"},"id":{"type":"integer","required":false,"read_only":true,"label":"ID"},"u_name":{"type":"string","required":false,"read_only":false,"label":"姓名","max_length":12},"u_phone":{"type":"string","required":true,"read_only":false,"label":"手机号","max_length":12},"u_password":{"type":"string","required":true,"read_only":false,"label":"密码","max_length":78},"u_admin":{"type":"boolean","required":false,"read_only":false,"label":"是否管理员"}}}}
```

# 6 代码优化，集注册、登录、查看一起

- 方案一：写个`WEB`页面
- 方案二：使用`pyqt`写个客户端页面
- 方案三：将前面代码封装成类，带提示调用
- 方案四：POSTMAN 等测试软件
- 方案五：用 QT 编写界面
- 方案六：用 Java 写
- …………
