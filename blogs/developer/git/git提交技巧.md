---
title: Git提交技巧
date: 2023-02-20 00:00:00
tags:
  - 提交技巧
categories:
  - Git
---

练习：<https://learngitbranching.js.org/?locale=zh_CN&NODEMO=>

## 使用 shell 脚本提取 package.json 版本

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

### 将本地分支推送到远程

```shell
# git push <远程主机名> <本地分支名>:<远程分支名>
git push -u origin S32K146:S32K146
git push -u origin S32K148:S32K148
```

### git push -u 简单理解

- <https://blog.csdn.net/weixin_48321825/article/details/124431351>

```text
第一次提交需要加 -u参数后，
以后即可直接用git push代替git push origin master
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

- <https://blog.csdn.net/m0_47403102/article/details/122538395> -
- <https://blog.csdn.net/m0_47403102/article/details/122538395>
- <https://www.cnblogs.com/linhuaming/p/16290892.html>

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

> 参考：<https://blog.csdn.net/Zsago/article/details/73618279>

## 删除(分两种情况)

> 分两种情况 参考： <https://www.jb51.net/article/253630.htm>

### 1. 删除最后一次提交

```shell
# 第一步：回滚上一次提交
git reset --hard HEAD^
# 第二步：强制提交本地代码
git push origin master -f
# 由于本地reset之后本地库落后于远程几个版本，所以需要使用-f强制提交。
```

### 2. 删除指定 commit 提交（非最后一次提交）

> git log ：<https://blog.csdn.net/qq_34246965/article/details/108414930>

```shell
# 第一步：查看提交日志，获取要删除记录commit--2的前一次提交commit--1的提交ID
# 特别提示： rebase -i的ID一定是删除记录的前一次的提交ID
# git reflog命令中保留了从clone仓库开始,用户所有在本地库中的操作。
git reflog
# 如果不带任何参数，它会列出所有历史记录，最近的排在最上方，显示提交对象的哈希值，作者、提交日期、和提交说明。如果记录过多，则按Page Up、Page Down、↓、↑来控制显示；按q退出历史记录列表。
git log
```

## 强制提交

```shell
git clone <仓库>
git reset --hard HEAD^

// do something

git add --all
git commit -m "first commit"
git push -u -f
```

## Git 清除贡献者信息和历史提交记录

> <https://blog.csdn.net/Liu_Wd/article/details/120910899>
> 注意：历史记录清除后无法回滚。目前这个仓库算是一个新的仓库，以后所有的修改只需要在现在基础上修改。
> 总结：大概步骤就是把 master 分支复制，删除原有分支，用新的分支覆盖旧分支。从而完成分支替换，清除历史记录。

```shell
#1.Checkout
# 检出新的分支
# orphan参数用于创建没有commit记录的分支
git checkout --orphan latest_branch
#2.Add all the files
# 添加分支的所有文件
git add -A
#3.Commit the changes
#提交更改并写明提交描述
git commit -am "这是我提交的描述"
#4.Delete the branch
#删除之前的主分支
git branch -D master
#5.Rename the current branch to master
#将当前这个分支重命名为master，是它变成主分支
git branch -m master
#6.Finally, force update your repository
#最后，强制更新到主分支master
git push -f origin master
```

## git 仓库迁移不修改

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

## git 仓库迁移修改

### git 修改当前项目仓库地址

<https://blog.csdn.net/halo1416/article/details/123566471>

方法 1：
删除本地仓库当前关联的无效远程地址，再为本地仓库添加新的远程仓库地址

```shell
git remote -v                       // 查看git对应的远程仓库地址
git remote rm origin                // 删除关联对应的远程仓库地址
git remote -v                       // 查看是否删除成功，如果没有任何返回结果，表示OK
git remote add origin "新的仓库地址" // 重新关联git远程仓库地址
```

方法 2：
直接修改本地仓库所关联的远程仓库的地址

```shell
git remote                                                              // 查看远程仓库名称：origin
git remote get-url origin                  // 查看远程仓库地址
git remote set-url origin "新的仓库地址"    // ( 如果未设置ssh-key，此处仓库地址为 http://... 开头)
```

方法 3：
修改 .git/config 配置文件

```shell
cd .git      // 进入.git目录
vim config   // 修改config配置文件，快速找到remote "origin"下面的url并替换即可实现快速关联和修改
```

### 更新作者

<https://blog.csdn.net/qq_20515461/article/details/109270949>

#### 修改默认提交时的作者信息

全局修改：本机所有 git 仓库均被改变

```shell
git config --global user.name "ReWi"
git config --global user.email "RejoiceWindow@yeah.com"
```

当前仓库：只修改当前仓库

```shell
git config user.name "ReWi"
git config user.email "RejoiceWindow@yeah.com"
```

#### 修改已经提交的作者信息

<https://blog.csdn.net/mocoe/article/details/84344411>
修改之前的任意一次提交

```shell
git log
# amend命令只会修改最后一次commit的信息，之前的commit需要使用rebase
git rebase -i HEAD~3
# 要修改哪个，就把那行的pick改为edit，然后退出。例如想修改commit 1的author，光标移到第一个pick，按i键进入INSERT模式，把pick改为edit：
edit 1 commit 1
pick 2 commit 2
pick 3 commit 3
...
-- INSERT --
# 然后按esc键，退出INSERT模式，输入:wq退出，这时可以看到提示，可以修改commit 1的信息了：
输入amend命令重置用户信息：
git commit --amend --reset-author
会出现commit 1的提交记录及注释内容，可进入INSERT模式修改注释，:wq退出。这时再查看提交历史，发现commit 1的author已经变成b(b@email.com)了，且是最新一次记录。
通过continue命令回到正常状态：
git rebase --continue
```

### 批量修改已经提交的作者和时间戳信息

<https://blog.csdn.net/qq_20515461/article/details/109270949>

```shell
git filter-branch --env-filter '
WRONG_EMAIL="ReWi@rewi.xyz"
NEW_NAME="ReWi"
NEW_EMAIL="RejoiceWindow@yeah.com"

