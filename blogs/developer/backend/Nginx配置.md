---
title: Nginx 配置
date: 2023-02-20 00:00:00
tags:
  - 项目部署
  - Nginx
  - web
categories:
  - backend
---

## 目录

[[toc]]

## 简单配置

- <https://www.cnblogs.com/zhongweiv/p/nginx_conf.html>

```nginx
#user nobody;
worker_processes auto;

error_log /var/log/nginx/error.log;
pid /run/nginx.pid;


events {
  worker_connections 1024;
}


http {
  include   mime.types;
  default_type application/octet-stream;

  sendfile        on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout  65;

  #nginx默认server，测试使用，不需要时可以删除
  server {
    listen  80;
    server_name localhost;

    location / {
      default_type text/html;
      return 200 'This is nginx!';
    }

    error_page 404 /404.html;
    location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
  }
}
```

## 配置多个 conf 文件

- <https://blog.csdn.net/M_Jin/article/details/105003921>
- <https://www.cnblogs.com/zhongweiv/p/nginx_conf.html>

我的`nginx.conf`路径：/etc/nginx/nginx.conf
在 /etc/nginx/下创建 conf.d/，用来存 自定义 conf 文件

在 nginx.conf 加入神秘代码

```nginx
# 配置允许运行nginx服务器的用户和用户组
#user  nobody;
#user  www www;
## 配置允许nginx进程生成的worker process数量，一般与CPU核数相等
worker_processes  2;

## worker进程最大打开文件数，解决"too many open files"问题
#worker_rlimit_nofile 100000

## 运行错误日志存放路径
error_log  /home/admin/logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

## pid文件存放路径和名称
# pid       logs/nginx.pid;

events {
    use epoll;#指定nginx工作模式，nginx主要的工作模式有select、poll、kqueue、epoll
    # 其中select、poll是标准工作模式，kqueue、epoll为高效工作模式，epoll用在Linux系统中，而kqueue用在BSD系统中
    worker_connections  2048;#指定单进程的最大连接数
    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535
}


## http配置
http {
    #设定mime类型,类型由mime.type文件定义
    # include    mime.types;
    default_type  application/octet-stream;

    ## 日志打印格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    ## 访问日志存放路径
    access_log  /home/admin/logs/access.log  main;

    ## 加快文件读写效率
    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    #对于普通应用，必须设为 on,
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    tcp_nopush    on;  # tcp_nopush，tcp_nodelay设置on,防止网络阻塞

    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;

    #开启gzip压缩，超过1024Kb才压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";
    gzip_min_length  1024; #设置允许压缩的页面最小字节数
    gzip_buffers    4  16k; #指定内存空间来存贮压缩结果，这里指定4个单位为16k的内存来存储压缩结果，即总大小为64k
    # gzip_http_version  1.1;#指定识别HTTP协议版本，默认是1.1
    gzip_comp_level  2;#指定gzip压缩比，1 压缩比最小，处理速度最快；9 压缩比最大，传输速度快，但处理最慢，也比较消耗CPU资源
    gzip_types  text/plain application/x-javascript text/css application/xml;#指定压缩的类型，无论是否指定，“text/html”类型总是会被压缩
    gzip_vary  on;#该选项开启可以让前端的缓存服务器缓存经过gzip压缩的页面，例如，用Varnish缓存经过Nginx压缩的数据

   #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;

    # http_proxy 设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    proxy_temp_file_write_size  64k;
    # proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;

    server_tokens off;#隐藏Nginx版本号

    server {
        listen       8000;
        server_name  localhost;
        location / {
            root /mnt;
        }
    }

    # 很重要的虚拟主机配置
    server {
        listen       80;
        server_name  www.rewi.cc;

        charset utf-8;

        root   /home/admin/www;

        #access_log  logs/host.access.log  main;

        #对 / 所有做负载均衡+反向代理
        location / {
            root   html;
            index  index.jsp index.html index.htm;
            # proxy_pass        http://backend;
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        }

        #静态文件，nginx自己处理，不去backend请求tomcat
        location  ~* /download/ {
            root /home/admin/resource;
        }

        location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$
        {
            root /home/admin/static;
            expires      7d;
        }

        location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            deny all;
        }


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
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
        location ~ /\.ht {
            deny  all;
        }
        location ~ ^/(WEB-INF)/ {
            deny all;
        }
    }
     ## 其它虚拟主机，server 指令开始
    ## 在这里导入子配置文件！！！
    include /home/admin/conf/*_nginx.conf;
}

```

## Nginx 命令

- <https://www.nginx.org.cn/article/detail/476/>

```shell
nginx -s quit #优雅地停止Nginx服务（即处理完所有请求后再停止服务）
nginx -s reload #重新加载Nginx配置文件
#强制停止Nginx服务
nginx -s stop
nginx -s reopen #重启
#检测配置文件是否有语法错误，然后退出
nginx -tc XXX.conf
#设置配置文件(默认是:/etc/nginx/nginx.conf)
nginx -c XXX.conf
```

## Vue 项目 配置

- <https://blog.csdn.net/weixin_43314519/article/details/115151858>

```nginx
upstream XXX_backend {
  #ip_hash;
  server   localhost:XXXX max_fails=2 fail_timeout=30s ;
}

server {
    # 需要被监听的端口号，前提是此端口号没有被占用，否则在重启 Nginx 时会报错
    listen       8888;
    # 服务名称，无所谓
    server_name  localhost;

    # 上述端口指向的根目录
    root /opt/asing1elife/teamnote;
    # 项目根目录中指向项目首页
    index index.html;

    client_max_body_size 20m;
    client_body_buffer_size 128k;

    # 根请求会指向的页面
    location / {
      # 此处的 @router 实际上是引用下面的转发，否则在 Vue 路由刷新时可能会抛出 404
      try_files $uri $uri/ @router;
      # 请求指向的首页
      index index.html;
    }

    # 由于路由的资源不一定是真实的路径，无法找到具体文件
    # 所以需要将请求重写到 index.html 中，然后交给真正的 Vue 路由处理请求资源
    location @router {
      rewrite ^.*$ /index.html last;
    }

    # 关键步骤，这里表示将所有的 http://192.168.7.8:8888/teamnote/api/ 开头的请求都转发到下面 proxy_pass 指定的链接中
    # 这里使用 /teamnote/api/ 而不是 /teamnote/ ，是因为前端项目本身的访问链接就是 http:192.168.7.8:8888/teamnote/
    # 为了防止在访问页面时请求就被 Nginx 代理转发，这里需要更具体的配置，才能和前端访问请求区分开
    location /teamnote/api/ {
          # 后端的真实接口
          proxy_pass http://192.168.7.8:2592/teamnote/api/;
          proxy_redirect off;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header   Cookie $http_cookie;
          # for Ajax
          #fastcgi_param HTTP_X_REQUESTED_WITH $http_x_requested_with;
          proxy_set_header HTTP-X-REQUESTED-WITH $http_x_requested_with;
          proxy_set_header HTTP_X_REQUESTED_WITH $http_x_requested_with;
          proxy_set_header x-requested-with $http_x_requested_with;
          client_max_body_size 10m;
          client_body_buffer_size 128k;
          proxy_connect_timeout 90;
          proxy_send_timeout 90;
          proxy_read_timeout 90;
          proxy_buffer_size 128k;
          proxy_buffers 32 32k;
          proxy_busy_buffers_size 128k;
          proxy_temp_file_write_size 128k;
    }
}

```
