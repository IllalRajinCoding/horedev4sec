# 🐳 Docker Deployment Guide - VPS

Complete guide untuk deploy React app menggunakan Docker Compose ke VPS.

---

## 📋 Prerequisites

1. **VPS** dengan akses SSH (port custom: 7878)
2. **Docker & Docker Compose** terinstall di VPS
3. **Nginx** terinstall di VPS (sebagai reverse proxy)
4. **GitHub Repository** dengan access untuk GitHub Actions
5. **Domain** (opsional): `info.horedev4sec.biz.id`

---

## 🔧 Step 1: Install Docker di VPS

### 1.1 Install Docker Engine

```bash
# Update package list
sudo apt update

# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Verify installation
docker --version
```

### 1.2 Install Docker Compose

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

### 1.3 Add User to Docker Group (Optional)

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply changes (logout & login, atau jalankan ini)
newgrp docker

# Test Docker without sudo
docker ps
```

---

## 🌐 Step 2: Setup Nginx (Reverse Proxy)

### 2.1 Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2.2 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/info.horedev4sec.biz.id
```

Copy konfigurasi dari file `nginx.conf` di repository, lalu:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/info.horedev4sec.biz.id /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔑 Step 3: Setup SSH Key untuk GitHub Actions

### 3.1 Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "github-actions-docker" -f ~/.ssh/github-actions
```

### 3.2 Add Public Key ke authorized_keys

```bash
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 3.3 Copy Private Key untuk GitHub Secret

```bash
cat ~/.ssh/github-actions
```

Copy **seluruh output** untuk `VPS_SSH_KEY` secret.

---

## 🔐 Step 4: Setup GitHub Secrets

Repository → Settings → Secrets and variables → Actions

| Secret Name    | Value              | Example                                  |
| -------------- | ------------------ | ---------------------------------------- |
| `VPS_HOST`     | IP atau domain VPS | `103.xxx.xxx.xxx`                        |
| `VPS_USERNAME` | SSH username       | `root` atau `loxyland`                   |
| `VPS_SSH_KEY`  | Private SSH key    | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `VPS_PORT`     | SSH port           | `7878`                                   |

---

## 📁 Step 5: Prepare VPS Directory

```bash
# Create project directory
mkdir -p /home/$USER/horahoredevops
cd /home/$USER/horahoredevops

# Pastikan direktori memiliki permission yang benar
chmod 755 /home/$USER/horahoredevops
```

---

## 🚀 Step 6: Deploy

### Automatic Deployment

Push ke branch `main`:

```bash
git add .
git commit -m "Deploy with Docker"
git push origin main
```

GitHub Actions akan otomatis:

1. ✅ Build Docker image
2. ✅ Upload ke VPS
3. ✅ Deploy dengan Docker Compose
4. ✅ Backup container sebelumnya
5. ✅ Run container baru

### Manual Deployment (Testing)

Di VPS, test manual:

```bash
cd /home/$USER/horahoredevops

# Clone repository (first time only)
git clone https://github.com/yourusername/horahoredevops.git .

# Build image
docker build -t horahoredevops:latest .

# Run with Docker Compose
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

---

## 🔍 Monitoring & Management

### Check Container Status

```bash
# List running containers
docker ps

# View logs
docker-compose logs -f

# Check specific container
docker logs horahoredevops-app

# Follow logs real-time
docker logs -f horahoredevops-app
```

### Container Management

```bash
# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

### Resource Usage

```bash
# Check Docker disk usage
docker system df

# Check container resources
docker stats

# Check specific container
docker stats horahoredevops-app
```

---

## 🔄 Rollback

### Option 1: Rollback to Backup Image

```bash
# List backup images
docker images horahoredevops --format "{{.Repository}}:{{.Tag}}"

# Stop current container
docker-compose down

# Manually run backup image
docker run -d -p 3001:80 --name horahoredevops-app horahoredevops:backup-20260102-120000

# Or update docker-compose.yml to use backup tag
```

### Option 2: Pull Previous Version dari GitHub

```bash
cd /home/$USER/horahoredevops

# Check commit history
git log --oneline

# Revert to specific commit
git checkout <commit-hash>

# Rebuild and deploy
docker-compose up -d --build
```

---

## 🧹 Cleanup & Maintenance

### Remove Old Images

