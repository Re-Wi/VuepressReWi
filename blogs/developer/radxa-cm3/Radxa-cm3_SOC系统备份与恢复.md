---
title: radxa-cm3_SOC系统备份与恢复
date: 2024-06-09 23:30:00
tags:
  - 嵌入式平台
  - radxa-cm3
  - SOC
categories:
  - ARM
---

## 目录

[[toc]]

> > > CM3 官方也出了备份系统方法，有兴趣的可以尝试一下：https://docs.radxa.com/compute-module/cm3/mp-deployment/backup?method=online

## 方法一:整个硬盘复制与重写

参考：https://blog.51cto.com/u_15460722/4861190

> 无论备份还是恢复，都需要保证 of 指向的文件或磁盘空间要大于 if 指向的内容
> 查看磁盘：http://www.shbk.cn/qita/261232.html

```shell
#硬盘的分区情况
lsblk
#以GB方式查看
df -h
#查看所有的硬盘文件系统
df -a
```

### 1. 磁盘克隆

```shell
#也就是把整个硬盘复制一份。当然你首先需要在计算机上在接上一块新硬盘，并让系统识别。
#dd if=/dev/sda of=/dev/sdb​​

#把硬盘上的内容全部备份到一个磁盘文件中​
sudo dd if=/dev/mmcblk0 of=linuxBackup20230131.img​​
#也可以压缩一下：
#sudo gzip linuxBackup20230131.img #generates linuxBackup20230131.img.gz​​
```

直接备份在 SOC 要备份的硬盘不知道会不会形成循环，使文件很大
新增硬盘：U 盘或者使用 PC 共享文件夹：共享文件夹

> 共享文件夹方式备份，网速一般，磁盘读写速度一般，用时：15 分钟左右
> 完整脚本：backupToImg.sh

```shell
#!/bin/bash
date "+%Y-%m-%d %H:%M:%S"
echo "~~~~~~~~~~~~~~~~~~~~备份开始~~~~~~~~~~~~~~~~~~~~~~~~~"

#让sudo命令生效
echo rock | sudo -S ls

mkdir shared

# 目标： //<计算机IP>/<共享文件夹名>    ，说明: / 不能 \
sudo mount -t cifs -o username=rewi,password= //10.162.130.10/share shared

# shellcheck disable=SC2164
cd shared || exit
ls

#把硬盘上的内容全部备份到一个磁盘文件中
sudo dd if=/dev/mmcblk0 of=linuxBackup20230201.img
date "+%Y-%m-%d %H:%M:%S"
echo "~~~~~~~~~~~~~~~~~~~~备份完成~~~~~~~~~~~~~~~~~~~~~~~~~"

#也可以压缩一下：generates xxx.img.xz
#sudo xz linuxBackup20230201.img
#date "+%Y-%m-%d %H:%M:%S"
#echo "~~~~~~~~~~~~~~~~~~~~压缩完成~~~~~~~~~~~~~~~~~~~~~~~~~"

#清除
#cd ..
#sudo umount shared
#sudo rm -rf shared
```

1. 分区克隆

> 如果我们不想克隆整块磁盘，只想把某些存放数据的分区备份一下，你会需要克隆一个分区。正如预备知识所述，分区在 linux 下也是一个文件。
> ​​dd if=/dev/sda1 of=~/part1.img​​
> 也可以进行分区复制：
> ​​dd if=/dev/hda1 of=/dev/hda3​​

1. 从镜像文件恢复磁盘或分区

> of 和 if 指向的文件名互换一下即可实现恢复。
> ​dd if=linuxBackup20230131.img of=/dev/mmcblk0

### 2. 烧写系统

> 14.4G，用时：15 分钟左右

- 使用官方工具 RKDevTool 烧写

## 方法二:文件覆盖

> 参考：https://blog.csdn.net/sty1023750281/article/details/80877500 > https://blog.csdn.net/weixin_53064820/article/details/127755481

### 1. 将安装好环境的部分系统文件放入压缩包

> 完整脚本：-backupByTar.sh

