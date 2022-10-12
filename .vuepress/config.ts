import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: '学习&交流-怿窗的博客',
  description: '怿窗の博客',
  head: [// 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/icons/favicon.ico' }],// 增加一个自定义的 favicon(网页标签的图标)
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "RejoiceWindow" }],
    ['meta', { name: 'keywords', content: '怿窗,rejoicewindow,vuepress,全栈,ReWi,前端,后端,编程' }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `/icons/favicon16.ico`,
    },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/icons/favicon32.ico`,
      },
    ],
    // Web App Manifests
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...其他标签
    // ['script', { src: "/assets/js/jquery.js" }, ``],
    // ['script', { src: "/assets/js/jq3.5.1.js" }, ``],

    //百度统计
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?d8079816f37f676c0158bc7b5a8500f7";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`]
  ],
  // site-level locales config
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/en/': {
      lang: 'en-US',
      title: "RejoiceWindow's Bolg",
      description: 'Vue-powered Static Site Generator',
    },
    '/': {
      lang: 'zh-CN',
      title: '怿窗◕‿◕博客',
    },
  },
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/favicon.ico',
    author: 'ReWi',
    docsRepo: 'https://github.com/Re-Wi/VuepressReWi.git',
    docsBranch: 'main',
    docsDir: 'docs',
    lastUpdatedText: '',
    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Select Language',
        selectLanguageAriaLabel: 'Select Language',
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },
      /**
      * Chinese locale config
      */
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // sidebar
        // sidebar: sidebar.zh,
        navbar: [
          {
            text: '首页',
            link: '/',
          },
        ],
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleSidebar: '切换侧边栏',
      },
    },
    // series 为原 sidebar
    series: {
      '/docs/theme-reco/': [
        {
          text: 'module one',
          children: ['home', 'theme']
        },
        {
          text: 'module two',
          children: ['api', 'plugin']
        }
      ]
    },
    navbar:
      [
        { text: 'Home', link: '/' },
        { text: 'Categories', link: '/categories/reco/1/' },
        { text: 'Tags', link: '/tags/tag1/1/' },
        {
          text: 'Docs',
          children: [
            { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
            { text: 'vuepress-theme-reco', link: '/blogs/other/guide' }
          ]
        },
      ],
    bulletin: {
      body: [
        {
          type: 'text',
          content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'title',
          content: 'QQ 群',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li>QQ群1：1037296104</li>
            <li>QQ群2：1061561395</li>
            <li>QQ群3：962687802</li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'title',
          content: 'GitHub',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'buttongroup',
          children: [
            {
              text: '打赏',
              link: '/docs/others/donate.html'
            }
          ]
        }
      ],
    },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  }),
  // debug: true,
})
