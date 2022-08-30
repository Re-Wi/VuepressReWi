import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
export default defineUserConfig({
  base: '/', // 这是部署到github相关的配置
  title: '学习&交流-怿窗的博客',
  description: '怿窗の博客',
  // port: '8080',
  head: [// 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/icons/favicon.ico' }],// 增加一个自定义的 favicon(网页标签的图标)
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "RejoiceWindow" }],
    ['meta', { name: 'keywords', content: '怿窗,rejoicewindow,vuepress,全栈' }],
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
  theme: defaultTheme({
    // 默认主题配置
    logo: '/favicon.ico',
    repo: 'RejoiceWindow/vuepress-rewi',
    docsDir: 'docs',
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
  }),
  plugins: [
    // 本地插件
    // [path.resolve(__dirname, './plugins/vuepress-plugin-bulletin-popover/index.js')],
    // require('./another-plugin'),   
    backToTopPlugin(),
    pwaPlugin({
      // 配置项
      // 在新的 Service Worker 就绪之后立即激活它
      skipWaiting: true,
    }),
    pwaPopupPlugin({
      // 配置项
      // 没有指定该配置项，它会降级使用默认信息。
      locales: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
        '/zh/': {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    }),
  ],
})