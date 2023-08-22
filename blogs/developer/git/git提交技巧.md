---
title: Git提交技巧
date: 2023-02-20 00:00:00
tags:
 - 提交技巧
 - Git
categories:
 - developer
 - code repository
---

## 使用shell脚本提取package.json版本

- <http://www.longant.cn/zh-hans/node/6056>
- <https://stackoverflow.com/questions/44833218/extract-package-json-version-using-shell-script>

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

- <https://blog.csdn.net/weixin_48321825/article/details/124431351>

```text
第一次提交需要加 -u参数后，
以后即可直接用git push代替git push origin master
```

## 分支操作

### 查看分支

```shell
# git branch不带参数,列出本地已经存在的分支，并且在当前分支的前面用*标记，加上-a参数可以查看所有分支列表，包括本地和远程，远程分支一般会用红色字体标记出来
git branch -a
```

### 切换分支

```shell
# 其中远程分支为 origin/master
# 本地分支为 master
git checkout master
git checkout S32K146
git checkout S32K148
```

### 新建分支并切换到指定分支

```shell
# git checkout -b 本地分支名 origin/远程分支名
# 当参数设置为“-b”时，可以在新分支创建的同时切换分支
git checkout -b S32K146 origin/S32K146
git checkout -b S32K148 origin/S32K148
git checkout -b Vue3MasterReWi origin/Vue3MasterReWi
```

### 把远程分支拉到本地

```shell
git fetch origin S32K146
git fetch origin S32K148
```

### 远程分支上的内容都拉取到本地

```shell
git pull origin S32K146
git pull origin S32K148
```

## Commit code for multiple people

### git pull 可用

```shell
# 先查看状态，是否有改动
git status
# git stash save "名字" 将修改内容保存在堆栈中
git stash save
# 先git pull,拉取远程仓库所有分支更新并合并到本地
git pull origin master
# git stash pop（或git stash pop +名字）将堆栈中的修改应用到当前分支
git stash pop
# 查看修改，如果有冲突需要手动修改冲突
git status
# 把更新的代码添加到暂存区， git add [xxx]  //xxx为文件名，
# git add . 会把本地所有untrack的文件都加入暂存区，并且会根据.gitignore做过滤。
# git add * 会忽略.gitignore把任何文件都加入。
git add --all
# 将暂存区的更新提交到仓库区。
git commit -m "【更新】更新说明"
# 将本地分支的更新全部推送到远程仓库。
git push -u origin HEAD:master
# 再次查看状态，看是否还有文件没推送
git status
```

### git fetch 不好用

```shell
# 获取最新代码到本地【获取远端的origin/master分支】
git fetch origin master
# 查看版本差异【查看本地master与远端origin/master的版本差异】
git log -p master..origin/master
# 合并最新代码到本地分支【合并远端分支origin/master到当前分支】
git merge origin/master
# 先查看状态，是否有改动
git status
# 把更新的代码添加到暂存区， git add [xxx]  //xxx为文件名，
# git add . 会把本地所有untrack的文件都加入暂存区，并且会根据.gitignore做过滤。
# git add * 会忽略.gitignore把任何文件都加入。
git add --all
# 将暂存区的更新提交到仓库区。
git commit -m "Initial Commit"
# 将本地分支的更新全部推送到远程仓库。
git push -u origin HEAD:master
# 再次查看状态，看是否还有文件没推送
git status
```

## 修改远程提交
>
> 参考：<https://blog.csdn.net/Zsago/article/details/73618279>

## 删除(分两种情况)
>
> 分两种情况 参考： <https://www.jb51.net/article/253630.htm>

### 1. 删除最后一次提交

```shell
# 第一步：回滚上一次提交
git reset --hard HEAD^
# 第二步：强制提交本地代码 
git push origin master -f
# 由于本地reset之后本地库落后于远程几个版本，所以需要使用-f强制提交。
```

### 2. 删除指定commit提交（非最后一次提交）
>
> git log ：<https://blog.csdn.net/qq_34246965/article/details/108414930>

```shell
# 第一步：查看提交日志，获取要删除记录commit--2的前一次提交commit--1的提交ID
# 特别提示： rebase -i的ID一定是删除记录的前一次的提交ID
# git reflog命令中保留了从clone仓库开始,用户所有在本地库中的操作。 
git reflog
# 如果不带任何参数，它会列出所有历史记录，最近的排在最上方，显示提交对象的哈希值，作者、提交日期、和提交说明。如果记录过多，则按Page Up、Page Down、↓、↑来控制显示；按q退出历史记录列表。
git log
```

## git仓库迁移
>
> <https://blog.csdn.net/qq_42670703/article/details/123369326>

```shell
# 1. 随便找个文件夹，从原地址克隆一份裸版本库
git clone --bare 旧的git地址
# 2. 推送裸版本库到新的地址
cd xxx.git
git push --mirror 新的git地址 
# 3. 删掉xxx.git文件夹
#删不删无所谓，只是说明它没有用了而已。
#4. 代码迁移就成功了，接下来就可以使用新的地址了
git clone 新的git地址
```

## 强制提交

```shell
git clone <仓库>
git reset --hard HEAD^

//do something

git add --all
git commit -m "first commit"
git push -u -f
```