```shell
#压缩太慢: sudo tar -Jcvpf linuxBackup20230131.tar.xz --exclude=linuxBackup20230131.tar.xz --exclude=/boot --exclude=/dev --exclude=/mnt  --exclude=/proc --exclude=/sys --exclude=/media /
sudo tar cvpzf linuxBackup20230131.tgz  --exclude=linuxBackup20230131.tgz --exclude=/boot --exclude=/dev --exclude=/mnt  --exclude=/proc --exclude=/sys --exclude=/media /
```

### 2. 通过网络、U 盘、USB 等方式将压缩包拷贝出来

### 3. 用 PC 传到新烧写系统的 CM3 中并解压到根目录

> 耗时 13 分钟左右
> 完整脚本：-recoveryByCover.bat

```shell
::解压缩
::压缩太慢:tar -Jxvf linuxBackup20230131.tar.xz -C /
adb devices
adb push linuxBackup20230131.tgz /home/rock/
adb shell "cd /home/rock/ && sudo tar xvpfz linuxBackup20230131.tgz -C / && sudo rm -rf linuxBackup20230131.tgz"
```

## 方法三：备份到镜像文件，自定义大小

### 前提

一个分区完成的镜像，如（任意名字）：rk3566-cm3Debian.img
分区参考：<磁盘操作>
已经分区好的（文件系统分区 5G 左右）：X:\Temp\XGH\cm3 待备份镜像

### 总备份脚本

挂载共享文件夹参考（剩余空间足够时可以不用挂载，但需要将备份镜像手动拷贝出来，挂载会降低一点点速度）：<共享文件夹>
`mkBackupImg.sh`

```shell
# 挂载一个保存镜像的磁盘（方便复制出来），挂载会降低一点点速度
# 如果核心板空间足够则不需要，备份好了通过网络传到电脑保存效果一样
# cd ~
# mkdir share
# sudo mount -t cifs -o username=rewi,password= //10.162.130.10/share ~/share
# cd ~/share

# 安装必要的包
sudo apt-get update
# parted & kpartx：虚拟磁盘工具
sudo apt-get install parted kpartx

# 查看 img 文件情况
# sudo fdisk -l rk3566-cm3Debian.img
sudo parted rk3566-cm3Debian.img print
# 查看磁盘使用情况
df -Th

# 将分区和 loop设备建立联系
# -o （起始扇区 * 扇区大小）--sizelimit （扇区数量 * 扇区大小） 字节
#sudo losetup -f -o 16777216 --sizelimit 536870912 rk3566-cm3Debian.img
#sudo losetup -f -o 553648128 --sizelimit 7515144192 rk3566-cm3Debian.img
loopdevice=`sudo losetup -f --show rk3566-cm3Debian.img`
device=`sudo kpartx -va $loopdevice | sed -E 's/.*(loop[0-9])p.*/\1/g' | head -1`
device="/dev/mapper/${device}"
partBoot="${device}p1"
partRoot="${device}p2"
# 查看是否成功
sudo losetup -l
lsblk

# 挂载设备
sudo mount -t ext4 $partRoot /media/
# 查看挂载情况
df -h
# 将文件系统内容复制到挂载的镜像
cd /media
ls
# 备份文件系统 或者 增删改 文件系统中的内容
sudo rsync -avxP --exclude="/home/rock/share" --exclude="/sys" --exclude="/dev" --exclude="/boot" --exclude="/mnt"  --exclude="/proc" --exclude="/media" / ./
# 过滤后创建空文件夹
sudo mkdir sys dev boot mnt proc media

# 拷贝完成，卸载分区
cd ~/share
sudo umount /media

# 备份完成，卸载虚拟磁盘
sudo kpartx -d $loopdevice
sudo losetup -d $loopdevice

# 查看
sudo losetup -l
```

将备份完成的镜像，rk3566-cm3Debian.img 通过烧写工具下载到核心板即可

## 备份系统

## 再新方法

> https://blog.csdn.net/Neutionwei/article/details/122669712

> https://blog.csdn.net/Neutionwei/article/details/121886647

> https://wiki.t-firefly.com/zh_CN/Firefly-Linux-Guide/manual_ubuntu.html

> https://wiki.t-firefly.com/zh_CN/ROC-RK3566-PC/

> https://blog.csdn.net/weixin_39510813/article/details/117824965
