// ==============================================================================
// OPICOC V2 PM2 Cluster Configuration
// Optimized for Hostinger Cloud Hosting / VPS Node.js application management
// ==============================================================================

module.exports = {
  apps: [
    {
      name: "opicoc-v2",
      script: ".next/standalone/server.js",
      instances: "max", // Scale to all available CPU cores on Hostinger VPS
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
