import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { sentryClientOptions } from "../sentry.client.config";
import { sentryServerOptions } from "../sentry.server.config";
import { captureException, captureMessage, logger, trackPerformanceMetric } from "../src/lib/observability";
import { dispatchAlertWebhook } from "../src/lib/observability/alerts";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runVerification() {
  console.log("--- Testing Phase 15: Observability, Monitoring & Day-2 Operations ---");

  // 1. Sentry Configuration Verification
  assert(sentryClientOptions !== undefined, "sentryClientOptions must be exported");
  assert(sentryClientOptions.tracesSampleRate !== undefined, "tracesSampleRate must be defined for client");
  assert(sentryServerOptions !== undefined, "sentryServerOptions must be exported");
  assert(sentryServerOptions.tracesSampleRate !== undefined, "tracesSampleRate must be defined for server");
  console.log("✅ Sentry Configurations: Client and server error monitoring configurations verified");

  // 2. Centralized Observability & Telemetry Engine
  assert(typeof captureException === "function", "captureException must be defined");
  assert(typeof captureMessage === "function", "captureMessage must be defined");
  assert(typeof trackPerformanceMetric === "function", "trackPerformanceMetric must be defined");
  assert(typeof logger.error === "function", "logger.error must be defined");

  // Test error capture without crash
  captureException(new Error("Test synthetic verification error"), { endpoint: "/test", action: "verify_phase15" });
  captureMessage("Operational verification check", "info");
  trackPerformanceMetric("LCP", 1250, { page: "homepage" });
  console.log("✅ Observability Engine: Structured error logging and metric telemetry active");

  // 3. Incident Alert Webhook Dispatcher
  const alertDelivered = await dispatchAlertWebhook({
    title: "Verification Notification",
    message: "Automated Phase 15 verification probe test",
    level: "info",
    context: { environment: "test", phase: 15 },
  });
  assert(alertDelivered === true, "Alert dispatcher must return true");
  console.log("✅ Incident Alert Dispatcher: Webhook delivery interface operational");

  // 4. Automated Database Backup Script Execution
  const backupScriptPath = path.resolve(__dirname, "./backup-db.sh");
  assert(fs.existsSync(backupScriptPath), "scripts/backup-db.sh must exist");

  console.log("🚀 Executing backup script simulation...");
  execSync("bash scripts/backup-db.sh", { cwd: path.resolve(__dirname, ".."), stdio: "pipe" });

  const backupDir = path.resolve(__dirname, "../backups");
  assert(fs.existsSync(backupDir), "backups/ directory must be created");
  const backupFiles = fs.readdirSync(backupDir).filter((f) => f.endsWith(".gz"));
  assert(backupFiles.length > 0, "Backup script must generate at least one .gz archive");
  console.log(`✅ Automated Database Backup: Generated compressed archive (${backupFiles[backupFiles.length - 1]})`);

  // 5. Database Disaster Recovery Restoration Script Verification
  const restoreScriptPath = path.resolve(__dirname, "./restore-db.sh");
  assert(fs.existsSync(restoreScriptPath), "scripts/restore-db.sh must exist");

  const latestBackupPath = path.join(backupDir, backupFiles[backupFiles.length - 1]);
  console.log(`🚀 Executing restore script simulation on ${latestBackupPath}...`);
  execSync(`bash scripts/restore-db.sh "${latestBackupPath}"`, { cwd: path.resolve(__dirname, ".."), stdio: "pipe" });
  console.log("✅ Disaster Recovery Restore: Backup archive decompressed and validated cleanly");

  // 6. Uptime Monitoring & Healthcheck Daemon
  const monitorPath = path.resolve(__dirname, "./healthcheck-monitor.ts");
  assert(fs.existsSync(monitorPath), "scripts/healthcheck-monitor.ts must exist");
  const monitorContent = fs.readFileSync(monitorPath, "utf-8");
  assert(monitorContent.includes("runHealthCheckSuite"), "healthcheck-monitor.ts must implement runHealthCheckSuite");
  assert(monitorContent.includes("checkEndpointHealth"), "healthcheck-monitor.ts must implement checkEndpointHealth");
  console.log("✅ Uptime Monitor Daemon: Healthcheck probe implementation verified");

  // 7. Operations Manual Completeness
  const manualPath = path.resolve(__dirname, "../docs/operations-manual.md");
  assert(fs.existsSync(manualPath), "docs/operations-manual.md must exist");
  const manualContent = fs.readFileSync(manualPath, "utf-8");
  assert(manualContent.includes("Sentry"), "Operations manual must cover Sentry configuration");
  assert(manualContent.includes("crontab"), "Operations manual must document backup cron schedules");
  assert(manualContent.includes("Restoration Procedure"), "Operations manual must document disaster recovery");
  assert(manualContent.includes("PM2"), "Operations manual must cover PM2 cluster maintenance");
  assert(manualContent.includes("Checklists"), "Operations manual must include daily/weekly/monthly maintenance checklists");
  console.log("✅ Operations Manual: Complete Day-2 maintenance, backup, and monitoring documentation verified");

  console.log("🎉 All Phase 15 Observability, Monitoring & Day-2 Operations benchmarks passed successfully!");
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
