export const bulletin = {
  title: '公告',
  body: [
    {
      type: 'text',
      content: `加入QQ群blblblblblbblblblbla`,
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
      <li>1057492554 (计算机技术小白交流区)</li>
      </ul>
      `,
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
      <li><a href="https://github.com/Re-Wi/VuepressReWi/issues">Issues<a/></li>
      <li><a href="https://github.com/Re-Wi/VuepressReWi/wiki">Wiki<a/></li>
      </ul>
      `,
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
          link: '/docs/AddressBook/donate'
        },
        {
          text: '关于我',
          link: '/docs/AddressBook/'
        }
      ]
    }
  ],
}