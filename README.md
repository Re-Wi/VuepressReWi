---
home: true
modules: # 指定首页展示模块
  - Banner
  - BannerBrand
  - Blog
  - MdContent
  - Footer
banner: # banner 模块的配置
  heroText: 学习并快乐着
  tagline: Enjoy when you can, and endure when you must.
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: 200px
    width: 100%
    display: block
    margin: 0 auto 2rem
    borderRadius: 1rem
  bgImage: /bg.svg
  bgImageStyle:
    height: 450px
bannerBrand: # bannerBrand 模块的配置
  title: VuepressReWi
  description: 一款简洁的 vuepress 博客 & 文档 主题。
  tagline: RejoiceWindow 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
  buttons:
    - { text: 主页, link: '/' }
    - { text: 英文, link: '/en/', type: 'plain' }
    - { text: 打赏, link: '/blogs/person/donate' }
  socialLinks: # 社交地址
    - { icon: 'BrandGithub', link: 'https://github.com/Re-Wi' }
blog: # blog 模块的配置
  socialLinks: # 社交地址
    - { icon: 'LogoGithub', link: 'https://github.com/Re-Wi' }
    - { icon: 'LogoGitee', link: 'https://gitee.com/re-wi' }
footer: # 底部模块的配置
  record: 域名备案文案
  recordLink: https://rewi.cc/
  cyberSecurityRecord: 公安备案文案
  cyberSecurityLink: 公安备案地址
  startYear: 2018
---

## 快速开始

**npx**

```bash
# 初始化，并选择 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# 初始化，并选择 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# 初始化，并选择 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```

## 手动安装

```bash
npm install vuepress@next vuepress-theme-reco@next --save-dev

# or
yarn add vuepress@next vuepress-theme-reco@next
```

## **_ReWi 怿窗の博客_**

## 把项目从github上克隆下来

```shell
git clone git@github.com:Re-Wi/VuepressReWi.git
```

## 进入项目目录

```shell
cd VuepressReWi
```

## 安装依赖

```shell
yarn  
# or
npm install
# or
cnpm install
```

## 启动项目

```shell
yarn dev 
# or
npm run dev
# or
cnpm run dev
```

## 其他

## 生成静态文件

```shell
yarn build 
# or
npm run build
# or
cnpm run build
```

## 运行发布命令:右键，Git Bush Here

```shell
yarn deploy 
# or
npm run deploy
# or
cnpm run deploy
```

## 提交代码

```shell
yarn push 
# or
npm run push
# or
cnpm run push
```