```bash
# Remove dangling images
docker image prune -f

# Remove old backup images (keep last 3)
docker images horahoredevops --format "{{.Tag}}" | grep backup | tail -n +4 | xargs -r -I {} docker rmi horahoredevops:{}
```

### System Cleanup

```bash
# Remove unused containers, networks, images
docker system prune -a

# Remove unused volumes
docker volume prune
```

### Scheduled Cleanup (Crontab)

```bash
# Edit crontab
crontab -e

# Add this line (cleanup every Sunday at 2 AM)
0 2 * * 0 docker system prune -af --volumes
```

---

## 🔒 Security Best Practices

### 1. Use Non-root User for Docker

```bash
# Create dedicated user
sudo useradd -m -s /bin/bash dockeruser
sudo usermod -aG docker dockeruser

# Run containers as this user
```

### 2. Limit Container Resources

Update `docker-compose.yml`:

```yaml
services:
  horahoredevops:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 256M
```

### 3. Setup Firewall Rules

```bash
# Allow only necessary ports
sudo ufw allow 7878/tcp  # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 🌐 SSL Setup dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d info.horedev4sec.biz.id

# Auto renewal (already setup by certbot)
sudo certbot renew --dry-run
```

---

## 📊 Health Checks

### Application Health

```bash
# Check container health
docker inspect horahoredevops-app | grep Health -A 10

# Manual health check
curl http://localhost:3001/health
```

### Nginx Health

```bash
# Test Nginx config
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/horahoredevops-error.log
```

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Inspect container
docker inspect horahoredevops-app

# Check image
docker images horahoredevops
```

### Port Already in Use

```bash
# Find process using port 3001
sudo lsof -i :3001
sudo netstat -tulpn | grep 3001

# Kill process if needed
sudo kill -9 <PID>
```

### Build Fails

```bash
# Build with verbose output
docker build --no-cache --progress=plain -t horahoredevops:latest .

# Check Dockerfile syntax
docker build --check -f Dockerfile .
```

### Disk Space Issues

```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a --volumes
```

---

## ✅ Deployment Checklist

- [ ] VPS sudah install Docker & Docker Compose
- [ ] Nginx sudah terinstall dan terkonfigurasi
- [ ] SSH key sudah di-generate
- [ ] GitHub Secrets sudah di-setup (VPS_HOST, VPS_USERNAME, VPS_SSH_KEY, VPS_PORT)
- [ ] Project directory sudah dibuat di VPS
- [ ] Firewall sudah dikonfigurasi (port 7878, 80, 443)
- [ ] Domain sudah di-point ke VPS (jika ada)
- [ ] SSL certificate sudah install (untuk production)
- [ ] First deployment berhasil
- [ ] Health check berjalan
- [ ] Monitoring setup

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  Internet                       │
└────────────────────┬────────────────────────────┘
                     │ HTTPS/HTTP
                     ▼
         ┌──────────────────────────┐
         │  Nginx (Reverse Proxy)   │
         │  Port 80/443             │
         └───────────┬──────────────┘
                     │ HTTP
                     ▼
         ┌──────────────────────────┐
         │  Docker Container        │
         │  - React App             │
         │  - Nginx (in container)  │
         │  Port 3001:80            │
         └──────────────────────────┘
```

---

## 🎉 Success!

Aplikasi sekarang bisa diakses di:

- **HTTP**: `http://info.horedev4sec.biz.id`
- **HTTPS**: `https://info.horedev4sec.biz.id` (setelah SSL setup)

Setiap push ke branch `main` akan otomatis trigger deployment! 🚀

---

## 📚 Useful Commands Reference

```bash
# Docker
docker ps                          # List running containers
docker images                      # List images
docker logs <container>            # View logs
docker exec -it <container> sh     # Enter container shell
docker stats                       # Resource usage

# Docker Compose
docker-compose up -d               # Start services
docker-compose down                # Stop services
docker-compose ps                  # List services
docker-compose logs -f             # Follow logs
docker-compose restart             # Restart services

# Nginx
sudo nginx -t                      # Test config
sudo systemctl reload nginx        # Reload
sudo systemctl status nginx        # Status

# System
df -h                              # Disk usage
free -h                            # Memory usage
htop                               # Process monitor
```

---

**Need Help?** Check logs first:

- Container: `docker-compose logs -f`
- Nginx: `sudo tail -f /var/log/nginx/horahoredevops-error.log`
- System: `journalctl -xe`
