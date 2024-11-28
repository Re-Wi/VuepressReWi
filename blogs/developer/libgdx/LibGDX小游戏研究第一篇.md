---
title: LibGDX小游戏研究第一篇
date: 2024-06-23 15:30:00
tags:
  - LibGDX
categories:
  - game
  - java
---

@[TOC](LibGDX小游戏研究第一篇)

# **_LibGDX 小游戏研究第一篇_**

- 对于没怎么学过 Java，却对开发游戏有着及其浓厚的同学，终于可以在闲暇时光开始实践了。在 Java 基本语法都没搞清楚的情况下，用 Android Studio 做了一个简易的 APP，但是应用的 APP 特效和交互感不是很好，并不适合娱乐。
- 在一次偶然的机会下，接触了一个很好用的完全开源的游戏开发引擎--LibGDX，决定试一下，由于中文教程很少，中间可能会碰到许多问题，现在把解决的问题记录下来。

# 一、不需要 Android Studio 新建工程，LibGDX 有自己的建工程的工具

下载链接：https://libgdx.badlogicgames.com/download.html
点击：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121632390.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

获得：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121651342.png#pic_center)

双击或者命令行打开：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121717633.png#pic_center)

1.选择生成路径（我使用时 Android Studio 不支持中文路径，所以选择英文） 2.选择平台，可以多选
3.Extension 新手全部置空，还没去了解有什么功能。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121734355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

4.点击 advance，添加 Maven 服务器地址：
国内阿里云可以：http://maven.aliyun.com/nexus/content/groups/public
或者这个网站（https://gitee.com/vigiles/LibGDX2DGameGuideNorth）推荐的网址：https://jcenter.bintray.com/ 5.保存
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121755843.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

6.点击 Generate：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121809836.png#pic_center)

7.完成(当然也可以用生成项目文件时这个工具说说的用 Eclipse、IntelliJ IDEA、NetBeans 打开，似乎更好使，我没用过，就不展示了)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121820908.png#pic_center)

# 二、Android Studio 直接打开工程

1.打开 Android Studio，选择打开工程
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121833579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

2.找到刚才生成的工程：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121847612.png#pic_center)

3.确定：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121859298.png#pic_center)

4.打开后直接点击编译：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121917161.png#pic_center)

5.成功运行![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121933704.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

6.APP 效果：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926121954655.png#pic_center)

7.AndroidManifest.xml 代码中将之强制为横屏模式：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122007417.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

8.刚才的生成的目录结构：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122019333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

9.看看桌面版生成效果：
右击、点击 run…：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122053296.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)
出现：![在这里插入图片描述](https://img-blog.csdnimg.cn/2020092612221285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

项目就这样建好了，我们一句代码也没写，就产生了两个平台的游戏程序，这个开发引擎是不是很赞。

下一篇：[LibGDX 小游戏研究第二篇](https://blog.csdn.net/rejoicewindow/article/details/108810422)
