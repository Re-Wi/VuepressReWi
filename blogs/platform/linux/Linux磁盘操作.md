---
title: Linux磁盘操作
date: 2023-02-28 19:00:00
tags:
 - 磁盘操作
 - command line
categories:
 - operating-system
 - linux
---

## 一、linux 制作分区img文件+官方系统镜像扩容

> 可在Linux虚拟机操作，不使用共享文件夹速度快很多

> 共享文件夹参考：<共享文件夹> 

> sudo mount -t cifs -o username=rewi,password= //10.162.130.10/share ~/share

> https://blog.csdn.net/leacock1991/article/details/113575966

> https://blog.csdn.net/talkxin/article/details/50456282

> https://cloud.tencent.com/developer/article/1175328

> 不要用fdsik处理gpt分区，也不要用gdisk处理mbr分区

### 1. 查看官方镜像分区情况

> 需要在官网下载一个烧录用的镜像文件，如：重命名后的radxa-cm3-io-ubuntu-server-gpt.img
```shell
# 查看 img 文件情况
sudo fdisk -l radxa-cm3-io-ubuntu-server-gpt.img
sudo parted radxa-cm3-io-ubuntu-server-gpt.img print
```
[官方镜像分区](./images/fdisk001.png)

## 2. 一般官方镜像空间较小，需要扩容
### 2.1 拷贝或者直接重命名 一份官方镜像
```shell
# 将 rsync 换成 cp 也可 
sudo rsync -vauP radxa-cm3-io-ubuntu-server-gpt.img rk3566-cm3Ubuntu.img
```
命令 加上time 可查看时间
[官方镜像](./images/fdisk002.png)
### 2.2 在核心板，查看待备份系统的磁盘使用情况
```shell
df -Th
```
[官方镜像](./images/fdisk003.png)

### 2.3 新镜像增加大小

> https://blog.csdn.net/wxwpxh/article/details/50532586

> https://wiki.radxa.com/Rock3/dev/Debian

> https://www.cnblogs.com/machangwei-8/p/10353628.html

> https://mlog.club/article/3546393

> https://blog.csdn.net/zhanghaiyang9999/article/details/82952112

要比使用情况大一点，如：比5G大1G ~ 6G
```shell
# 快速创建镜像 如：6G --> 文件系统空间未检测真实大小？？
# sudo dd if=/dev/zero of=rk3566-cm3Ubuntu.img seek=6G bs=1 count=1
# 就是在文件后面追加 5G 大小 --> 现在大小 = 原大小+5G
sudo dd if=/dev/zero of=rk3566-cm3Ubuntu.img bs=1MiB conv=notrunc oflag=append count=5120
```
[磁盘](./images/fdisk004.png)
[磁盘](./images/fdisk005.png)

### 2.4 给新镜像文件系统分区增加空间

- 修正分区表信息

> https://mlog.club/article/2581532

> https://mlog.club/article/2824620
```shell
# sudo sfdisk -d rk3566-cm3Ubuntu.img > PT_img.txt
sudo gdisk rk3566-cm3Ubuntu.img
```
```shell
# output Text
rewi@rewi-ubuntu:~/share$ sudo gdisk rk3566-cm3Ubuntu.img
GPT fdisk (gdisk) version 1.0.3

Warning! Problem closing file!
Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.

Command (? for help): p
Disk rk3566-cm3Ubuntu.img: 14392010 sectors, 6.9 GiB
Sector size (logical): 512 bytes
Disk identifier (GUID): 9AF3DD72-EBB1-4852-99EE-854B425B8432
Partition table holds up to 128 entries
Main partition table begins at sector 2 and ends at sector 33
First usable sector is 34, last usable sector is 3906216
Partitions will be aligned on 2048-sector boundaries
Total free space is 32734 sectors (16.0 MiB)

Number  Start (sector)    End (sector)  Size       Code  Name
   1           32768         1081343   512.0 MiB   EF00  boot
   2         1081344         3906216   1.3 GiB     8300  rootfs

Command (? for help): v

Problem: The secondary header's self-pointer indicates that it doesn't reside
at the end of the disk. If you've added a disk to a RAID array, use the 'e'
option on the experts' menu to adjust the secondary header's and partition
table's locations.

Identified 1 problems!

Command (? for help): w
Warning! Secondary header is placed too early on the disk! Do you want to
correct this problem? (Y/N): Y
Have moved second header and partition table to correct location.

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): Y
OK; writing new GUID partition table (GPT) to rk3566-cm3Ubuntu.img.
Warning: The kernel is still using the old partition table.
The new table will be used at the next reboot or after you
run partprobe(8) or kpartx(8)
The operation has completed successfully.
rewi@rewi-ubuntu:~/share$ 
```
> https://blog.csdn.net/s1429583654/article/details/127407015
```shell
# 刷新分区表
sudo partprobe rk3566-cm3Ubuntu.img
```
[磁盘](./images/fdisk006.png)

