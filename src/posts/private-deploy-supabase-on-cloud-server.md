---
slug: private-deploy-supabase-on-cloud-server
title: 在云服务器上私有部署 Supabase 完整指南
description: 详细指导如何在云服务器上私有部署 Supabase，包括环境准备、Docker 部署、配置优化和安全设置。
date: 2025-10-21
sortOrder: 6
author: NEONITY
---

# 在云服务器上私有部署 Supabase 完整指南

Supabase 是一个开源的 Firebase 替代方案，提供了数据库、认证、实时订阅等功能。虽然 Supabase 提供了托管服务，但在某些场景下，你可能需要在自己的云服务器上进行私有部署。本指南将详细说明如何完成这一过程。

## 1. 环境准备

### 1.1 服务器要求

**最低配置：**
- CPU: 2 核心
- 内存: 4GB RAM
- 存储: 20GB SSD
- 操作系统: Ubuntu 20.04+ 或 CentOS 8+

**推荐配置：**
- CPU: 4 核心
- 内存: 8GB RAM
- 存储: 50GB SSD
- 网络: 稳定的网络连接

### 1.2 安装必要软件

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker --version
docker-compose --version
```

## 2. 获取 Supabase 源码

```bash
# 克隆 Supabase 仓库
git clone --depth 1 https://github.com/supabase/supabase.git
cd supabase/docker

# 复制环境变量模板
cp .env.example .env
```

## 3. 配置环境变量

编辑 `.env` 文件，配置以下关键参数：

```bash
# 数据库配置
POSTGRES_PASSWORD=your_strong_password_here
POSTGRES_DB=postgres

# API 配置
API_EXTERNAL_URL=https://your-domain.com
SITE_URL=https://your-domain.com

# JWT 配置
JWT_SECRET=your_jwt_secret_here

# 邮件配置（可选）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_ADMIN_EMAIL=admin@your-domain.com

# 存储配置
STORAGE_BACKEND=file
FILE_SIZE_LIMIT=52428800

# 安全配置
DISABLE_SIGNUP=false
ENABLE_EMAIL_SIGNUP=true
ENABLE_EMAIL_AUTOCONFIRM=false
```

## 4. 启动 Supabase 服务

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 5. 初始化数据库

```bash
# 等待数据库启动完成
sleep 30

# 运行数据库迁移
docker-compose exec postgres psql -U postgres -d postgres -f /docker-entrypoint-initdb.d/init-scripts/00-initial-schema.sql
```

## 6. 配置反向代理（Nginx）

创建 Nginx 配置文件：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL 证书配置
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Supabase API
    location /rest/v1/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Supabase Auth
    location /auth/v1/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Supabase Storage
    location /storage/v1/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Supabase Realtime
    location /realtime/v1/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Supabase Dashboard
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 7. 安全配置

### 7.1 防火墙设置

```bash
# 配置 UFW 防火墙
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 7.2 数据库安全

```bash
# 修改默认密码
docker-compose exec postgres psql -U postgres -c "ALTER USER postgres PASSWORD 'your_new_strong_password';"

# 创建应用专用用户
docker-compose exec postgres psql -U postgres -c "CREATE USER app_user WITH PASSWORD 'app_password';"
docker-compose exec postgres psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE postgres TO app_user;"
```

## 8. 监控和维护

### 8.1 设置日志轮转

```bash
# 创建日志轮转配置
sudo tee /etc/logrotate.d/docker-compose << EOF
/opt/supabase/docker/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0644 root root
}
EOF
```

### 8.2 设置自动备份

```bash
#!/bin/bash
# 创建备份脚本
cat > /opt/supabase/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/supabase/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库
docker-compose exec -T postgres pg_dump -U postgres postgres > $BACKUP_DIR/db_backup_$DATE.sql

# 备份存储文件
tar -czf $BACKUP_DIR/storage_backup_$DATE.tar.gz /opt/supabase/docker/volumes/storage

# 删除 7 天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/supabase/backup.sh

# 设置定时任务
echo "0 2 * * * /opt/supabase/backup.sh" | crontab -
```

## 9. 性能优化

### 9.1 数据库优化

```bash
# 编辑 PostgreSQL 配置
docker-compose exec postgres psql -U postgres -c "
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
SELECT pg_reload_conf();
"
```

### 9.2 应用优化

```yaml
# 在 docker-compose.yml 中添加资源限制
services:
  postgres:
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 1G
  
  api:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

## 10. 故障排除

### 10.1 常见问题

**问题 1: 服务启动失败**
```bash
# 检查日志
docker-compose logs

# 检查端口占用
sudo netstat -tulpn | grep :3000
```

**问题 2: 数据库连接失败**
```bash
# 检查数据库状态
docker-compose exec postgres pg_isready -U postgres

# 重启数据库
docker-compose restart postgres
```

**问题 3: 存储服务异常**
```bash
# 检查存储卷
docker volume ls
docker volume inspect supabase_storage
```

### 10.2 健康检查

```bash
# 创建健康检查脚本
cat > /opt/supabase/health_check.sh << 'EOF'
#!/bin/bash
API_URL="http://localhost:3000/rest/v1/"
DB_URL="postgresql://postgres:password@localhost:5432/postgres"

# 检查 API 服务
if curl -f -s $API_URL > /dev/null; then
    echo "API 服务正常"
else
    echo "API 服务异常"
    exit 1
fi

# 检查数据库
if docker-compose exec -T postgres pg_isready -U postgres > /dev/null; then
    echo "数据库服务正常"
else
    echo "数据库服务异常"
    exit 1
fi
EOF

chmod +x /opt/supabase/health_check.sh
```

## 11. 升级和维护

### 11.1 升级 Supabase

```bash
# 停止服务
docker-compose down

# 备份数据
./backup.sh

# 拉取最新代码
git pull origin main

# 重新构建并启动
docker-compose up -d --build
```

### 11.2 定期维护

```bash
# 清理 Docker 资源
docker system prune -f

# 更新系统包
sudo apt update && sudo apt upgrade -y

# 重启服务（如果需要）
docker-compose restart
```

## 总结

通过以上步骤，你已经成功在云服务器上部署了私有化的 Supabase 实例。记住定期备份数据、监控服务状态，并根据实际使用情况调整配置参数。

私有部署 Supabase 让你能够：
- 完全控制数据和隐私
- 自定义配置和扩展功能
- 避免供应商锁定
- 降低长期使用成本

如果你在部署过程中遇到任何问题，建议查看 Supabase 官方文档或社区论坛获取更多帮助。
