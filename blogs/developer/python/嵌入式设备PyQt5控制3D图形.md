---
title: 嵌入式设备PyQt5控制3D图形
date: 2024-10-09 14:50:00
tags:
  - PyQt5
  - OpenGL
categories:
  - PyQt
---

# 环境搭建

要在嵌入式设备上使用 PyQt5 和 OpenGL 显示和旋转 3D 图形，你需要安装以下库：

## 1. PyQt5

使用 pip 安装 PyQt5：

```bash
pip3 install PyQt5
```

## 2. PyOpenGL

安装 PyOpenGL 和 PyOpenGL_accelerate（加速库）：

```bash
pip install PyOpenGL PyOpenGL_accelerate
```

## 3. 额外的依赖

确保安装其他必要的依赖：

- **Linux 系统**：如果你在 Linux 上开发，可能需要安装一些开发包，如：

```bash
  sudo apt-get install libglu1-mesa-dev freeglut3-dev
```

## 4. 示例安装命令

将以上命令整合在一起，运行以下命令进行安装：

```bash
pip install PyQt5 PyOpenGL PyOpenGL_accelerate
sudo apt-get install libglu1-mesa-dev freeglut3-dev
```

## 5. 确保环境正确

在嵌入式设备上，确保你的 Python 环境已正确设置，并且 OpenGL 驱动已正确安装。使用 `glxinfo | grep "OpenGL"` 命令来确认 OpenGL 是否可用。

安装完这些库后，你就可以使用 PyQt5 和 OpenGL 来构建 3D 图形应用。确保根据你的具体需求调整代码和配置。

# 报错处理

## Window 上可用，Linux 报错 glGetError

```shell
sudo apt-get install libglu1-mesa-dev freeglut3-dev
```
