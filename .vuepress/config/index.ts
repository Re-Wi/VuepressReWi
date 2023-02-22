import * as zhConfig from './zh'
import * as enConfig from './en'

export const themeConfig = {
  // theme-level locales config
  locales: {
    /**
      * Chinese locale config
      */
    '/': {
      selectLanguageText: '选择语言',
      selectLanguageName: '简体中文',
      lastUpdatedText: '最后更新时间',
      navbar: zhConfig.navbar,
      // series 为原 sidebar
      series: zhConfig.series,
      commentConfig: zhConfig.commentConfig,
      bulletin: zhConfig.bulletin,
      // page meta
      // editLinkText: '在 GitHub 上编辑此页',
    },
    '/en/': {
      /**
    * English locale config
    *
    * As the default locale of @vuepress/theme-default is English,
    * we don't need to set all of the locale fields
    */
      selectLanguageText: 'Languages',
      selectLanguageName: 'English',
      navbar: enConfig.navbar,
      series: enConfig.series,
      commentConfig: enConfig.commentConfig,
      bulletin: enConfig.bulletin,
      // page meta
      //    editLinkText: 'Edit this page on GitHub',
    }
  },
  style: "@vuepress-reco/style-default",
  logo: '/favicon.ico',
  author: 'ReWi',
  authorAvatar: "/head.png",
  docsRepo: 'https://github.com/Re-Wi/VuepressReWi',
  docsBranch: 'master',
  docsDir: '',
  lastUpdatedText: '',

  autoSetBlogCategories: true,
  // autoAddCategoryToNavbar: true,
  autoSetSeries: true,
  vuePreviewsDir: './.vuepress/vue-previews',
  componentsDir: './.vuepress/components',

  // valineConfig 配置与 1.x 一致
  valineConfig: {
    appId: 'lTSAqBoVg8hNGANdpbSH6R9x-gzGzoHsz',
    appKey: 'kJdmnzXDCMVg1xhIEYlBMFrD',
    placeholder: '填写邮箱可以收到回复提醒哦！',
    verify: true, // 验证码服务
    // notify: true,
    recordIP: true,
    hideComments: true, // 全局隐藏评论，默认 false
    // 如果仅是某篇文章不想设置开启评论功能，可以在 front-matter 设置 hideComments: true。
  },
}