if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
     export GIT_AUTHOR_DATE="Thu Feb 18 14:00 2021 +0000"
     export GIT_AUTHOR_NAME="$NEW_NAME"
     export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi ' --tag-name-filter cat -- --branches --tags
```

## 更新提交记录的贡献者和时间戳

<https://www.cnblogs.com/fe-linjin/p/10814935.html>

```shell
git log
# git rebase -i HEAD~6
git rebase -i master^^    // 假设我们当前在master分支
# ^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^^表示 当前master 指向的 commit 之前倒数第2个 commit
# ~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：master~2 表示的和master^^是一样操作。
# 接下来可以操作的命令都在上图中显示了，我们要做的是编辑，并且要编辑的是第一行（它的排列顺序是一个正序排序，也就是说旧的commit信息在上面，新的commit在下面），我们将pick改为edit，vim操作大概是输入i -> 将pick改为edit -> esc -> :wq
git commit --amend
git rebase --continue
```

#### 批量修改已经提交的贡献者和时间戳信息

```shell
git filter-branch --env-filter '
WRONG_EMAIL="ReWi@rewi.xyz"
NEW_NAME="ReWi"
NEW_EMAIL="RejoiceWindow@yeah.com"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
    export GIT_COMMITTER_DATE="Thu Feb 18 14:00 2021 +0000"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
    export GIT_AUTHOR_DATE="Thu Feb 18 14:00 2021 +0000"
fi
' --tag-name-filter cat -- --branches --tags
```

## 批量更改多个提交者和作者的信息

```shell
git filter-branch --env-filter '
WRONG_EMAIL="ReWi@rewi.xyz"
NEW_NAME="ReWi"
NEW_EMAIL="RejoiceWindow@yeah.com"

case "$GIT_COMMITTER_EMAIL" in
    "$WRONG_EMAIL")
        export GIT_COMMITTER_NAME="$NEW_NAME"
        export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
        ;;
    "old2@example.com")
        export GIT_COMMITTER_NAME="New Name 2"
        export GIT_COMMITTER_EMAIL="new2@example.com"
        ;;
esac

case "$GIT_AUTHOR_EMAIL" in
    "$WRONG_EMAIL")
        export GIT_AUTHOR_NAME="$NEW_NAME"
        export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
        ;;
    "old2@example.com")
        export GIT_AUTHOR_NAME="New Name 2"
        export GIT_AUTHOR_EMAIL="new2@example.com"
        ;;
esac
' --tag-name-filter cat -- --branches --tags
```

## 本地项目迁移

```bash
git remote set-url origin ssh://git@XXX.git
git push -u origin --all
git push origin --tags
```

## 提交规范

["feat"]="新功能（feature）"
["fix"]="修复bug"
["docs"]="文档（documentation）"
["style"]="格式（不影响代码运行的结果，如缩进、空格等）"
["refactor"]="重构（即不是新增功能，也不是修复bug）"
["test"]="增加测试、修改测试"
["chore"]="构建过程或辅助工具的变动"
["perf"]="性能 (提高代码性能的改变)"
["build"]="影响构建系统或外部依赖项的更改(maven,gradle,npm 等等)"
["ci"]="对 CI 配置文件和脚本的更改"
["revert"]="Revert a commit"
["types"]="类型定义文件更改"
["workflow"]="工作流改进"
["wip"]="工作进行中（Work In Progress）"
["config"]="配置文件的改动"
["locale"]="国际化/本地化的改动"
["security"]="安全相关的改动"

提交信息通常采用以下格式：

```text
<type>(<scope>): <subject>
```

`<type>`：提交类型（如 `feat`、`fix` 等）。
`<scope>`（可选）：影响范围（如模块名、组件名等）。
`<subject>`：简短描述提交内容。

示例：

```text
feat(user): 添加用户注册功能
```

### 自动生成 CHANGELOG

(1) standard-version
standard-version 是一个基于 Conventional Commits 规范的工具，可以自动生成 CHANGELOG 文件并更新版本号。

(2) conventional-changelog-cli
conventional-changelog-cli 是一个专门用于生成 CHANGELOG 的工具，支持多种格式和模板。
安装：

```bash
npm install -g conventional-changelog-cli
```

使用：
运行以下命令生成 CHANGELOG：

```bash
conventional-changelog -p angular -i CHANGELOG.md -s
```

`-p angular`：指定提交规范类型（如 Angular、Atom 等）。
`-i` CHANGELOG.md：指定输出文件。
`-s`：将新内容追加到现有 CHANGELOG 文件中。

示例输出：
与 standard-version 类似，会根据提交信息生成 CHANGELOG。

```markdown
# Changelog

## [1.0.0](https://github.com/your-repo/compare/v0.1.0...v1.0.0) (2023-10-01)

### Features
- feat(user): 添加用户注册功能 ([commit-hash](https://github.com/your-repo/commit/hash))

### Bug Fixes
- fix(auth): 修复用户登录失败问题 ([commit-hash](https://github.com/your-repo/commit/hash))
```

(3) git-chglog
git-chglog 是一个轻量级的工具，专注于从 Git 提交历史生成 CHANGELOG。
