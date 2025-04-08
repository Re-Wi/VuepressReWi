export const navbar = [
  { text: '主页', link: '/', icon: 'Home', },
  // { text: '分类', link: '/categories/person/1/' },
  // { text: '标签', link: '/tags/person/1/' },
  {
    text: '通讯录',
    icon: 'Chat',
    children: [
      { text: '关于我', link: '/docs/AddressBook/' },
      { text: '打赏', link: '/docs/AddressBook/donate' },
      { text: '赚钱邀请码', link: '/docs/AddressBook/InvitationCode/' },
    ]
  },
  { text: '嵌入式怿窗', link: 'https://em.rewi.xyz', icon: 'Fire' },
  { text: '留言板', link: '/docs/message-board', icon: 'RequestQuote' },
  {
    text: 'Shortcut',
    icon: 'TableShortcut',
    children: [
      { text: '博客', link: '/posts' },
      { text: '时间轴', link: '/timeline' },
      { text: '友情链接', link: '/friendship-link' },
    ]
  },
]
