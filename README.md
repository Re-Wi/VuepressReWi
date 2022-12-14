---
home: true
modules:
  - Banner
  - BannerBrand
  - MdContent
  - Footer
banner: # banner 模块的配置
  heroText: 学习并快乐着
  tagline: Enjoy when you can, and endure when you must.
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: 200px
    margin: 0 auto 2rem
  bgImage: /img/hero.png
  bgImageStyle:
    height: 450px
bannerBrand:
  heroImage: /logo.png
  heroImageStyle:
    maxWidth: '200px'
    width: '100%'
    display: block
    margin: '0 auto 2rem'
    borderRadius: '1rem'
  bgImage: '/bg.svg'
  heroText: vuepress-reco
  tagline: 一款 vuepress 主题容器，集成多种主题底层功能，快速生成主题风格。主题 2.0 的默认风格是原主题 1.0 迁移而来，更多风格正在路上，敬请期待。
  buttons:
    - { text: Guide, link: '/docs/guide/introduce' }
    - { text: Default Style, link: '/docs/style-default-api/introduce', type: 'plain' }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
features:
- title: 过去
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题。
- title: 当下
  details: 帮助更多的朋友节省时间去用心书写内容，而不是仅仅配置一个博客去孤芳自赏。
- title: 未来
  details: 吸引更多的朋友参与到开发中来，继续强大功能。
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

# ReWi 怿窗の博客

## 把项目从gitee上克隆下来

git clone git@github.com:Re-Wi/VuepressReWi.git

## 进入项目目录

cd VuepressReWi

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

<https://haveyuan.github.io/>

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
