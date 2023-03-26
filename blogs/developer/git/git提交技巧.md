---
title: Git提交技巧
date: 2023/02/20
tags:
 - Git
categories:
 - 提交技巧
---

## 使用shell脚本提取package.json版本

- http://www.longant.cn/zh-hans/node/6056
- https://stackoverflow.com/questions/44833218/extract-package-json-version-using-shell-script

```bash
# 方法一
VERSION=$(node -e "(function () { console.log(require('./package.json').version) })()")
# 方法二
sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json
# 方法三
NODE_VERSION=$(node -p -e "require('./package.json').version")
echo $NODE_VERSION
# 方法四
awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json
```

## git push -u 简单理解

- https://blog.csdn.net/weixin_48321825/article/details/124431351

```text
第一次提交需要加 -u参数后，
以后即可直接用git push代替git push origin master
```