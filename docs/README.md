---
title: 分享清单
date: 2023-09-11 11:56:33
# 设置单个密码
# password: 5cde5596ace9b1e212ab3ace1f083815
# 设置多个密码
password: 
 - 5cde5596ace9b1e212ab3ace1f083815
 - a5db2fd9def8a592756d4ca2b5301c20
---
<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #007BFF;
    /*color: white;*/
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .article {
    background-color: #FFC107;
    color: #333;
  }

  .video {
    background-color: #DC3545;
    color: white;
  }
  
 .handle {
    background-color: #28A745;
    color: white;
  }

</style>
<script>
  // 随机生成十六进制颜色值
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // 为每行添加随机颜色
  window.onload = function() {
    var rows = document.querySelectorAll("tbody tr");
    rows.forEach(function(row) {
      row.style.backgroundColor = getRandomColor();
    });
  }
</script>
<table>
  <thead>
    <tr>
      <th rowspan="2">NAME</th>
      <th colspan="3" class="handle">处理情况</th>
      <th colspan="2" class="article">图文平台</th>
      <th colspan="2" class="video">视频平台</th>
    </tr>
    <tr>
      <th class="handle">硬件</th>
      <th class="handle">软件</th>
      <th class="handle">其他</th>
      <th class="article">CSDN</th>
      <th class="article">公众号</th>
      <th class="video">腾讯</th>
      <th class="video">字节跳动</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>[CSDN-John](link)</td>
      <td>[公众号-John](link)</td>
      <td>[腾讯-John](link)</td>
      <td>[字节跳动-John](link)</td>
      <td>[字节跳动-John](link)</td>
      <td>[字节跳动-John](link)</td>
      <td>[字节跳动-John](link)</td>
    </tr>
    <tr>
      <td>Alice</td>
      <td>[CSDN-Alice](link)</td>
      <td>[公众号-Alice](link)</td>
      <td>[腾讯-Alice](link)</td>
      <td>[字节跳动-Alice](link)</td>
      <td>[字节跳动-John](link)</td>
      <td>[字节跳动-John](link)</td>
      <td>[字节跳动-John](link)</td>
    </tr>
  </tbody>
</table>
