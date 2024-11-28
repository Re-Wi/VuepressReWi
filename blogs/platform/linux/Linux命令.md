---
title: Linux命令
date: 2023-08-09 15:00:00
tags:
  - command line
categories:
  - operating-system
  - linux
---

# linux shell 时间格式化

```shell
date "+%Y-%m-%d %H:%M:%S"
```

# shell 中的 set -e ， set +e 用法

> <https://www.jianshu.com/p/277ef9d192a2>

```text
也就是说，在"set -e"之后出现的代码，一旦出现了返回值非零，整个脚本就会立即退出。有的人喜欢使用这个参数，是出于保证代码安全性的考虑。但有的时候，这种美好的初衷，也会导致严重的问题。
```

# LOG 到文件

## tee 命令

如果你想在终端和文件中同时查看输入和输出,你可以使用'tee'命令,这个命令可以将标
准输入和标准输出复制到文件并显示在终端上。以下是一个示例 الا:

```shell
python your_script.py | tee output.log

```

在这个示例中,`your_script.py'是你的Python脚本,'output.1og'是你想要保存输出的
文件名。这个命令会同时在终端上显示输出,并将其写入`output.log.文件。
请注意,'tee'命令通常在 Unix/Linux 系统上可用,如果你使用的是 Windows 系统,你可以
考虑使用 Windows 版本的'tee'或其他类似工具。

```shell
# 用脚本这样：
python3 main.py | tee "AAA$(date +'%Y%m%d%H%M%S')BBB.log"
```
