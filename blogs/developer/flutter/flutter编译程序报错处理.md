---
title: flutter编译程序报错处理
date: 2023/02/20
tags:
 - 报错处理
categories:
 - flutter
---

## Exception: Unable to find suitable Visual Studio toolchain. Please run `flutter doctor` for more details.

- https://flutter.cn/docs/development/platform-integration/desktop

```shell
flutter channel
flutter channel master
flutter upgrade
flutter channel
# flutter doctor 查看故障是否解决
flutter doctor
```

## Failed to load font Roboto at https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf

换个网络 或者 修改字体<未验证>

- https://blog.csdn.net/longlyboyhe/article/details/114268663

## 卡死在 Running Gradle task 'assembleDebug'...

- https://flutteragency.com/solve-running-gradle-task-assembledebug/

> If you are on Windows: try adding firewall exceptions to your Android Studio follow below steps:

```bash
# Open your flutter Project directory.
# Change directory to android directory in your flutter project directory 
cd android
# lean gradle 
./gradlew clean
# Build Gradle 
./gradlew build 
# or you can combine both commands with just 
# ./gradlew clean build.
# Now run your flutter project. If you use vscode, press F5. The first time Gradle running assembly debug will take time.
```
