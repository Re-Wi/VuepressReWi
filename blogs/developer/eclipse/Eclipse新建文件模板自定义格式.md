---
title: Eclipse新建文件模板自定义格式
date: 2024-06-10 17:03:00
tags:
  - 软件工具
  - eclipse
categories:
  - IDE
---

## 1. 添加模板

[模板](./images/eclipse_temple001.png)

## 2. 自定义日期时间格式

```
${currentDate:date('yyyy-MM-dd HH:mm:ss')}
```

## 3. 自定义 头文件 防止重定义格式 不包括文件夾

> 参考：<https://stackoverflow.com/questions/12975841/how-to-have-an-include-guard-symbol-in-eclipse-with-an-uppercase-file-path>

> <http://hk.voidcc.com/question/p-kbvwqklw-wp.html>

> 如何去掉最后的 H*的下划线*

- 文件路径：`<workspace folder>\.metadata\.plugins\org.eclipse.core.runtime\.settings\org.eclipse.cdt.ui.prefs`
- 在文件第三行插入如下内容：
  - 说明：
    - 0 給出了一個大寫的文件名
    - 1 給出了一個 UUID
    - 2 給出了一個大寫的文件路徑

```
codetemplates.includeGuardGenerationScheme=0
```

- 保存文件，重啓`eclipse`軟件
