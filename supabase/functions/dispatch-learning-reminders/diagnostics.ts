// Only known provider codes may enter logs; never log raw response bodies or keys.
const appleReasons = new Set([
  "BadJwtToken", "VapidPkHashMismatch", "BadVapidPublicKey",
  "BadAuthorizationHeader", "BadTtl", "BadUrgency", "BadTopic",
  "PayloadTooLarge", "BadWebPushRequest", "BadExpirationDate",
]);

export function pushFailureReason(error: unknown): string {
  if (typeof error !== "object" || error === null || !("body" in error) || typeof error.body !== "string") {
    return "unavailable";
  }
  try {
    const body = JSON.parse(error.body);
    return appleReasons.has(body?.reason) ? body.reason : "unrecognized_provider_reason";
  } catch {
    return "non_json_provider_response";
  }
}

export async function vapidDiagnostics(publicKey: string, privateKey: string, subject: string) {
  let subjectFormat = "invalid";
  try {
    const url = new URL(subject);
    if (url.protocol === "mailto:" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url.pathname)) {
      subjectFormat = "mailto";
    } else if (url.protocol === "https:") {
      subjectFormat = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname)
        ? "local_https" : "https";
    }
  } catch { /* Report a category, never the contact address. */ }

  let keyPair = "invalid";
  try {
    const normalized = publicKey.replace(/-/g, "+").replace(/_/g, "/");
    const raw = Uint8Array.from(atob(normalized + "=".repeat((4 - normalized.length % 4) % 4)), (c) => c.charCodeAt(0));
    if (raw.length !== 65 || raw[0] !== 4) throw new Error("invalid_key");
    const encode = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const algorithm = { name: "ECDSA", namedCurve: "P-256" };
    const signingKey = await crypto.subtle.importKey("jwk", {
      kty: "EC", crv: "P-256", x: encode(raw.slice(1, 33)), y: encode(raw.slice(33)), d: privateKey,
    }, algorithm, false, ["sign"]);
    const verifyingKey = await crypto.subtle.importKey("raw", raw, algorithm, false, ["verify"]);
    const message = new TextEncoder().encode("learning-reminder-vapid-diagnostic");
    const signature = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, signingKey, message);
    keyPair = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, verifyingKey, signature, message)
      ? "valid" : "mismatch";
  } catch { /* Malformed or mismatched keys, without exposing their values. */ }
  return { subjectFormat, keyPair };
}
