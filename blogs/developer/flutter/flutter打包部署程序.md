---
title: flutter打包部署程序
date: 2023-03-14 00:00:00
tags:
  - 程序部署
categories:
  - flutter
---

## 使用 InnoSetup 将 Flutter 打包成 exe 安装程序

- <https://juejin.cn/post/7108928269285589000>
- <https://blog.csdn.net/erone/article/details/122695816>

1. 下载 Inno Setup Inno Setup Downloads (jrsoftware.org): <https://jrsoftware.org/isdl.php#stable>

2. 打开 Inno Setup，选择 "Create a New Script file using the Script Wizard" 后点击 OK
3. 空选，点 next
4. 填写程序信息，这里很容易理解，应用名，应用版本，发布厂商，应用官网，填写一下进入下一步
5. 应用安装位置，这里我没有修改。应用文件夹可以根据应用名自行修改
6. 点击 Browse... 选择可执行文件
   这里很重要，Application main executable file 要选到{项目目录}\build\windows\runner\Release 下的 exe 文件。
7. 点击 Add file(s)... 将 exe 目录中的 dll 文件都加入进去
   Other application files 框的 Add file(s)选择{项目目录}\build\windows\runner\Release\flutter_windows.dll。

8. 点击 Add folder... 按钮选择 data 目录，在弹出的提示框中选择“是”
   Add folder 选择{项目目录}\build\windows\runner\Release\data 时会询问“是否包含子文件夹”，这里要选择是
   选择 “data”目录后点击 Edit... 按钮，在 “Destination subfolder”输入框中填入 “data”，不填安装后的目录结构不对导致无法运行。
9. 填写输出相关信息
   这里反选后点 next
10. 直接 next
11. 这里填写证书。由于我只是做了个小工具并不是很在乎版权，直接点了 next。大家可以按需填写，License 生成方式应该有大把教程。
12. 直接 next
13. 直接 next。（个人认为作用可能不是很大，我想选中文但是没找到选项...）
14. 选择脚本存储位置和生成文件名称
    这里选择输出的路径、名字和 icon，按需填写。
15. 直接 next
16. 第十二步跳转的下一步点击 finish 会有如下界面，这里选择是。
17. 然后会询问是否选择目录，我们选择否后就会开始编译。
18. 最后生成的安装包就在第十二步选择的位置。
