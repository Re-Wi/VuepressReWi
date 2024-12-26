---
title: 加密
date: 2023-09-11 11:54:33
---

## 获取密文

如果你的密码明文是 `123456`，需要将其转化为密文，也就是 `e10adc3949ba59abbe56e057f20f883e`，使用密文去设置密码。

网站发布后，在密码输入框输入 `123456` 即可进入网站，他人也无法通过代码中的密文知道你的密码，但是你一定要记住自己的密码明文。

请在下面的输入框输入密码明文，以获取相应的密文：

<md5 />

## 设置加密

### 加密整个网站

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // 设置单个密码
    password: '14e1b600b1fd579f47433b88e8d85291',
    // 设置多个密码
    password: [
      '14e1b600b1fd579f47433b88e8d85291',
      'f8de1968939dd4ac5992ce962993ac2b'
    ]
  })
})
```

### 加密单个页面

```md
---
title: xxx
# 设置单个密码
password: 14e1b600b1fd579f47433b88e8d85291
# 设置多个密码
password: 
 - 14e1b600b1fd579f47433b88e8d85291
 - f8de1968939dd4ac5992ce962993ac2b
---
```
