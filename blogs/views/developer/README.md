# 共享文件夹

## 1. Windows开启共享文件夹

- 选择需要共享的文件夹
- 右键->属性->共享完成关闭窗口
[Windows 共享文件夹](./WinSharedFolder.png)

## 2. Linux挂载共享文件夹

> 参考：<https://blog.csdn.net/weixin_42988176/article/details/123865945>

```shell
mkdir myWork
sudo mount -t cifs -o username=rewi,password= //10.162.129.92/firefly myWork
```
