export const commentConfig = {
  type: 'valine',
  options: {
    appId: 'lTSAqBoVg8hNGANdpbSH6R9x-gzGzoHsz',
    appKey: 'kJdmnzXDCMVg1xhIEYlBMFrD',
    placeholder: 'Fill in the email can receive a reply reminder!',
    verify: true, // 验证码服务
    // notify: true,
    recordIP: true,
    hideComments: true, // 全局隐藏评论，默认 false
    // 如果仅是某篇文章不想设置开启评论功能，可以在 front-matter 设置 hideComments: true。
  },
}
