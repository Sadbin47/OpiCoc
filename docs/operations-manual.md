# OPICOC V2 Day-2 Operations, Monitoring & Maintenance Manual

This manual provides complete documentation for operating, monitoring, maintaining, and recovering the **OPICOC V2** production platform on Hostinger infrastructure.

---

## 1. Operational Architecture Overview

```
 ┌────────────────────────────────────────────────────────┐
 │                   OPICOC V2 Operations                 │
 ├────────────────────────────────────────────────────────┤
 │ 1. Observability: Sentry (Client/Server) + JSON Logs   │
 │ 2. Incident Alerts: Discord / Slack Webhook Dispatcher │
 │ 3. Database Resilience: Automated Daily Backups + Gzip │
 │ 4. Process Health: PM2 Cluster Mode (Auto-restart)     │
 │ 5. Edge Proxy: Nginx SSL Termination & Rate Limiting   │
 └────────────────────────────────────────────────────────┘
```

---

## 2. Real-Time Error Tracking (Sentry & Observability)

### Configuration Files
- **Client Monitoring**: [`sentry.client.config.ts`](../sentry.client.config.ts) captures unhandled React exceptions, client-side rejections, and browser Core Web Vitals.
- **Server Monitoring**: [`sentry.server.config.ts`](../sentry.server.config.ts) captures Node.js server component errors, API route crashes, and database connection timeouts.
- **Unified Observability Engine**: [`src/lib/observability/index.ts`](../src/lib/observability/index.ts) provides `captureException()`, `captureMessage()`, and `trackPerformanceMetric()`.

### Sentry Provisioning (Production Setup)
1. In the Sentry dashboard, create a new project: **Next.js**.
2. Copy the project **DSN (Data Source Name)**.
3. In your production `/var/www/opicoc-v2/.env` file, append:
   ```ini
   NEXT_PUBLIC_SENTRY_DSN="https://publicKey@oXXXXX.ingest.sentry.io/XXXXX"
   SENTRY_DSN="https://publicKey@oXXXXX.ingest.sentry.io/XXXXX"
   ```
4. Restart the PM2 application cluster:
   ```bash
   pm2 reload opicoc-v2
   ```

### Filtering & Data Scrubbing Policy
All error payloads automatically scrub:
- Credit card numbers, CVVs, and Stripe payment tokens.
- Session authorization cookies (`opicoc_session`).
- Plaintext user passwords and OTP tokens.

---

## 3. Automated Database Backups & Disaster Recovery

### Daily Backup Script
The automated backup utility is located at [`scripts/backup-db.sh`](../scripts/backup-db.sh).
- Supports both **PostgreSQL** (`pg_dump`) and **SQLite** databases.
- Applies high-ratio gzip compression (`-9`).
- Generates SHA-256 integrity checksums.
- Automatically purges local archives older than **14 days**.

### Manual Backup Execution
```bash
cd /var/www/opicoc-v2
./scripts/backup-db.sh
```

### Automated Nightly Cron Schedule
Configure automated execution at 02:00 AM server time via root or system crontab:

```bash
crontab -e
```

Add the following cron expression:
```cron
# Run OPICOC V2 Database Backup every day at 02:00 AM UTC
0 2 * * * cd /var/www/opicoc-v2 && ./scripts/backup-db.sh >> /var/log/opicoc-backup.log 2>&1
```

### Disaster Recovery & Restoration Procedure
In the event of database corruption or hardware failure:
1. Locate the latest valid backup archive in `./backups/` or offsite storage.
2. Execute the restore utility:
   ```bash
   cd /var/www/opicoc-v2
   ./scripts/restore-db.sh ./backups/opicoc_pg_YYYYMMDD_HHMMSS.sql.gz
   ```
3. Restart application workers:
   ```bash
   pm2 reload opicoc-v2
   ```

---

## 4. Uptime Monitoring & Incident Alerting

### Healthcheck Daemon
The platform includes an automated probe: [`scripts/healthcheck-monitor.ts`](../scripts/healthcheck-monitor.ts).
- Verifies HTTP 200 response codes on root and API routes.
- Measures response latency in milliseconds.
- Triggers instant Discord / Slack notifications if latency > 2000ms or status != 200.

### Team Channel Webhook Setup
In `/var/www/opicoc-v2/.env`:
```ini
# Discord Incoming Webhook (Alerts Channel)
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123456789/your-token"

# Slack Incoming Webhook (Alerts Channel)
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T000/B000/XXXX"
```

### Automated Monitoring Schedule
Add to crontab to check system health every 5 minutes:
```cron
*/5 * * * * cd /var/www/opicoc-v2 && bun scripts/healthcheck-monitor.ts >> /var/log/opicoc-health.log 2>&1
```

---

## 5. Process Management & PM2 Cluster Maintenance

### Common PM2 Commands
```bash
# View live worker status and memory consumption
pm2 status

# Live terminal streaming logs
pm2 logs opicoc-v2

# Visual terminal dashboard
pm2 monit

# Zero-downtime rolling restart (e.g. after code update)
pm2 reload opicoc-v2

# Hard restart
pm2 restart opicoc-v2
```

### Automated PM2 Log Rotation
Prevent log files from exhausting VPS disk storage:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 10
pm2 set pm2-logrotate:compress true
```

---

## 6. Post-Launch Maintenance Checklists

### Daily Checklist (5 Minutes)
- [ ] Review Sentry dashboard for any unhandled 5xx exceptions or spike in client errors.
- [ ] Check `/var/log/opicoc-backup.log` to confirm 02:00 AM backup succeeded.
- [ ] Inspect PM2 cluster health (`pm2 status`) ensuring restart counts remain low.
- [ ] Review pending custom base build orders in Admin Dashboard (`/admin/requests`).

### Weekly Checklist (15 Minutes)
- [ ] Inspect VPS disk utilization (`df -h`).
- [ ] Review Nginx access and rate-limiting reject logs (`/var/log/nginx/error.log`).
- [ ] Perform test database dry-run restoration on staging environment.
- [ ] Verify SSL certificate expiration window (`sudo certbot certificates`).

### Monthly Checklist (30 Minutes)
- [ ] Run security dependency audit (`npm audit`).
- [ ] Apply operating system security patches (`sudo apt update && sudo apt upgrade -y`).
- [ ] Update Town Hall balance meta notes in accordance with Clash of Clans seasonal patches.
- [ ] Benchmark Core Web Vitals via Google PageSpeed Insights (verify LCP < 2.0s, CLS < 0.05).
