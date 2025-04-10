#!/bin/bash

PACKAGE_FILE="'../../../package.json'" # 项目的 package.json 文件路径

# 提交变更集
npm changeset

# 提升版本
npm changeset version

# 新增版本 commit# get new version
VERSION=$(node -p "require($PACKAGE_FILE).version")
git add .
git commit -m "v${VERSION}"
git push

# 打 tag
git tag -a "v${VERSION}"
git push origin "v${VERSION}"

# 发布到 dist-tag latest 下
npm changeset publish --tag latest
