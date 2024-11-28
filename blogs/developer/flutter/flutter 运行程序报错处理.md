---
title: flutter 运行程序报错处理
date: 2023-03-24 00:00:00
tags:
  - 运行报错
categories:
  - flutter
---

## Failed to upload file: FormatException: Unexpected character(at 0 character 2)

- <https://stackoverflow.com/questions/55671441/flutter-formatexception-unexpected-character-at-character-1>

```dart
 var pdfText= await json.decode(json.encode(response.databody);
```
