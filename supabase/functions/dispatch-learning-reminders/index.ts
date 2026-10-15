import { sendPushNotification } from "npm:@mmmike/web-push@1.0.1/send";

type DueReminder = {
  subscription_id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  local_date: string;
  studied_today: boolean;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

function sameSecret(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index++) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
}

function trustedPushEndpoint(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (
      host === "fcm.googleapis.com" ||
      host.endsWith(".push.services.mozilla.com") ||
      host.endsWith(".push.apple.com")
    );
  } catch {
    return false;
  }
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const dispatchSecret = Deno.env.get("REMINDER_DISPATCH_SECRET") ?? "";
  if (!dispatchSecret || !sameSecret(request.headers.get("x-reminder-secret") ?? "", dispatchSecret)) {
    return json({ error: "unauthorized" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const secretKeysRaw = Deno.env.get("SUPABASE_SECRET_KEYS") ?? "";
  let serviceKey = "";
  if (secretKeysRaw) {
    try {
      serviceKey = (JSON.parse(secretKeysRaw) as Record<string, string>).default ?? "";
    } catch {
      return json({ error: "server_configuration_missing" }, 500);
    }
  }
  if (!serviceKey) serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
  const vapidSubject = Deno.env.get("VAPID_SUBJECT") ?? "";
  if (!supabaseUrl || !serviceKey || !vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
    return json({ error: "server_configuration_missing" }, 500);
  }

  const headers = {
    apikey: serviceKey,
    ...(serviceKey.split(".").length === 3 ? { authorization: `Bearer ${serviceKey}` } : {}),
    "content-type": "application/json",
  };
  const requestJson = async (path: string, init: RequestInit = {}) => {
    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: { ...headers, ...init.headers },
    });
    if (!response.ok) throw new Error(`database_request_failed_${response.status}`);
    return response;
  };

  try {
    const dueResponse = await requestJson("rpc/get_due_learning_reminders", {
      method: "POST",
      body: "{}",
    });
    const due = (await dueResponse.json()) as DueReminder[];
    let sent = 0;
    let skipped = 0;

    for (const reminder of due) {
      if (!trustedPushEndpoint(reminder.endpoint)) {
        await requestJson(`push_subscriptions?id=eq.${encodeURIComponent(reminder.subscription_id)}`, {
          method: "DELETE",
        });
        continue;
      }

      const claimResponse = await requestJson("reminder_dispatches", {
        method: "POST",
        headers: { prefer: "resolution=ignore-duplicates,return=representation" },
        body: JSON.stringify({
          subscription_id: reminder.subscription_id,
          local_date: reminder.local_date,
          status: "claimed",
        }),
      });
      const claimed = (await claimResponse.json()) as unknown[];
      if (claimed.length === 0) continue;

      if (reminder.studied_today) {
        await requestJson(
          `reminder_dispatches?subscription_id=eq.${encodeURIComponent(reminder.subscription_id)}&local_date=eq.${encodeURIComponent(reminder.local_date)}`,
          { method: "PATCH", body: JSON.stringify({ status: "skipped" }) },
        );
        skipped++;
        continue;
      }

      try {
        const delivered = await sendPushNotification(
          {
            endpoint: reminder.endpoint,
            keys: { p256dh: reminder.p256dh, auth: reminder.auth },
          },
          {
            title: "ミニドリル",
            body: "今日の3問、やってみませんか？",
            url: "/",
            tag: "daily-learning-reminder",
          },
          { publicKey: vapidPublicKey, privateKey: vapidPrivateKey, subject: vapidSubject },
          { ttl: 60, urgency: "normal" },
        );
        if (!delivered) {
          await requestJson(`push_subscriptions?id=eq.${encodeURIComponent(reminder.subscription_id)}`, {
            method: "DELETE",
          });
          continue;
        }
        await requestJson(
          `reminder_dispatches?subscription_id=eq.${encodeURIComponent(reminder.subscription_id)}&local_date=eq.${encodeURIComponent(reminder.local_date)}`,
          { method: "PATCH", body: JSON.stringify({ status: "sent" }) },
        );
        sent++;
      } catch (error) {
        const statusCode = typeof error === "object" && error !== null && "statusCode" in error
          ? Number(error.statusCode)
          : 0;
        if (statusCode === 404 || statusCode === 410) {
          await requestJson(`push_subscriptions?id=eq.${encodeURIComponent(reminder.subscription_id)}`, {
            method: "DELETE",
          });
        } else {
          await requestJson(
            `reminder_dispatches?subscription_id=eq.${encodeURIComponent(reminder.subscription_id)}&local_date=eq.${encodeURIComponent(reminder.local_date)}`,
            { method: "PATCH", body: JSON.stringify({ status: "failed" }) },
          );
          console.error("Reminder delivery failed", { statusCode });
        }
      }
    }

    return json({ processed: due.length, sent, skipped });
  } catch (error) {
    console.error("Reminder dispatch failed", error instanceof Error ? error.message : "unknown_error");
    return json({ error: "dispatch_failed" }, 500);
  }
});
