/**
 * OPICOC V2 Incident Alert Dispatcher
 * Sends formatted alert webhooks to Discord and Slack for production observability.
 */

export interface AlertPayload {
  title: string;
  message: string;
  level: "info" | "warning" | "error" | "fatal";
  context?: Record<string, unknown>;
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

/**
 * Dispatches a formatted notification to configured team channels (Discord / Slack)
 */
export async function dispatchAlertWebhook(alert: AlertPayload): Promise<boolean> {
  const { title, message, level, context } = alert;

  // If no external webhooks are configured, log to server console
  if (!DISCORD_WEBHOOK_URL && !SLACK_WEBHOOK_URL) {
    console.info(
      `[Alert Dispatcher] Local Notification: [${level.toUpperCase()}] ${title} - ${message}`,
      context || ""
    );
    return true;
  }

  const colorMap: Record<string, number> = {
    info: 0x38bdf8, // Sky blue
    warning: 0xf59e0b, // Amber
    error: 0xef4444, // Red
    fatal: 0x7f1d1d, // Dark Red
  };

  const timestamp = new Date().toISOString();

  // 1. Post to Discord Webhook
  if (DISCORD_WEBHOOK_URL) {
    try {
      const discordBody = {
        embeds: [
          {
            title,
            description: message,
            color: colorMap[level] || 0xef4444,
            timestamp,
            fields: context
              ? Object.entries(context).map(([k, v]) => ({
                  name: k,
                  value: typeof v === "object" ? JSON.stringify(v) : String(v),
                  inline: true,
                }))
              : [],
            footer: { text: "OPICOC V2 Observability & Uptime Monitor" },
          },
        ],
      };

      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordBody),
        signal: AbortSignal.timeout(3000),
      });
    } catch (err) {
      console.warn("[Alert Dispatcher] Failed to deliver Discord webhook:", err);
    }
  }

  // 2. Post to Slack Webhook
  if (SLACK_WEBHOOK_URL) {
    try {
      const slackBody = {
        text: `*${title}* [${level.toUpperCase()}]\n${message}\n\`\`\`${JSON.stringify(context || {}, null, 2)}\`\`\``,
      };

      await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackBody),
        signal: AbortSignal.timeout(3000),
      });
    } catch (err) {
      console.warn("[Alert Dispatcher] Failed to deliver Slack webhook:", err);
    }
  }

  return true;
}
