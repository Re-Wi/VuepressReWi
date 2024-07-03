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
      // 自动设置分类
      autoSetBlogCategories: true,
      // 自动将分类和标签添加至头部导航条
      autoAddCategoryToNavbar: {
        location: 1, // 默认 0
        categoryText: '分类', // 默认 categories
        tagText: '标签' // 默认 tags
      },
      // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
      // autoAddCategoryToNavbar: true,
      // 自动设置系列
      autoSetSeries: true,
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
      // 自动设置分类
      autoSetBlogCategories: true,
      // 自动将分类和标签添加至头部导航条
      autoAddCategoryToNavbar: {
        location: 1, // 默认 0
        categoryText: 'categories', // 默认 categories
        tagText: 'tags' // 默认 tags
      },
      // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
      // autoAddCategoryToNavbar: true,
      // 自动设置系列
      autoSetSeries: true,
    }
  },
  style: "@vuepress-reco/style-default",
  // 自定义主题的基础色
  primaryColor: '#0C9CFF',
  logo: '/logo.png',
  author: 'ReWi',
  authorAvatar: "/head.png",
  docsRepo: 'https://github.com/Re-Wi/VuepressReWi',
  docsBranch: 'master',
  docsDir: '.',
  lastUpdatedText: '',
  // 友情链接
  friendshipLinks: [
    {
      title: 'vuepress-recovuepress-recovuepress-recovuepress-reco',
      logo: 'https://avatars.githubusercontent.com/u/54167020?s=200&v=4',
      link: 'https://github.com/vuepress-reco'
    }
  ],
  // 主题默认将 /.vuepress/vue-previews 下面的 .vue 组件进行了全局注册，所以需要预览的组件请放在此目录下，注意：文件名不允许有 - _。
  // 如果我们文档项目存放在工程的子目录，比如 /docs 文件夹下，我们需要设置 themeConfig.vuePreviewsDir 为 ./docs/.vuepress/vue-previews。
  // vuePreviewsDir: './.vuepress/vue-previews',
  // 主题默认将 /.vuepress/components 下面的 .vue 组件进行了全局注册。
  // 如果我们文档项目存放在工程的子目录，比如 /docs 文件夹下，我们需要设置 themeConfig.componentsDir 为 ./docs/.vuepress/components。
  // componentsDir: './.vuepress/components',
  // 注意，2.0.0-rc.5 之后的版本取消了 vue-previews 文件夹的能力，所有组件都可以放在文件夹 components 中声明。
  // 主题默认将 /.vuepress/components 下面的 .vue 组件进行了全局注册，所以需要预览的组件请放在此目录下，注意：文件名不允许有 - _。
  // 如果我们文档项目存放在工程的子目录，比如 /docs 文件夹下，我们需要设置 themeConfig.docsDir 为 ./docs。
  commentConfig: {
    type: 'valie',
    // options 与 1.x 的 valineConfig 配置一致
    options: {
      appId: 'lTSAqBoVg8hNGANdpbSH6R9x-gzGzoHsz',
      appKey: 'kJdmnzXDCMVg1xhIEYlBMFrD',
      placeholder: '填写邮箱可以收到回复提醒哦！',
      verify: true, // 验证码服务
      notify: true,
      recordIP: true,
      hideComments: true // 全局隐藏评论，默认 false
      // 如果仅是某篇文章不想设置开启评论功能，可以在 front-matter 设置 hideComments: true。
    },
  },
}