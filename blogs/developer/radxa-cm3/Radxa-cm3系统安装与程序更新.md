---
title: Radxa-cm3系统安装与程序更新
date: 2024-06-09 23:30:00
tags:
  - 嵌入式平台
  - radxa-cm3
categories:
  - ARM
---

## 目录

[[toc]]

## 一、系统镜像烧写

系统烧写，详细信息看官网教程：https://wiki.radxa.com/Rock3/installusb-install-radxa-cm3-io
镜像获取网站：https://github.com/radxa/debos-radxa/releases
驱动下载：https://wiki.t-firefly.com/Core-3568J/03-upgrade_firmware.html

### 1. 下载镜像、引导文件、驱动与烧录软件

<img src="./images/radxa-cm3_flash001.png" width="600" />

优先使用安装好环境的镜像：解压出来的 xxx.img 文件
新镜像获取网站（迅雷下载比较快，目前使用 20230101 版本）：https://github.com/radxa/debos-radxa/releases

<img src="./images/radxa-cm3_flash002.png" width="600" />

引导文件下载地址：https://dl.radxa.com/rock3/images/loader/rock-3a/rk356x_spl_loader_ddr1056_v1.10.111.bin
驱动与烧录软件下载地址：https://wiki.radxa.com/Rock3/install/rockchip-flash-tools

<img src="./images/radxa-cm3_flash003.png" width="600" />

### 2. 解压驱动、烧录软件、镜像文件

<img src="./images/radxa-cm3_flash004.png" width="600" />

### 3. 安装驱动

<img src="./images/radxa-cm3_flash005.png" width="600" />

### 4. 打开烧录软件

<img src="./images/radxa-cm3_flash006.png" width="600" />

### 5. 自己编辑或者导入配置文件

配置文件：<官网下载>
暂时无法在飞书文档外展示此内容
<img src="./images/radxa-cm3_flash007.png" width="600" />
<img src="./images/radxa-cm3_flash008.png" width="600" />

### 6. 修改配置文件路径

修改 loader 文件在当前 PC 的路径：
<img src="./images/radxa-cm3_flash009.png" width="600" />

修改 image 文件在当前 PC 的路径：
<img src="./images/radxa-cm3_flash010.png" width="600" />

### 7. USB 数据线连接 PC，先断电

<img src="./images/radxa-cm3_flash011.png" width="600" />

### 8. 先按住按钮再上电，烧录软件显示发现`...MASKROM...`，执行烧录

<img src="./images/radxa-cm3_flash012.png" width="600" />

<img src="./images/radxa-cm3_flash013.png" width="600" />

### 9. 等待~~~~~~，烧写完成

<img src="./images/radxa-cm3_flash014.png" width="600" />

## 二、更新程序&文件--通过 ADB 工具

> > > ！更新程序时如果涉及到未安装的第三方包，两种解决方法：1. 联网安装，2. 下载 \*\*.whl 离线安装

### 1. 下载 ADB 工具，并配置

参考：<百度：Windows 下安装配置 adb https://android-sdk.en.softonic.com/download>

### 2. 连接测测试板与电脑

<img src="./images/radxa-cm3_update001.jpg" width="600" />

### 3. 电脑连接测试板上的 SOC

- 打开电脑命令行窗口，输入 cmd，回车，运行目录自动变为当前文件夹
  <img src="./images/radxa-cm3_update002.png" width="600" />

<img src="./images/radxa-cm3_update003.png" width="600" />

- 查找设备 指令：

```shell
adb devices
```

找到设备，显示设备编号：
<img src="./images/radxa-cm3_update004.png" width="600" />

### 4. 上传代码到测试板：

- 首先 PC 进入需要上传文件所在的文件夹
  <img src="./images/radxa-cm3_update005.png" width="600" />

- 输入上传指令，上传到 SOC 文件夹：`/home/rock/gyro/`
- （格式）adb push xxx(文件/文件夹) /(指定要放入的目标路径）
- `./` 为当前文件夹下所有文件与文件夹
- 文件路径与文件名相同则覆盖

```shell
adb push ./ /home/rock/gyro/
```

- 回车执行命令，等待~~~，上传成功
  <img src="./images/radxa-cm3_update006.png" width="600" />

1. 上传图片到测试板：

- 首先 PC 进入需要上传文件所在的文件夹
  命令中使用./上传，请确认放置的只有一个文件夹，如 3036x1708 文件夹中只有一个 3036x1708 文件夹
  <img src="./images/radxa-cm3_update007.png" width="600" />

- 再上图界面地址栏处输入上传指令（输入指令 cmd），上传到 SOC 中图片所在文件夹：`/home/rock/gyro/data/pattern/`
- （格式）adb push xxx(文件/文件夹) /(指定要放入的目标路径）
- `./` 为当前文件夹下所有文件与文件夹
- 文件路径与文件名相同则覆盖

```shell
adb push ./ /home/rock/gyro/data/pattern/
```

- 回车执行命令，等待~~~等待 2-3 分钟，过程请耐心等待：
  <img src="./images/radxa-cm3_update008.jpg" width="600" />

确认如下状态，显示 pushed，则代表，上传成功
<img src="./images/radxa-cm3_update009.png" width="600" />

- （可选）确认是否上传成功：
  进入核心板 shell 命令：

```shell
adb shell
```

<img src="./images/radxa-cm3_update010.png" width="600" />

查看是否有上传的文件夹：

```shell
cd /home/rock/gyro/data/pattern/
ls
```

<img src="./images/radxa-cm3_update011.png" width="600" />

查看文件夹中内容是否一致：

```shell
cd 3036x1708
ls
```

<img src="./images/radxa-cm3_update012.png" width="600" />
