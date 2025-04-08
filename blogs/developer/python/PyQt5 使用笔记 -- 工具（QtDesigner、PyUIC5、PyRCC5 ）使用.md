---
title: PyQt5 使用笔记 -- 工具（QtDesigner、PyUIC5、PyRCC5 ）使用
date: 2024-06-18 16:30:00
tags:
  - PyQt5
  - IDE
categories:
  - PyQt
---

## 最终效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/f8464e2f22f04e21aa6b3c27653ccc4e.png#pic_center)
![请添加图片描述](https://img-blog.csdnimg.cn/6789cdd972ac44ec82c6468e48fd0707.png)

## Windows 安装 PYQT5 及其工具

```shell
pip install PyQt5 -i https://pypi.douban.com/simple/
pip install PyQt5-tools -i https://pypi.douban.com/simple/
```

## QtDesigner：界面设计工具

### PyCharm 中添加为快捷工具

> 打开 pycharm 进入工程 ， 点击 file–>settings —.tools— extends Tools 的加号进行配置扩展程序

- 名称：`QtDesigner`（随意）
- 路径：`<Python的安装目录>\Python38\Lib\site-packages\qt5_applications\Qt\bin\designer.exe`
- 参数（调用程序的参数）：
  `$FileDir$\$FileName$` （法一：可以打开已有文件）
  `$FileDir$` （法二：打开文件所在目录）
  `$FilePath$` （法三：可以打开已有文件）
- 工作目录（优先保存文件位置）：
  `$ProjectFileDir$` （发一：项目所在目录）
  `$FileDir$` （法二：文件所在目录）

## PyUIC5 ：将 QtDesigner 设计的界面`.ui`文件转为`.py`文件

### PyCharm 中添加为快捷工具

- 名称：`PyUIC5`（随意）
- 路径：`<Python的安装目录>\Python38\Scripts\pyuic5.exe`
- 参数：`$FileName$ -o $FileNameWithoutExtension$_ui.py`
- 工作目录：`$FileDir$`

## PyRCC5 ：将 QtDesigner 制作的`.qrc`文件转为.py 文件

### PyCharm 中添加为快捷工具

- 名称：`PyRCC5 `（随意）
- 路径：`<Python的安装目录>\Python38\Scripts\pyrcc5.exe`
- 参数：`$FileName$ -o $FileNameWithoutExtension$_rc.py`
- 工作目录：`$FileDir$`

## Pyside2 的工具设置同理

- 。。。。。。

## Pyside6 的增加了一些实用工具，当前工具设置同理

- 。。。。。。
