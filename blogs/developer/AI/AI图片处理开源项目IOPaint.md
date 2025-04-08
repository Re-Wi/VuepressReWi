---
title: AI图片处理开源项目IOPaint
date: 2023-03-02 00:00:00
tags:
  - AI
  - IOPaint
categories:
  - Python
---

# 安装

- 参考： <https://github.com/Sanster/IOPaint>

```shell
python3 -m pip install iopaint -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

# 运行

Start webui

```shell
iopaint start --model=lama --device=cpu --host=0.0.0.0 --port=8080
```

# 插件

Plugins

```shell
iopaint start --enable-interactive-seg --interactive-seg-device=cuda
```

## 模糊图像修复插件使用

- <https://blog.csdn.net/weixin_44726183/article/details/138667937>

## 安装依赖

```shell
pip3 install realesrgan
```

## 运行

```shell
iopaint start --enable-realesrgan --realesrgan-model RealESRGAN_x4plus --realesrgan-device cpu --model=lama --device=cpu --host=0.0.0.0 --port=8080
```
