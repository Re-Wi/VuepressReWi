import { themeConfig } from './config/index'
import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

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
    // Google AdSense广告位
    ['script', {
      async: true,
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6203557052821716",
      crossorigin: "anonymous"
    },],
    //百度统计
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?f9b376d5f830970f61cde16b210841d5";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  // site-level locales config
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/en/': {
      lang: 'en-US',
      title: "RejoiceWindow's Bolg",
      description: 'Documents are shared with blogs',
    },
    '/': {
      lang: 'zh-CN',
      title: '怿窗◕‿◕博客',
      description: '文档与博客分享',
    },
  },
  theme: recoTheme(themeConfig),
  bundler: viteBundler(),
  // bundler: webpackBundler({
  //   postcss: {},
  //   vue: {},
  // }),
  // debug: true,
})
