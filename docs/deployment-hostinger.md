# OPICOC V2 Hostinger Production Deployment & DNS Cutover Runbook

This guide outlines the complete operational procedures for deploying **OPICOC V2** to Hostinger infrastructure (VPS / KVM / Cloud Hosting) with zero downtime, SSL termination, and seamless DNS cutover from the legacy Netlify deployment.

---

## 1. System Architecture Overview

```
                      ┌───────────────────────────────────────┐
                      │ Cloudflare / Hostinger DNS Management │
                      │  opicoc.cc (A) / www.opicoc.cc (CNAME)│
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼ HTTPS :443 (HTTP/2)
                      ┌───────────────────────────────────────┐
                      │       Nginx Reverse Proxy & Edge      │
                      │  • SSL Termination (Let's Encrypt)    │
                      │  • Static Asset Cache (/_next/static) │
                      │  • Rate Limiting Zone (20 req/s)      │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼ HTTP :3000 (Internal Loopback)
                      ┌───────────────────────────────────────┐
                      │    OPICOC V2 Node.js Standalone       │
                      │  • Docker Container OR PM2 Cluster    │
                      │  • React Suspense Server Streaming    │
                      │  • In-Memory Process Caching          │
                      │  • Relational DB Client (PostgreSQL)  │
                      └───────────────────────────────────────┘
```

---

## 2. Server Prerequisites & System Provisioning

Log into the Hostinger VPS via SSH as `root` or `sudo` user:

```bash
ssh user@your-hostinger-vps-ip
```

### Install Core System Dependencies (Ubuntu 22.04 / 24.04 LTS)

```bash
# Update package repositories
sudo apt update && sudo apt upgrade -y

# Install essential tools, Git, and build utilities
sudo apt install -y curl wget git ufw nginx certbot python3-certbot-nginx

# Install Node.js 20.x LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify runtimes
node -v  # Expected: v20.x
npm -v   # Expected: v10.x

# Install PM2 process manager globally
sudo npm install -g pm2
```

### Configure Hostinger Firewall (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 3. Application Setup & Secure Secrets Management

Clone the repository into the production root directory:

```bash
sudo mkdir -p /var/www/opicoc-v2
sudo chown -R $USER:$USER /var/www/opicoc-v2
cd /var/www/opicoc-v2

git clone https://github.com/Sadbin47/OPI_COC_V2.git .
```

### Configure Production Environment Variables

Never commit secrets to version control. Copy `.env.example` to create `.env`:

```bash
cp .env.example .env
nano .env
```

Ensure the following variables are configured:

```ini
# Application Core
NODE_ENV="production"
NEXT_PUBLIC_SITE_URL="https://www.opicoc.cc"
NEXT_PUBLIC_APP_NAME="OPICOC V2"

# Database Configuration (Hostinger Managed PostgreSQL or Local)
DATABASE_URL="postgresql://db_user:strong_password@localhost:5432/opicoc_v2?schema=public"

# Session Security
AUTH_SECRET="generate-a-secure-random-32-byte-hex-string"
SESSION_COOKIE_NAME="opicoc_session"

# Email Delivery Provider
RESEND_API_KEY="re_live_production_key"
EMAIL_FROM="OPICOC Support <support@opicoc.cc>"

# Payment Gateways
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

## 4. Deployment Methods

### Option A: Docker & Docker Compose (Recommended for Containerized Isolation)

1. **Install Docker Engine**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

2. **Build and Launch Container**:
   ```bash
   cd /var/www/opicoc-v2
   docker compose build --no-cache
   docker compose up -d
   ```

3. **Verify Container Health**:
   ```bash
   docker ps
   docker compose logs -f web
   ```

---

### Option B: PM2 Cluster Mode (Native Hostinger Node.js Runtime)

1. **Install Production Dependencies & Compile Standalone Artifacts**:
   ```bash
   cd /var/www/opicoc-v2
   npm ci
   npm run build
   ```

2. **Prepare Standalone Assets for Server Execution**:
   ```bash
   # Copy public assets and static CSS/JS chunks into standalone directory
   cp -r public .next/standalone/
   cp -r .next/static .next/standalone/.next/
   ```

3. **Start PM2 Application Cluster**:
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

4. **Monitor PM2 Status**:
   ```bash
   pm2 status
   pm2 logs opicoc-v2
   ```

---

## 5. Nginx Reverse Proxy & SSL Setup

1. **Deploy Nginx Configuration**:
   ```bash
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/opicoc.cc
   sudo ln -sf /etc/nginx/sites-available/opicoc.cc /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   ```

2. **Test Nginx Syntax**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Provision Free Automated SSL via Let's Encrypt**:
   ```bash
   sudo certbot --nginx -d opicoc.cc -d www.opicoc.cc
   ```

4. **Verify SSL Auto-Renewal**:
   ```bash
   sudo certbot renew --dry-run
   ```

---

## 6. Zero-Downtime DNS Cutover Plan (Netlify to Hostinger)

### Phase 1: 48 Hours Before Cutover (TTL Reduction)
1. In your domain registrar / DNS provider (Cloudflare or Hostinger DNS):
   - Locate the `A` record for `@` (opicoc.cc) and `CNAME` for `www`.
   - Reduce the **TTL (Time to Live)** value from `86400` (24h) to `300` (5 minutes).
   - This ensures rapid worldwide DNS cache expiration during switchover.

### Phase 2: Staging Subdomain Validation
1. Point `staging.opicoc.cc` to Hostinger VPS IP.
2. Verify all user journeys on `https://staging.opicoc.cc`:
   - Registration -> OTP -> Login -> Profile.
   - Catalog browsing & Town Hall filtering.
   - Custom base submission.
   - Cart checkout flow.
   - Admin authentication & layout link security.

### Phase 3: The Live DNS Cutover
1. Update DNS Records:
   - **Type `A`**: `@` &rarr; `<Hostinger_VPS_IP>` (TTL: 300s).
   - **Type `CNAME`**: `www` &rarr; `opicoc.cc` (TTL: 300s).
2. Monitor real-time DNS propagation:
   ```bash
   watch -n 5 "dig +short opicoc.cc @8.8.8.8"
   ```
3. Monitor access logs on Hostinger VPS:
   ```bash
   sudo tail -f /var/log/nginx/access.log
   ```

### Phase 4: Post-Cutover Stabilization
1. Confirm traffic is landing on Hostinger VPS.
2. Once traffic stabilizes (24 hours), restore TTL to `86400` (1 day).
3. Safely decommission the legacy Netlify instance.

---

## 7. Emergency Rollback Procedure

If a critical blocker is discovered post-cutover:

1. **Immediate DNS Reversal**:
   - Revert DNS `A` record `@` to legacy Netlify IP (`75.2.60.5`).
   - Traffic will divert back to legacy deployment within 5 minutes due to the reduced 300s TTL.
2. **Review PM2 / Nginx Logs**:
   ```bash
   pm2 logs opicoc-v2 --lines 100
   sudo tail -n 100 /var/log/nginx/error.log
   ```