- 将剩余空间给分区2

> https://blog.csdn.net/qq_45443704/article/details/122136074

  ❌最终大小，-1 表示磁盘大小迁移1MB（也就是磁盘大小-1MB）
  ✔️留出1G未分配空间
```shell
sudo parted rk3566-cm3Ubuntu.img
```
[磁盘](./images/fdisk007.png)

### 2.5 查看新镜像分区情况
```shell
sudo parted rk3566-cm3Ubuntu.img print
# sudo fdisk -l rk3566-cm3Ubuntu.img
```
[磁盘](./images/fdisk008.png)

### 3. （重要）文件系统大小调整
#### 3.1 将分区和 loop设备建立联系
```shell
# dosfstools：fat32分区格式化工具
# dump：dump & restore 备份工具
# parted & kpartx：虚拟磁盘工具
sudo apt-get install dosfstools dump parted kpartx

loopdevice=`sudo losetup -f --show rk3566-cm3Ubuntu.img`
device=`sudo kpartx -va $loopdevice | sed -E 's/.*(loop[0-9])p.*/\1/g' | head -1`
device="/dev/mapper/${device}"
partBoot="${device}p1"
partRoot="${device}p2"
sudo losetup -l
# lsblk
```

[磁盘](./images/fdisk009.png)
[磁盘](./images/fdisk010.png)

#### 3.2 挂载分区

> https://blog.csdn.net/Zhang_Pro/article/details/128517982
```shell
# 选择一个目录
cd ~/share
# 建立挂载点
sudo mkdir rootfs
# 挂载
sudo mount /dev/mapper/loop30p2 rootfs/
```
[磁盘](./images/fdisk011.png)
#### 3.3 查看挂载情况
```shell
df -Th
```
[磁盘](./images/fdisk012.png)
#### 3.4 发现容量异常，解决办法

> https://blog.csdn.net/Linux_kiss/article/details/120859937

> https://www.cnblogs.com/hgzero/p/14193427.html
https://blog.csdn.net/wj78080458/article/details/83851147
```shell
sudo resize2fs -p /dev/mapper/loop30p2
df -Th
```
[磁盘](./images/fdisk013.png)
[磁盘](./images/fdisk014.png)

#### 3.5 卸载
```shell
# 挂载点
sudo umount /dev/mapper/loop30p2
# 虚拟磁盘
sudo kpartx -d $loopdevice
sudo losetup -d $loopdevice
```
[磁盘](./images/fdisk015.png)
分区镜像制作完毕，可以用于系统备份了

## 二、使用新img文件备份系统

>>> 此部分在待备份的操作系统中操作，速度也很快

### 1. 新增硬盘或直接备份

>>> 挂载一个保存镜像的磁盘（方便复制出来）: U盘或者使用PC共享文件夹：<共享文件夹>
>>> 如果核心板空间足够则不需要，备份好了通过网络传到电脑保存效果一样
在需要的位置创建文件夹，用于挂载镜像，如：`share`
```shell
cd ~
mkdir share
# sudo mount -t cifs -o username=rewi,password= //10.162.130.10/share ~/share
cd ~/share
```
### 2. 将分区和 loop设备建立联系
- 方法一
```shell
# parted & kpartx：虚拟磁盘工具
sudo apt-get install parted kpartx

loopdevice=`sudo losetup -f --show rk3566-cm3Ubuntu.img`
device=`sudo kpartx -va $loopdevice | sed -E 's/.*(loop[0-9])p.*/\1/g' | head -1`
device="/dev/mapper/${device}"
partBoot="${device}p1"
partRoot="${device}p2"
sudo losetup -l
# lsblk
```
[磁盘](./images/fdisk016.png)

