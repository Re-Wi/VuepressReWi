export const navbar = [
  { text: '主页', link: '/', icon: 'Home', },
  // { text: '分类', link: '/categories/person/1/' },
  // { text: '标签', link: '/tags/person/1/' },
  {
    text: '文档',
    icon: 'DocumentAttachment',
    children: [
      { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
      { text: 'MasterReWi', link: '/docs/MasterReWi' },
      { text: 'ECOReWi', link: '/docs/ECOReWi/' },
      { text: 'TimeAiderReWi', link: '/docs/TimeAiderReWi/' },
      { text: 'ShareReWi', link: '/docs/ShareReWi/' }
    ]
  },
  {
    text: '博客',
    icon: 'Blog',
    children: [
      { text: '开发者', link: '/blogs/developer/' },
      { text: '关于我', link: '/blogs/person/' },
      { text: '打赏', link: '/blogs/person/donate' }
    ]
  },
  {
    text: '版本',
    icon: 'Version',
    children: [
      { text: '0.x.x', link: 'https://rewi.cc/' },
    ],
  },
  { text: '留言板', link: '/docs/message-board', icon: 'RequestQuote' },
]
