---
title: vuepress部署优化
date: 2023-03-26 00:00:00
tags:
  - vuepress
  - 部署优化
  - web
categories:
  - vue
---

## Gzip 压缩

- <https://www.cnblogs.com/yayujs/p/16043639.html>

> 开启 Gzip 压缩将会极大的提高网站加载速度，如果服务器用的是按流量付费，就更是必须要做的内容。
> 如果使用的是 Nginx，由于 Nginx 内置 Gzip 压缩模块，可以直接开启：
> 关于 Gzip 压缩更多内容可以参考 [《VuePress 博客优化之开启 Gzip 压缩》](https://github.com/mqyqingfeng/Blog/issues/248)

```nginx
server {
  # 这里是新增的 gzip 配置
  gzip on;
  gzip_min_length 1k;
  gzip_comp_level 6;
  gzip_types application/atom+xml application/geo+json application/javascript application/x-javascript application/json application/ld+json application/manifest+json application/rdf+xml application/rss+xml application/xhtml+xml application/xml font/eot font/otf font/ttf image/svg+xml text/css text/javascript text/plain text/xml;
}
```
