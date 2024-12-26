---
title: yarn或者npm报错
date: 2024-06-19 00:30:00
tags:
  - web
  - 运行报错
categories:
  - vue
---

# yarn install 或者npm install出现error An unexpected error occurred错误的解决办法

使用 yarn install 或者 npm install 安装，以前可用，后面突然就不可用了。解决流程： 1.删掉 node_modules，

- 发现可以删，重新执行，成功
- 发现可以删，重新执行，报错：error An unexpected error occurred
- 发现删不掉，重新执行，报错：error An unexpected error occurred

  2.很可能是磁盘损坏，读写出现了问题

      来源：百度经验：用Windows系统自带工具修复硬盘

- 打开的命令行窗口中输入 chkdsk/? 回车来查看一下帮助的信息，在这里可以看到它的使用格式以及参数（ chkdsk 是一个检查磁盘的命令）。
- 根据需要，输入命令检查磁盘并修复磁盘上从错误，如要修复 E 盘上从错误，则输入 chkdsk E: /F（ /F 是一个用于修复磁盘上错误的参数，也可以根据需要和别的参数一起使用），然后 回车 ，它就开始检查了，检查好之后，若是存在坏的扇区，它就会自动修复，一会之后，它就检查并修复好了。

  3.重新执行，成功
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/519e96acf60141ba81aec604a957ca79.png)

# request to https://registry.npm.taobao.org failed, reason certificate has expired

> https://blog.csdn.net/maoge_666/article/details/136038003

```shell
npm config list
npm cache clean --force
npm config set registry https://registry.npmmirror.com
```