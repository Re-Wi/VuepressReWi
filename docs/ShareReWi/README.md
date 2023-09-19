---
lang: zh-CN
title: 分享清单
description: 分享后的内容链接合集
date: 2023/09/12 17:00:00
hideComments: false
---
## 符号说明
- ❎ 无
- ✅ 有
- ▶️ 链接
- ℹ️ 提示

<style>
  table {
  border-collapse: collapse; /* 合并边框，确保边框线相连 */
  width: 100%; /* 设置表格宽度为100% */
  }
  th, td {
  border: 2px solid #ddd; /* 设置表头单元格和数据单元格的边框宽度和颜色 */
  padding: 8px; /* 设置内边距，增加内容与边框之间的距离 */
  text-align: left;
  /* position: relative; /* 使提示框相对于单元格定位 */
  }
  th {
  background-color: #f2f2f2; /* 设置表头背景颜色 */
  /*color: white;*/
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  /* 创建气泡提示 */
  td::before {
  content: attr(data-tooltip); /* 使用data-tooltip属性的值作为提示文本 */
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  /* bottom: 100%; /* 将提示框定位在单元格上方 */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  }
  td:hover::before {
  opacity: 1; /* 鼠标悬停时显示提示 */
  }
</style>

<!-- 相对路径 -->
## [视频平台](./视频平台.md)
<style>
  .video-Bilibili {
    background-color: #ff73b3;
    color: white;
  }
  .video-Wechat {
    background-color: #41d773;
    color: white;
  }
  .video-Douyin {
    background-color: #333333;
    color: white;
  }
  .video-Alipay {
    background-color: #0076e1;
    color: white;
  }
  .video-Taobao {
    background-color: #ff8c00;
    color: white;
  }
</style>
## [图文平台](./图文平台.md)
<style>
  .article-CSDN {
    background-color: #ff7300;
    color: #333;
  }
  .article-Wechat {
    background-color: #41d773;
    color: #333;
  }
  .article-Jianshu {
    background-color: #ff4500;
    color: #333;
  }
  .article-Xiaohongshu {
    background-color: #ff0000;
    color: #333;
  }
  .article-Bilibili {
    background-color: #ff73b3;
    color: #333;
  }
</style>
## [未发布](./unpublished.md)
<style>
 .hardware {
    background-color: #803d1e;
    color: #ffffff; /*使用十六进制颜色代码*/
  }
  .software {
    background-color: #87cefa;
    color: white; /*使用十六进制颜色代码*/
  }
  .other {
    background-color: #66ffe6;
    color: white;
  }
  .article {
    background-color: #ffd700;
    color: white;
  }
  .video {
    background-color: #dc143c;
    color: white;
  }
  .remark {
    background-color: #b7b49b;
    color: white;
  }
</style>

<hr style="background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); height: 6px;border:1px solid blue;" >

- 文末可以评论