- （跳过）方法二
 查看 img 文件情况
```shell
sudo fdisk -l rk3566-cm3Ubuntu.img
```
可知一共有两个区，以及各区相关信息。由于一共有两个区后面需要和两个loop设置建立联系。
注意记录下： 扇区大小 512 字节 ，各分区起止扇区编号`rk3566-cm3Ubuntu.img1(32768  1081343  1048576)` 和`rk3566-cm3Ubuntu.img2(1081344 12580959 11499616)`

[磁盘](./images/fdisk017.png)
这里需要进行一点计算
16777216 = 32768 * 512 ； 536870912 = 1048576 * 512 或 （1081343 - 2048 + 1）* 512 （注意： +1）
```shell
# -o （起始扇区 * 扇区大小）--sizelimit （扇区数量 * 扇区大小） 字节
sudo losetup -f -o 16777216 --sizelimit 536870912 rk3566-cm3Ubuntu.img
sudo losetup -f -o 553648128  rk3566-cm3Ubuntu.img
# 查看是否成功
sudo losetup -l
# lsblk
```

[磁盘](./images/fdisk018.png)

- （可能导致UUID不匹配，跳过）格式化分区

```shell
# 方法一
#boot分区用fat32进行格式化
# sudo mkfs.vfat $partBoot
# sudo mkfs.ext4 $partRoot
# 方法二
# sudo mkfs.fat /dev/loop5
# sudo mkfs.ext4 /dev/loop32
```
- （跳过）检查

> https://www.cnblogs.com/pyng/p/11820112.html

```shell
sudo fsck.ext4 -a -C0 /dev/loop1
```

3. 拷贝内容至新镜像
- 分区1EFI System的内容不用动
- 将分区2文件系统内容复制到新的镜像

> https://www.zhangshengrong.com/p/LKa4DxrPaQ/

> https://bbs.mymyjd.cn/article_65708.html

> https://blog.csdn.net/Cappuccino_jay/article/details/125162742

> https://blog.csdn.net/magiclyj/article/details/77126702

> https://blog.csdn.net/Dreamsi_zhang/article/details/104630468

> https://www.cnblogs.com/dachenyi/p/15292984.html
```shell
#跳过/home/rock/share不备份
# sudo chattr +d /home/rock/share
sudo mount -t ext4 $partRoot /media/
cd /media
# sudo dump -h 0 -0uaf - / | sudo restore -rf -
ls
sudo rsync -avxP --exclude="/home/rock/share" --exclude="/sys" --exclude="/dev" --exclude="/boot" --exclude="/mnt"  --exclude="/proc" --exclude="/media" / ./
# 过滤后创建空文件夹
sudo mkdir sys dev boot mnt proc media
# rsync -vauP --exclude=".*“ --exclude=”common/config“ projectA/ projectB
# -a 参数，相当于-rlptgoD，-r 是递归 -l 是链接文件，意思是拷贝链接文件；-p 表示保持文件原有权限；-t 保持文件原有时间；-g 保持文件原有用户组；-o 保持文件原有属主；-D 相当于块设备文件； 
# -P 传输进度； 
# -v 冗余模式，查看到文件列表等 
# -u update模式，如果目标文件新于源文件，则跳过 –update 仅仅进行更新，也就是跳过所有已经存在于DST，并且文件时间晚于要备份的文件，不覆盖更新的文件。
# -x, –one-file-system 不要跨越文件系统边界。
# 第一个exclude表示跳过所有.开头的隐藏文件 
# 第二个表示调过projectA/common/config目录，因为config目录下的文件，轻易不需改变，如果需要手动调整即可，注意这个参数是后面SRC参数的相对路径
cd
sudo umount /media
```
### 4. 备份完成，卸载虚拟磁盘
1. 方法一
```shell
sudo kpartx -d $loopdevice
sudo losetup -d $loopdevice
```

[磁盘](./images/fdisk019.png)

2. （跳过）方法二
```shell
cd ~/share
# 卸载挂载点
sudo umount rootfs boot
# 断开img和loop的联系
sudo losetup -d /dev/loop0 /dev/loop1
# 查看
sudo losetup -l
```
[磁盘](./images/fdisk020.png)

## 三、使用烧录工具烧写新镜像
将新制作的镜像保存到可以找到的地方
。。。。。。

