---
title: pyside6-deploy、pyside6-project和nuitka的报错终于解决了
date: 2024-06-18 16:30:00
tags:
  - pyside6
  - 发布报错
categories:
  - pyside
---

@[TOC](pyside6-deploy、pyside6-project 和 nuitka 的报错终于解决了 🤗🤗🤗)

**总结：**

> 不是工具问题，是本地环境问题
> 未及时截图，环境已经恢复了，下文就没有图片了

# 执行 `pyside6-deploy` 或 `pyside6-project` 报错

报错内容找不到任何有效信息，只能看见`执行XXX` 返回了 `非0`

## 分析

从 PySide6 的官网<[pyside6-deploy: the deployment tool for Qt for Python](https://doc.qt.io/qtforpython-6/deployment/deployment-pyside6-deploy.html)>上可以看见，`pyside6-deploy`是基于`Nuitka` 的
![](https://img-blog.csdnimg.cn/dfb2b014d2e940fda2633fe8b5988819.png)

同时也写出了直接使用`Nuitka` 的方法步骤：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a33c3e74af364cd9a542a4853edaa073.png)

## 使用原生命令查找错误来源

```shell
python -m nuitka --standalone --plugin-enable=pyside6 main.py
```

可以观察到，它会很多地方查找并引用`.dll `文件，而在我的环境变量中，存在错误的`msvcrt.dll`文件路径，并且会显示这个路径（一条乱码，不过还是可以看见盘符`d:\`的）

## 分析问题

这个工具不支持中文路径，报错的路径中至少存在一个英文路径，可以很快定位，如果没有，可以使用搜索工具去看看`msvcrt.dll`是否在某个中文安装路径下也有
例如：我的是在`微信开发者工具`里面

## 解决问题

为了省事，我直接卸载了这个影响的软件 😌😌😌
然后就可以了
![在这里插入图片描述](https://img-blog.csdnimg.cn/6d67f893d2d04372a76fcd7b4f2f8099.png)

# 其他类似问题

> 我使用`LibFT4222`的 C++版的`samples`，
> 前面一直编译不成功，我以为包本身问题，
> 因为我尝试了`QT`和`Visual Studio 2022`都没有成功，报了各种找不到的错，就没管了，
> 今天为了查错，把`QT`也卸载了 😱😱😱
> 上面成功之后，再次使用`Visual Studio 2022`尝试，居然一次成功了 🥹🥹🥹
