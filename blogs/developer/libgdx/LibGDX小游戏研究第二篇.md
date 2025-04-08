---
title: LibGDX小游戏研究第二篇
date: 2024-06-23 15:30:00
tags:
  - LibGDX
categories:
  - game
  - java
---

# **_LibGDX 小游戏研究第二篇_**

对于小白来说，看这个指北（https://gitee.com/vigiles/LibGDX2DGameGuideNorth）是完全懵的，完全不知道怎么用，所以百度了一下LibGDX的开源项目，看到像素鸟挺火的，就移植体验一下，经过一系列出错之后，成功移植了，现在记录下来。

## 一、下载源码：

百度到的源码地址：https://github.com/xietansheng/FlappyBirdForGDX
下载（右击 Clone or download，左击 Download）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020092612285454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

找到下载的文件，复制到方便的目录（最好无中文路径），解压、生成目录：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122908774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

## 二、打开工程、复制资源文件、修改启动方式：

打开第一篇中建好的工程、打开刚才解压的工程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122930159.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

点击 OK，选择新窗口打开：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926122940736.png#pic_center)

由于环境不一样，不能直接运行，作为小白，也不知道怎么修改配置，干脆直接复制粘贴到自己的工程吧。经过工程目录对比，一个一个的复制过去。
首先是资源文件（按住 Ctrl 键，左击三个目录、选择复制）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123000681.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

到自己工程的相应目录下，右击，选择粘贴：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123010257.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

选择 OK，我们项目就有相应资源文件了：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020092612302570.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

因为前面建的工程是横屏模式，而这个游戏是竖屏模式，所以需要改动 AndroidManifest.xml 的代码，直接找到像素鸟的文件复制：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123042302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

找到我们工程的 AndroidManifest.xml 文件，粘贴替换掉：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123328614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

## 三、复制逻辑代码：

打开 core，按住 ctrl 键，左击这 6 项，再右击选择复制：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123349348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

在我们工程下面右击 com.xxx.xxx，选择粘贴：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123440625.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

## 四、删除原来的文件中找不到的变量、函数和类

逐个打开刚才复制过来的所有.class 文件，删除找不到的变量、函数和类，左击报错的地方，同时按下 alt+enter 键、导入我们工程的中的变量、函数和类，有的变量、函数和类可能暂时找不到，先不用管，那在其他我们还没有修正的.java 文件里，由于还在报错，所以那个.java 文件没有编译，系统找不到那个变量、函数和类，我们可以先把能找到的都删除找不到的，然后按一遍 alt+enter 过去，会发现有的文件没有报错了，最后所有文件都没有报错，就算成功了。
第一个文件，删除：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123503957.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

能找到的，系统会出现下划线，并且提示其位置、左击到那里，按下 alt+enter：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123526534.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

第一个文件导入成功（其他文件没打开，其实是有错的，只是系统没有主动查错，需要自己打开文件，系统才会去找错误）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123548186.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

一个一个的文件打开过去，都可以导入成功，而其中 3 行代码困扰了我许久，都导入成功了还报错：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123602987.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

经过百度翻译，原来的类型不匹配，应该是 LibGDX 版本不一样导致的，来一个强制类型转换，成功解决：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123637704.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

## 五、修改初始化函数的实参

打开 Android 文件夹下的 AndroidLauncher.java 文件，将初始化实参改为像素鸟的，而不是我们建的那个。同理，将 Desktop 文件夹下的 DesktopLauncher.java 也改一下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123710456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)

## 六、运行效果

点击编译运行按钮，就可以玩像素鸟了。
效果：
Android：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123729901.png#pic_center)

Desktop（不知道在哪里设置窗口尺寸，所以挤到一起了）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200926123745711.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70#pic_center)