## -- 其他操作
### 1. 查看磁盘情况
```shell
lsblk
```
[磁盘](./images/fdisk021.png)

### 2.  查看系统所有硬盘的分区信息
没有此工具则安装：`sudo apt-get install fdisk`
```shell
sudo fdisk -l
```
[磁盘](./images/fdisk022.png)

### 3. 查看磁盘使用情况
```shell
df -Th
```
[磁盘](./images/fdisk023.png)

### 4. 使用 fdisk 对loop设备分区
EFI系统分区最好根据官方镜像一致，另外一个分区使用剩余空间
  1. 输入 m 获取帮助
  2. 输入n添加新分区
  3. 输入 p 或者默认表示创建主分区（假设为 BOOT 分区）
  4. ...
  5. 输入 t 改变分区类型
  6. 输入 L 查看所有分区类型码表
  7. ...
  8. 输入 a 标记引导分区
  9. 输入 1 将分区 1 标记为可引导（如有需要指定引导分区）
  10. 输入 w 保存更改
大体步骤:
1. n 创建新分区，选择分区类型，选择分区号，选择第一个扇区，选择分区大小
2. 输入 t 进行改变分区类型操作
3. 输入 a 进行标记引导分区操作
```shell
sudo fdisk /dev/loop5
```
```shell
# output text
rewi@rewi-ubuntu:~/share$ sudo fdisk /dev/loop5

欢迎使用 fdisk (util-linux 2.31.1)。
更改将停留在内存中，直到您决定将更改写入磁盘。
使用写入命令前请三思。

设备不包含可识别的分区表。
创建了一个磁盘标识符为 0x9b4bf7b0 的新 DOS 磁盘标签。

命令(输入 m 获取帮助)： m

帮助：

  DOS (MBR)
   a   开关 可启动 标志
   b   编辑嵌套的 BSD 磁盘标签
   c   开关 dos 兼容性标志

  常规
   d   删除分区
   F   列出未分区的空闲区
   l   列出已知分区类型
   n   添加新分区
   p   打印分区表
   t   更改分区类型
   v   检查分区表
   i   打印某个分区的相关信息

  杂项
   m   打印此菜单
   u   更改 显示/记录 单位
   x   更多功能(仅限专业人员)

  脚本
   I   从 sfdisk 脚本文件加载磁盘布局
   O   将磁盘布局转储为 sfdisk 脚本文件

  保存并退出
   w   将分区表写入磁盘并退出
   q   退出而不保存更改

  新建空磁盘标签
   g   新建一份 GPT 分区表
   G   新建一份空 GPT (IRIX) 分区表
   o   新建一份的空 DOS 分区表
   s   新建一份空 Sun 分区表


命令(输入 m 获取帮助)： n
分区类型
   p   主分区 (0个主分区，0个扩展分区，4空闲)
   e   扩展分区 (逻辑分区容器)
选择 (默认 p)： 

将使用默认回应 p。
分区号 (1-4, 默认  1): 
第一个扇区 (2048-12582911, 默认 2048): 32768
上个扇区，+sectors 或 +size{K,M,G,T,P} (32768-12582911, 默认 12582911): 1081343

创建了一个新分区 1，类型为“Linux”，大小为 512 MiB。

命令(输入 m 获取帮助)： n
分区类型
   p   主分区 (1个主分区，0个扩展分区，3空闲)
   e   扩展分区 (逻辑分区容器)
选择 (默认 p)： 

将使用默认回应 p。
分区号 (2-4, 默认  2): 
第一个扇区 (2048-12582911, 默认 2048): 1081344
上个扇区，+sectors 或 +size{K,M,G,T,P} (1081344-12582911, 默认 12582911): 

创建了一个新分区 2，类型为“Linux”，大小为 5.5 GiB。

命令(输入 m 获取帮助)： p
Disk /dev/loop5：6 GiB，6442450944 字节，12582912 个扇区
单元：扇区 / 1 * 512 = 512 字节
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0x9b4bf7b0

设备         启动    起点     末尾     扇区  大小 Id 类型
/dev/loop5p1        32768  1081343  1048576  512M 83 Linux
/dev/loop5p2      1081344 12582911 11501568  5.5G 83 Linux

命令(输入 m 获取帮助)： t
分区号 (1,2, 默认  2): 1
Hex 代码(输入 L 列出所有代码)： L

 0  空              24  NEC DOS         81  Minix / 旧 Linu bf  Solaris        
 1  FAT12           27  隐藏的 NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 隐藏 或 In c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux 扩展      c7  Syrinx         
 5  扩展            41  PPC PReP Boot   86  NTFS 卷集       da  非文件系统数据 
 6  FAT16           42  SFS             87  NTFS 卷集       db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux 纯文本    de  Dell 工具      
 8  AIX             4e  QNX4.x 第2部分  8e  Linux LVM       df  BootIt         
 9  AIX 可启动      4f  QNX4.x 第3部分  93  Amoeba          e1  DOS 访问       
 a  OS/2 启动管理器 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad 休 ea  Rufus 对齐     
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         eb  BeOS fs        
 f  W95 扩展 (LBA)  54  OnTrackDM6      a6  OpenBSD         ee  GPT            
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        ef  EFI (FAT-12/16/
11  隐藏的 FAT12    56  Golden Bow      a8  Darwin UFS      f0  Linux/PA-RISC  
12  Compaq 诊断     5c  Priam Edisk     a9  NetBSD          f1  SpeedStor      
14  隐藏的 FAT16 <3 61  SpeedStor       ab  Darwin 启动     f4  SpeedStor      
16  隐藏的 FAT16    63  GNU HURD 或 Sys af  HFS / HFS+      f2  DOS 次要       
17  隐藏的 HPFS/NTF 64  Novell Netware  b7  BSDI fs         fb  VMware VMFS    
18  AST 智能睡眠    65  Novell Netware  b8  BSDI swap       fc  VMware VMKCORE 
1b  隐藏的 W95 FAT3 70  DiskSecure 多启 bb  Boot Wizard 隐  fd  Linux raid 自动
1c  隐藏的 W95 FAT3 75  PC/IX           bc  Acronis FAT32 L fe  LANstep        
1e  隐藏的 W95 FAT1 80  旧 Minix        be  Solaris 启动    ff  BBT            
Hex 代码(输入 L 列出所有代码)： ef

已将分区“Linux”的类型更改为“EFI (FAT-12/16/32)”。

命令(输入 m 获取帮助)： t
分区号 (1,2, 默认  2): 2
Hex 代码(输入 L 列出所有代码)： 83

已将分区“Linux”的类型更改为“Linux”。

命令(输入 m 获取帮助)： a
分区号 (1,2, 默认  2): 1

分区 1 的 可启动 标志已启用。

命令(输入 m 获取帮助)： w
分区表已调整。
将调用 ioctl() 来重新读分区表。
重新读取分区表失败。: 无效的参数

内核仍在使用旧分区表。新分区表将在下次重启或运行 partprobe(8) 或 kpartx(8) 后生效。

rewi@rewi-ubuntu:~/share$ 
```

