import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    /**
  * 路由切换事件处理
  */
    router.beforeEach((to, from, next) => {
      //   console.log("切换路由", to.fullPath, from.fullPath);
      // 触发百度的pv统计 Vuepress2 不需要手动了,只需要配置那部分，而且触发两次
      next();
    })
    router.afterEach((to) => {
      // console.log('after navigation')
    })
  },
  setup() { },
  rootComponents: [],
})