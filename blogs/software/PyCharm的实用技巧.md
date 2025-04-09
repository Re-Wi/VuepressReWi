---
title: PyCharm的实用技巧
date: 2024-11-26 11:00:00
tags:
 - PyCharm
categories:
 - software
 - IDE
---

# 如何在 PyCharm 中使用文件头模板

1. 配置 PyCharm 文件模板：

- 打开 PyCharm。
- 进入 File > Settings（Windows/Linux）或 PyCharm > Preferences（macOS）。
- 在设置窗口中，导航到 Editor > File and Code Templates。
- 在右侧窗口中，选择 Python Script 或者 Includes，然后在模板编辑器中添加或修改模板内容。

```python
# -*- coding: UTF-8 -*-
"""
@Project    : ${PROJECT_NAME}
@File       : ${NAME}.py
@IDE        : ${PRODUCT_NAME}
@Author     : ${USER}  # 替换为当前系统用户名（方便开发人员区分）
@Date       : ${DATE} ${TIME}  # 日期和时间精确到秒
@License    : MIT
@Contact    : RejoiceWindow <RejoiceWindow@yeah.net>
@Description: ${DESCRIPTION}  # 这里可以填写简短的文件功能描述
@Version    : v0.0.0
@Dependencies: 
    - python3
@Changelog  : 
    - v0.0.0 (${DATE} ${TIME}): Initial version, implemented the core functionality.
    - v0.0.1 (${DATE} ${TIME})  # 记录文件版本更新的日志，例如修复的bug、增加的功能等
"""
```
