---
title: Vuepress操作项目报错处理
date: 2023-02-20 00:00:00
tags:
  - vuepress
  - 项目报错
  - web
categories:
  - vue
---

## X [ERROR] Could not read from file: C:\XXX\vue\dist\vue.runtime.esm-bundler.js

> 安装`node_modules`时先不要使用`cnpm`，使用`npm`生成`package-lock.json`文件即可运行

```shell
# npm √ , cnpm ×
npm install

npm run dev
```
