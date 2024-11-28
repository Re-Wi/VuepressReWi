---
title: flutter开发参考
date: 2023-02-27 00:00:00
tags:
  - 开发参考
categories:
  - flutter
---

## 完整教程|书籍

> 《Flutter 实战·第二版》： <https://book.flutterchina.club/>
> Flutter 实战 : <https://www.w3cschool.cn/flutter_in_action/flutter_in_action-kxgn3eyz.html>

## 状态管理指南篇——Provider

> <https://juejin.cn/post/6844903864852807694#heading-1>

## Flutter 常用表单介绍

- <https://juejin.cn/post/6844904162312863752>

```dart

```

## Flutter TextField 限制输入仅数字，字母，以及数字键盘，搜索完成设置

- <https://blog.csdn.net/jia635/article/details/117120444>
- <https://www.jianshu.com/p/1e6d37ee3b25>

## Flutter | 你真的会用 Slider 组件吗

- <https://juejin.cn/post/6959703051586240549>

## flutter - jsonEncode（DateTime）

- <https://blog.csdn.net/win7583362/article/details/107465371>
- <https://blog.csdn.net/hxl517116279/article/details/88378238>

```dart
  //padLeft(int width,String padding)：如果字符串长度小于width，在左边填充padding
 'date': "${instance.date.year.toString()}-${instance.date.month.toString().padLeft(2,'0')}-${instance.date.day.toString().padLeft(2,'0')}T${instance.date.hour.toString().padLeft(2, '0')}:${instance.date.minute.toString().padLeft(2, '0')}:${instance.date.second.toString().padLeft(2, '0')}+08:00",
```

## Flutter 文件上传和下载

- <https://www.jianshu.com/p/e867567dd2ff>
- <https://bytenote.net/article/164278401387986945>
