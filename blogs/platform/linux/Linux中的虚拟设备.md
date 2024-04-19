---
title: Linux中的虚拟设备
date: 2023-08-09 14:00:00
tags:
 - command line
 - 虚拟设备
categories:
 - operating-system
 - linux
---

> 参考：<https://blog.csdn.net/sinat_26058371/article/details/86754683>

## /dev/null

> “空”设备，也有人称它为黑洞。任何输入到这个“设备”的数据都将被直接丢弃。最常用的用法是把不需要的输出重定向到这个文件。

```shell
run.sh 1>/dev/null 2>&1  #将标准输出和错误输出重定向到/dev/null，运行这个脚本不会输出任何信息到终端
```

## /dev/zero

> “零”设备，可以无限的提供空字符（0x00，ASCII代码NUL）。常用来生成一个特定大小的文件。

```shell
dd if=/dev/zero of=./output.txt bs=1024 count=1 #产生一个1k大小的文件output.txt
```

## /dev/random 和 /dev/urandom

> 随机数设备，提供不间断的随机字节流。二者的区别是/dev/random产生随机数据依赖系统中断，当系统中断不足时，/dev/random设备会“挂起”，因而产生数据速度较慢，但随机性好；/dev/urandom不依赖系统中断，数据产生速度快，但随机性较低。

```shell
$ cat /dev/random | od -x
0000000 34fa b5ea 0901 b7e0 27a9 623a 0879 d9eb
0000020 d212 4f6f d928 6637 84a4 8ec5 fc2c 4896
$ cat /dev/urandom | od -x | head -n 5
0000000 8048 4dbd 07c9 2119 02d0 221b 89ba af7f
0000020 3d6f 6a72 3752 4a09 5a47 a3fb dc98 ed9f
0000040 f3e8 e82d 6748 2e14 de80 7554 bb52 f56c
0000060 de73 0e51 262f 5a63 af69 b45c ee49 c1bf
0000100 76b4 6db5 4e5b e438 70fb d207 a28c 04a8

#利用/dev/urandom设备产生一个128位的随机字符串
$ str=$(cat /dev/urandom | od -x | tr -d ' ' | head -n 1)
$ echo ${str:7}
17539187d2e8b8e26d49bec90465c14d 
```

## loop 设备

> <https://blog.csdn.net/leacock1991/article/details/113575966>
> <https://blog.csdn.net/scaleqiao/article/details/46777811>
> loop设备是一种伪设备，是使用文件来模拟块设备的一种技术，文件模拟成块设备后, 就像一个磁盘或光盘一样使用。

```shell
# 1）创建一个文件
dd if=/dev/zero of=/var/loop.img bs=1M count=10240
# 2）使用losetup将文件转化为块设备
losetup /dev/loop0 /var/loop.img
# 3）通过lsblk查看刚刚创建的块设备
lsblk |grep loop0
losetup -a
```
