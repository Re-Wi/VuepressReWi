# #!/usr/bin/env sh

# # 确保脚本抛出遇到的错误
# set -e

# # 生成静态文件
# npm run build

# # 进入生成的文件夹
# cd docs/.vuepress/dist

# # 如果是发布到自定义域名
# # echo 'www.yourwebsite.com' > CNAME

# git init
# git add -A

# date=`date +%Y-%m-%d_%H:%M:%S`
# git commit -m "deploy ${date}"

# #git commit -m 'deploy'

# # 如果你想要部署到 https://rejoicewindow.github.io
# git push -u -f https://github.com/RejoiceWindow/vuepress-rewi_dist.git

# # 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# # git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

# cd -

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd .vuepress/dist

# deploy to github pages
echo 'git@github.com:RejoiceWindow/vuepress-rewi_dist.git' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:RejoiceWindow/vuepress-rewi_dist.git
else
  msg='来自github actions的自动部署'
  githubUrl=git@github.com:RejoiceWindow/vuepress-rewi_dist.git
  git config --global user.name "RejoiceWindow"
  git config --global user.email "ziranzhimi@yeah.net"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master # 推送到github gh-pages分支

cd -
rm -rf .vuepress/dist