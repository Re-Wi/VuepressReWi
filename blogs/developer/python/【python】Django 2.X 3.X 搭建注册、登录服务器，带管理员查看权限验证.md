---
title: 【python】Django 2.X 3.X 搭建注册、登录服务器，带管理员查看权限验证
date: 2024-06-19 00:00:00
tags:
  - django
  - web
categories:
  - Python
---

@[TOC](【python】Django 2.X 3.X 搭建注册、登录服务器，带管理员查看权限验证)

# 开始搭建

- 此处使用 Django 2.2，若想使用 Django 3.X 版本仅供参考
  - Django 新建项目，新建 APP，可参看[Django 中文网](https://www.django.cn/) or [https://code.djangoproject.com/](https://code.djangoproject.com/)

1. 数据模型

```python
#AppServer/models.py
#AppServer为自己创建的APP名字
from django.db import models
class User(models.Model):
u_name = models.CharField(max_length=12, blank=True, verbose_name='姓名')
u_phone=models.CharField(max_length=12,unique=True,verbose_name='手机号')
u_password = models.CharField(max_length=78,verbose_name='密码')
u_admin = models.BooleanField(default=False,verbose_name='是否admin')
```

3. 路由

```python
#AppServer/urls.py
#AppServer为自己创建的APP名字
from django.urls import path
from AppServer import views
urlpatterns=[
path(r'users/', views.UsersAPIView.as_view()),
path(r'users/<int:pk>/', views.UserAPIView.as_view(),name='user-detail'),
]
```

4. 视图

```python
#AppServer/views.py
#AppServer为自己创建的APP名字
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from AppServer.user.serializers import UserSerializer
from AppServer.models import User
from AppServer.user.auth import LoginAuthentication,LoginPermissions
from AppServer.user.permissions import  IsAdminUser

SUPER_USERS=('怿窗','root','admin')  #当用户名为里面之一时，自动设置为超级用户(admin)
HTTP_ACTION_LOGIN="login"
HTTP_ACTION_REGISTER="register"

class UsersAPIView(ListCreateAPIView):
    # 序列化类
    serializer_class = UserSerializer
    # 查询集和结果集
    queryset = User.objects.all()
    # 添加地址前需要进行用户认证
    authentication_classes = (LoginAuthentication,)
    # 权限控制
    permission_classes = (IsAdminUser,)
     # 同一个post做把登录和注册同时完成
    def post(self, request, *args, **kwargs):
        action=request.query_params.get('action')
        # 若参数为register则为注册，创建用户
        if action==HTTP_ACTION_REGISTER:
            return self.create(request, *args, **kwargs)
        elif action==HTTP_ACTION_LOGIN:
            # 验证手机号密码
            u_phone=request.data.get('u_phone')
            u_password=request.data.get('u_password')
            # print(u_phone,u_password)
            try:
                user=User.objects.get(u_phone=u_phone)  # 数据库验证用户
                # 用户名存在验证密码
                if user.u_password==u_password:  #明文密码，可自行百度django自带的加密方法
                    # 生成令牌,传入客户端和放入服务器缓存或者数据库
                    token=uuid.uuid4().hex
                    # 把token放入缓存,注意Redis在settings中的配置
                    cache.set(token,user.id)
                    #`使用缓存表，需要按照官网的的配置在Settings.py设置`
                    # 并传入客户端
                    data={
                        'msg':'login success',
                        'user_id': user.id,
                        'status':200,
                        'token':token
                    }
                    return Response(data)
                else:
                    raise exceptions.AuthenticationFailed    # 用户密码错误
            except User.DoesNotExist:
                # raise exceptions.NotFound   # 手机号错误
                raise exceptions.AuthenticationFailed  # 用户名错误
        else:
            # raise exceptions.ValidationError   # 验证错误，传入的不是POST请求
            raise exceptions.ParseError  # 既不是登录也不是注册

    # 创建用户
    # 重写的CreateModelMixin中的方法：用于用户的创建
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        data = serializer.data
        u_name=serializer.data.get('u_name')
        # 判断是否是创建的超级用户
        if u_name in SUPER_USERS:
            # print("创建超级用户")
            u_id=data.get('id')
            user=User.objects.get(pk=u_id)  # 拿到对应的用户
            user.u_admin=True    # 设置为超级用户o0
            user.save()
            data.update({'u_admin': True})   # 创建了超级用户，在返回客户端的时候也把对应修改做了
        headers = self.get_success_headers(serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)
```

5. 用户认证

```python
#AppServer/user/auth.py
from django.core.cache import cache
from rest_framework.authentication import BaseAuthentication
from AppServer.models import User
class LoginAuthentication(BaseAuthentication):
    # 验证user及token
    def authenticate(self, request):
        #最好写成注释这样：
         # 判断是否是get请求，其他请求直接可以访问
        # if request.method == 'GET':
        # 从请求地址栏获取token（query_params)
        #t oken = request.META.get("HTTP_AUTHORIZATION")
         #u_id = cache.get(token)
         #user = User.objects.get(pk=u_id)
         # return user, token
        try:
            token = request.META.get("HTTP_AUTHORIZATION")
            # print(token)
            # token = request.query_params.get('token')
            u_id = cache.get(token)
            user = User.objects.get(pk=u_id)
            return user, token
        except:  # 若验证没成功返回None
            return
```

6. 权限控制

```python
#AppServer/user/permissions
from rest_framework.permissions import BasePermission
from AppServer.models import User
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        if request.method=="GET":
            if isinstance(request.user,User):
                return request.user.u_admin
            return False
        return True
class LoginPermissions(BasePermission):
    def has_permission(self, request, view):
        # 验证用户是否在用户列表里
        if isinstance(request.user, User):
            return True
        return False
```

# 使用 REST framework 序列化数据返回

    * 相关说明，可参看[Django REST framework 中文教程](https://www.w3cschool.cn/lxraw/)

1. 序列化数据

```python
#AppServer/user/serializers.py
from rest_framework import serializers
from AppServer.models import User
# 用户表序列化
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=User
        fields=('url','id','u_name','u_phone','u_password','u_admin')
```

- 增加获取、更新单个用户数据的视图(直接加在文件后面)
  #AppServer/views.py
  #AppServer 为自己创建的 APP 名字

# 单个用户，可用于展示、更新

```python
class UserAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # 添加地址前需要进行用户认证
    authentication_classes = (LoginAuthentication,)
    # 权限控制
    permission_classes = (LoginPermissions,)
    # 验证登录后只能获取当前用户的数据
    # 判定用户数据只能是用户登录的用户数据，不能获取其他用户的用户数据
    # RetrieveAPIView->get->retrieve
    def retrieve(self, request, *args, **kwargs):
        # instance = self.get_object()
        # # 进行了数据库查询操作
        # if instance.id != request.user.id:
        #     raise exceptions.AuthenticationFailed   # 当前已登录用户的id和要获取值id不一致
        # serializer = self.get_serializer(instance)
        # return Response(serializer.data)
        # 在路径中拿到id值
        if request.user.u_admin:
            pass
        elif kwargs.get('pk') != request.user.id:   # 也可在中间件中进行验证
            raise exceptions.AuthenticationFailed   # 当前已登录用户的id和要获取值id不一致
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    def patch(self, request, *args, **kwargs):
        if request.user.u_admin:
            pass
        elif kwargs.get('pk') != request.user.id:  # 也可在中间件中进行验证
            raise exceptions.AuthenticationFailed  # 当前已登录用户的id和要获取值id不一致
        return self.partial_update(request, *args, **kwargs)
```

# 数据迁移，自动创建数据库

- 在控制台输入：
  - 生成迁移文件：python manage.py makemigrations
  - 将迁移文入库中：python manage.py migrate
  - 创建缓存表：python manage.py createcachetable my_cache_table
  - 创建缓存表：注意在 settings.py 中要有配置
  - 运行：python manage.py runserver
  - ![在这里插入图片描述](https://img-blog.csdnimg.cn/8c09c5a6563f4454b6ef22790bbc56a2.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70)

# 使用 postman 软件测试

1. 注册

- ![在这里插入图片描述](https://img-blog.csdnimg.cn/eda7facea6d140f09b443698752cbbe7.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70)

2. 登录

- ![在这里插入图片描述](https://img-blog.csdnimg.cn/83b266e6620446a18f39236cd339d5ef.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70)

3. 查看个人数据

- 将复制的 token 加入请求头
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/de8a2df0a9374a2fbf7918595fe5f6ae.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70)

- 回车，获取到数据
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/43707739ba014e99934adc25947c1de0.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlam9pY2V3aW5kb3c=,size_16,color_FFFFFF,t_70)

4. 另外个 URL，自行验证

- GET：~/appserver/users/
  - 在数据库将 u_admin 改为 1，再试试
- patch：~/appserver/users/7/
- GET：~/appserver/users/2/
  - 得先注册个 id 为 2 的用户，用其他 id 用户的 token 去访问
  - 将当前 token 的用户，在数据库将 u_admin 改为 1，再试试

# 自己写 python 测试程序

- 参见下一篇：[【python】使用 requests 进行 HTTP 的请求](https://blog.csdn.net/rejoicewindow/article/details/119791157)
