---
title: Django项目操作
date: 2024-11-25 19:09:00
tags:
  - django
  - web
categories:
  - Python
---

# 导出依赖文件

打开命令提示符，在某条路径下输入

```shell script
pip freeze > ./requirements.txt
```

# 开发环境安装

***- Windows and Linux -***

```shell
# python -m pip install Django
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

## Creating a project

```shell
# django-admin startproject mysite MasterReWi
django-admin startproject MasterReWi
# python manage.py runserver
# python manage.py runserver 8080
python manage.py runserver 0.0.0.0:8000
```

> http://localhost:8000/

## Creating the Polls app

```shell
python manage.py startapp polls
```

## Database setup

```shell
# python manage.py makemigrations polls
# python manage.py sqlmigrate polls 0001
python manage.py makemigrations
python manage.py migrate
```

## Creating an admin user

```shell
# python manage.py createsuperuser --username admin --email admin@example.com

python manage.py createsuperuser

# Username: admin
# Email address: admin@example.com
# Password: **********
# Password (again): *********
# Superuser created successfully.

python manage.py runserver
```

> http://127.0.0.1:8000/admin/

# FAQ
## 如果关闭debug模式后，请执行以下命令将simpleui静态文件静态文件克隆到根目录
```shell
python manage.py collectstatic
```