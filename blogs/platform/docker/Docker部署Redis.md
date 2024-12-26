---
title: Docker部署Redis
date: 2024/11/30 09:24:00
tags:
  - 项目部署
categories:
  - MySql
  - docker
---

# 目录

[[toc]]

在 Docker 中安装并运行 Redis 非常简单。你可以通过 Docker 来拉取 Redis 官方镜像，并启动一个 Redis 容器。下面是具体步骤：

### 1. 拉取 Redis 镜像

首先，确保你的系统已安装 Docker。然后，运行以下命令来拉取 Redis 官方镜像：

```bash
sudo docker pull redis
```

这将从 Docker Hub 拉取最新版本的 Redis 镜像。如果你需要特定版本的 Redis，可以通过指定版本来拉取。例如：

```bash
docker pull redis:6.2
```

### 2. 启动 Redis 容器

拉取 Redis 镜像后，使用以下命令启动一个 Redis 容器：

```bash
docker run --name redis -d -p 6379:6379 redis
```

这行命令的解释：

- `--name redis`：为容器指定名称为 `redis`。
- `-d`：以后台模式运行容器。
- `-p 6379:6379`：将容器的 6379 端口映射到宿主机的 6379 端口。Redis 默认使用 6379 端口。
- `redis`：使用 `redis` 镜像启动容器。

### 3. 检查 Redis 容器是否运行

运行以下命令查看 Redis 容器的状态：

```bash
docker ps
```

你应该会看到类似如下的输出：

```
CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS       PORTS      NAMES
d3b1f7b7c9b0   redis     "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:6379->6379/tcp   redis
```

这表示 Redis 容器已成功运行。

### 4. 连接到 Redis

你可以通过以下命令进入 Redis 容器，并使用 Redis CLI 进行交互：

```bash
docker exec -it redis redis-cli
```

这将打开 Redis 命令行界面，你可以在其中执行 Redis 命令。例如，检查 Redis 是否正在运行：

```bash
PING
```

如果返回 `PONG`，说明 Redis 正常工作。

### 5. 持久化 Redis 数据（可选）

默认情况下，Redis 在 Docker 容器内的数据是非持久化的，这意味着容器停止后，Redis 数据会丢失。如果你希望 Redis 数据持久化，可以挂载一个宿主机目录到 Redis 容器的 `/data` 目录。

你可以使用如下命令启动 Redis 容器并挂载一个本地目录：

```bash
sudo docker run --restart=always -p 6379:6379 -v /home/www/redis_data:/data --name redis -d redis --requirepass rejoicewindow
```

将 `/path/to/local/data` 替换为你本地的目录路径。这样，Redis 的数据将会保存在你指定的本地目录中，即使容器停止或删除，数据仍然保留。

### 6. 配置 Redis 密码（可选）

为了增加安全性，你可以为 Redis 设置密码。在启动 Redis 容器时，使用 `--requirepass` 参数来设置密码：

```bash
docker run --name redis -d -p 6379:6379 -e REDIS_PASSWORD=mysecretpassword redis
```

这会将 Redis 密码设置为 `mysecretpassword`。你可以通过以下命令在 Redis CLI 中验证：

```bash
docker exec -it redis redis-cli -a mysecretpassword
```

### 7. 停止和删除 Redis 容器

当你不再需要 Redis 容器时，可以停止并删除它：

- 停止容器：

```bash
docker stop redis
```

- 删除容器：

```bash
docker rm redis
```

### 总结

1. 拉取 Redis 镜像：`docker pull redis`
2. 启动 Redis 容器：`docker run --name redis -d -p 6379:6379 redis`
3. 进入 Redis CLI：`docker exec -it redis redis-cli`
4. 可选：设置持久化数据和密码。

通过这些步骤，你可以轻松在 Docker 中运行 Redis，并根据需要进行配置。如果你有任何问题或需要更多帮助，随时告诉我！