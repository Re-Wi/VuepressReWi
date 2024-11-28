---
title: Docker部署Nginx
date: 2023/09/20 21:00:00
tags:
  - 项目部署
  - nginx
categories:
  - backend
  - docker
---

## 目录

[[toc]]

## 1. 准备工作

- [x] [有云服务或者虚拟机](/blogs/platform/docker/
- [x] [安装 docker](/blogs/platform/docker/服务器Ubuntu%2022.04%20安装Docker.md)

## 2. 主机创建文件夹，方便对容器配置文件等进行修改

```shell
# 举例，保存在主机的`/home/www/`文件夹下
mkdir -p /home/www/nginx/conf
mkdir -p /home/www/nginx/conf/conf.d
mkdir -p /home/www/nginx/html
mkdir -p /home/www/nginx/log
```

## 3. 创建文件

- 文件可能挂载不成功，先创建一个
- 文件具体内容可看 [附录](#appendix-section)

```shell
nano /home/www/nginx/conf/nginx.conf
## 输入附录的内容，或者随便输入一点，后面修改
## 退出编辑，保存
```

## 3. 创建网络，方便与其他容器互联

- [容器技术（二）：Docker Network 基础](https://zhuanlan.zhihu.com/p/129844795)

```shell
sudo docker network create NginxNet
```

## 5. 创建容器

- 服务器配置文库目录：/etc/nginx/conf.d
- Nginx 配置文件：/etc/nginx/nginx.conf
- 日志文件目录：/var/log/nginx
- 网页目录：/usr/share/nginx/html

```shell
sudo docker run -d --name nginx --network NginxNet -p 6080:6080 -p 6088:6088 -p 8001:8001 -p 8880:8880 -p 8888:8888 -p 3680:3680 -p 3688:3688 -v /home/www/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/www/nginx/conf/conf.d:/etc/nginx/conf.d -v /home/www/nginx/html:/usr/share/nginx/html -v /home/www/nginx/log:/var/log/nginx --restart=always nginx
```

## 4. 验证是否成功

- [ ] [附录](#appendix-section)的文件全部重新加入成功，并重启 nginx
- [ ] 防火墙端口`8080`已开放

```text
打开浏览器
输入: <IP>:8080
即可看见网页返回
```

## <a id="appendix-section"></a> 附录

- 从 nginx 容器中复制的文件
- 更多配置，[请参考](/blogs/developer/backend/Nginx配置.md)

### Nginx 配置

:::: code-group
::: code-group-item 输入

```shell
cat /etc/nginx/nginx.conf
```

:::
::: code-group-item 输出

```conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

:::
::::

### 服务器配置

:::: code-group
::: code-group-item 输入

```shell
cat /etc/nginx/conf.d/default.conf
```

:::
::: code-group-item 输出

```conf
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

:::
::::

### 网页文件

:::: code-group
::: code-group-item 输入

```shell
cat /usr/share/nginx/html/index.html
```

:::
::: code-group-item 输出

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

:::
::::

### 报错文件

:::: code-group
::: code-group-item 输入

```shell
cat /usr/share/nginx/html/50x.html
```

:::
::: code-group-item 输出

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Error</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>An error occurred.</h1>
    <p>
      Sorry, the page you are looking for is currently unavailable.<br />
      Please try again later.
    </p>
    <p>
      If you are the system administrator of this resource then you should check
      the error log for details.
    </p>
    <p><em>Faithfully yours, nginx.</em></p>
  </body>
</html>
```

:::
::::

## 参考

- [How to Use the NGINX Docker Official Image](https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/)
- [Docker 安装 Nginx 容器 (完整详细版)](https://cloud.tencent.com/developer/article/2015581)
- [用 Docker 部署 nginx](https://zhuanlan.zhihu.com/p/609441551)
- [docker --net 详解\_Docker 网络通信](https://blog.csdn.net/weixin_34608222/article/details/113537311)
