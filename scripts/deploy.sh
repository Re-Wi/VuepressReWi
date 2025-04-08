#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 配置参数
DIST_DIR=".vuepress/dist"        # VuePress 构建输出目录
GITHUB_REPO="git@github.com:RejoiceWindow/vuepress-rewi_dist.git" # GitHub 仓库
BRANCH="mater"                    # GitHub 分支名称，默认为 main


# 构建 VuePress 文档 # 生成静态文件
echo "正在构建 VuePress 文档..."

npm run build

# 检查 VuePress 项目是否存在
if [ ! -d "$DIST_DIR" ]; then
  echo "VuePress 项目目录不存在: $DIST_DIR"
  exit 1
fi

# 进入生成的文件夹
cd "$DIST_DIR" || exit 1


# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

# deploy to github pages
echo "$GITHUB_REPO" > CNAME

VERSION=`node -p -e "require('../../package.json').version"`

# if [ -z "$GITHUB_TOKEN" ]; then
#   msg=${VERSION}': deploy'
#   githubUrl=git@github.com:RejoiceWindow/vuepress-rewi_dist.git
# else
msg=${VERSION}'：来自本地的自动部署'
githubUrl="$GITHUB_REPO"
# git config --global user.name "RejoiceWindow"
# git config --global user.email "ziranzhimi@yeah.net"
# fi

# date=`date +%Y-%m-%d_%H:%M:%S`
# git commit -m "deploy ${date}"

git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master # 推送到github master分支

# 如果你想要部署到 https://rejoicewindow.github.io
# git push -u -f https://github.com/RejoiceWindow/vuepress-rewi_dist.git

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -
rm -rf "$DIST_DIR"