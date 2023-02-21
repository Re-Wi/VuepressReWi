export const navbar = [
  { text: '主页', link: '/' },
  { text: '分类', link: '/categories/category1/1/' },
  { text: '标签', link: '/tags/tag1/1/' },
  {
    text: '文档',
    children: [
      { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
      { text: 'MasterReWi', link: '/docs/MasterReWi' },
      { text: 'ECOReWi', link: '/docs/ECOReWi/' },
      { text: 'TimeAiderReWi', link: '/docs/TimeAiderReWi/' }
    ]
  },
  {
    text: '博客',
    children: [
      { text: '开发者', link: '/blogs/developer/' },
      { text: '关于我', link: '/blogs/person/' },
      { text: '打赏', link: '/blogs/person/donate' }
    ]
  },
  {
    text: '版本',
    icon: 'Versions',
    children: [
      { text: '0.x.x', link: 'https://rewi.cc/' },
    ],
  },
  { text: '留言板', link: '/docs/message-board', icon: 'Message2' },
]
