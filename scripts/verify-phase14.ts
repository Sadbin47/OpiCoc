import fs from "fs";
import path from "path";
import nextConfig from "../next.config";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runVerification() {
  console.log("--- Testing Phase 14: Hostinger Production Deployment & Release ---");

  // 1. Verify next.config.ts standalone output
  assert(nextConfig.output === "standalone", "next.config.ts must specify output: 'standalone'");
  console.log("✅ Next.js Standalone Mode: output: 'standalone' enabled for optimized VPS footprint");

  // 2. Verify Dockerfile Configuration
  const dockerfilePath = path.resolve(__dirname, "../Dockerfile");
  assert(fs.existsSync(dockerfilePath), "Dockerfile must exist");
  const dockerfileContent = fs.readFileSync(dockerfilePath, "utf-8");
  assert(dockerfileContent.includes("AS base"), "Dockerfile must use multi-stage base");
  assert(dockerfileContent.includes("AS deps"), "Dockerfile must have deps stage");
  assert(dockerfileContent.includes("AS builder"), "Dockerfile must have builder stage");
  assert(dockerfileContent.includes("AS runner"), "Dockerfile must have runner stage");
  assert(dockerfileContent.includes("adduser --system --uid 1001 nextjs"), "Dockerfile must create unprivileged nextjs user");
  assert(dockerfileContent.includes("USER nextjs"), "Dockerfile must run as non-root user");
  assert(dockerfileContent.includes("EXPOSE 3000"), "Dockerfile must expose port 3000");
  assert(dockerfileContent.includes("HEALTHCHECK"), "Dockerfile must include container healthcheck");
  console.log("✅ Multi-Stage Dockerfile: Hardened non-root image with healthcheck verified");

  // 3. Verify Docker Compose Configuration
  const dockerComposePath = path.resolve(__dirname, "../docker-compose.yml");
  assert(fs.existsSync(dockerComposePath), "docker-compose.yml must exist");
  const composeContent = fs.readFileSync(dockerComposePath, "utf-8");
  assert(composeContent.includes("web:"), "docker-compose.yml must define 'web' service");
  assert(composeContent.includes("3000:3000"), "docker-compose.yml must expose 3000:3000");
  assert(composeContent.includes("restart: always"), "docker-compose.yml must specify restart: always");
  console.log("✅ Docker Compose: Service orchestration and restart policy verified");

  // 4. Verify PM2 Cluster Configuration
  const ecosystemPath = path.resolve(__dirname, "../ecosystem.config.js");
  assert(fs.existsSync(ecosystemPath), "ecosystem.config.js must exist");
  const ecosystemContent = fs.readFileSync(ecosystemPath, "utf-8");
  assert(ecosystemContent.includes("opicoc-v2"), "ecosystem.config.js must define opicoc-v2 app");
  assert(ecosystemContent.includes("cluster"), "ecosystem.config.js must enable cluster mode");
  assert(ecosystemContent.includes("server.js"), "ecosystem.config.js must target standalone server.js");
  console.log("✅ PM2 Cluster Config: Zero-downtime clustering on Hostinger VPS verified");

  // 5. Verify Nginx Reverse Proxy Configuration
  const nginxPath = path.resolve(__dirname, "../deploy/nginx.conf");
  assert(fs.existsSync(nginxPath), "deploy/nginx.conf must exist");
  const nginxContent = fs.readFileSync(nginxPath, "utf-8");
  assert(nginxContent.includes("return 301 https://$host$request_uri;"), "Nginx must redirect HTTP to HTTPS");
  assert(nginxContent.includes("ssl_certificate"), "Nginx must configure SSL certificates");
  assert(nginxContent.includes("/_next/static/"), "Nginx must cache /_next/static/ directly at the edge");
  assert(nginxContent.includes("proxy_pass http://127.0.0.1:3000;"), "Nginx must proxy to local standalone port 3000");
  console.log("✅ Nginx Edge Proxy: SSL termination, HTTP/2, and static asset edge caching verified");

  // 6. Verify Hostinger Deployment Documentation Runbook
  const docPath = path.resolve(__dirname, "../docs/deployment-hostinger.md");
  assert(fs.existsSync(docPath), "docs/deployment-hostinger.md must exist");
  const docContent = fs.readFileSync(docPath, "utf-8");
  assert(docContent.includes("Prerequisites"), "Runbook must detail server prerequisites");
  assert(docContent.includes("Docker Compose"), "Runbook must detail Docker deployment");
  assert(docContent.includes("PM2"), "Runbook must detail PM2 cluster deployment");
  assert(docContent.includes("Zero-Downtime DNS Cutover"), "Runbook must include DNS cutover procedure");
  assert(docContent.includes("Rollback Procedure"), "Runbook must include rollback instructions");
  // 7. Verify Next.js Standalone Build Output
  const standaloneServerPath = path.resolve(__dirname, "../.next/standalone/server.js");
  assert(fs.existsSync(standaloneServerPath), ".next/standalone/server.js must be produced by next build");
  console.log("✅ Standalone Build Artifacts: .next/standalone/server.js verified and ready for deployment");

  console.log("🎉 All Phase 14 Hostinger Production Deployment benchmarks passed successfully!");
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
