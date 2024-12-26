---
title: KEIL-MDK查看、复制源代码乱码问题、编码转换为UTF-8等格式
date: 2024-06-18 17:00:00
tags:
  - KEIL-MDK
categories:
  - IDE
  - MCU
---

@[TOC](KEIL-MDK查看、复制源代码乱码问题、编码转换为UTF-8等格式)

## 一、打开程序看见中文乱码解决方法

1. 打开效果如图
   ![中文乱码](https://img-blog.csdnimg.cn/a266c9089dd54044a6039b0905f465a7.png)
2. 解决方法

- 修改编辑器编码格式
- 打开设置窗口
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c2f7533621c9429d9b20a65e04d92bd4.png)
  - 修改编码为`ANSI`
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/1058baeb63b447959e69cc6ce551288a.png)

3. 解决效果
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/f5d35ba038c74b43a95cd558d15b2fb0.png)

## 二、复制代码为中文乱码

1. 复制效果
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/e2926b9943b148ada92cf125b46c91a0.png)
2. 解决方法

- 修改编辑器编码格式
- 打开设置窗口
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c2f7533621c9429d9b20a65e04d92bd4.png)
  - 修改编码为`GB2312`
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/3d49b526f0034553b3eeb232110cf8f8.png)

3. 解决效果
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/08ad992bf5994b768de162d0d32cb403.png)

## 三、转化为其他编码格式

### 方法一、使用记事本

- 将代码复制到记事本，默认为`UTF-8`，直接保存即可
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/f3c036948b0e4c789af233c1e57a177d.png)

### 方法二、使用`Notepad++`

- 转好保存即可
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/b523765fa32f425892f1f21b81a9dd56.png)

### 方法三、使用`Python`

- 需求不高，暂时省略