## -- Linux物理分区大小调整

> https://www.cnblogs.com/shujk/p/12906183.html

> https://blog.csdn.net/qq_40545297/article/details/128152008

- 查看磁盘使用情况
```shell
df -Th
```
[磁盘](./images/fdisk024.png)

- 理分区大小调整
```shell
# 第二步将分区设置为245GB，扩大无所谓，缩小要看你空间占用，如果文件占用超过你设置的话，会有问题
sudo resize2fs /dev/mmcblk0p2 8G
# 分区增加至5G
sudo e2fsck -f /dev/loop1
sudo resize2fs /dev/loop1 5.5G
sudo lvextend -L 5G /dev/loop31
```
[磁盘](./images/fdisk025.png)

## -- 磁盘分区

> https://blog.csdn.net/qq_42287535/article/details/127529143

> https://blog.csdn.net/qq_41453285/article/details/86822769

### 查看服务器都有哪些磁盘
```shell
sudo fdisk -l
```
[磁盘](./images/fdisk026.png)

### 查看硬盘分区情况 
```shell
lsblk
```
[磁盘](./images/fdisk027.png)

### （失败，系统无法启动）使用命令 fdisk /dev/磁盘名称 进行分区
```shell
sudo fdisk /dev/mmcblk0p2
```
[磁盘](./images/fdisk028.png)
- 新建分区
[磁盘](./images/fdisk029.png)
