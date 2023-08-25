export const series = {
  '/blogs/developer/': [{
    text: '开发者',
    icon: 'Language',
    children: ['/blogs/developer/dart/', '/blogs/developer/backend/'],
  }
  ],
  '/blogs/person/': [
    'README.md'
  ],
  '/docs/theme-reco/': [
    {
      text: 'module one',
      children: ['home', 'theme']
    },
    {
      text: 'module two',
      children: ['api', 'plugin']
    }
  ],
  '/docs/guide/': ['introduce', 'getting-started', 'style', 'contribute', 'folder-specification'],
  '/docs/theme/': [
    {
      text: '基础',
      children: ['introduce', 'usage', 'custom-catalog-title']
    },
    {
      text: '高级',
      children: ['home', 'series', 'comments', 'auto-set-category', 'custom-container', 'custom-style', 'code-import', 'bulletin-popover', 'register-components', 'password']
    }
  ],
}
