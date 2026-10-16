/** Supabase errors and browser exceptions are not always instances of Error. */
export function reminderErrorMessage(cause: unknown, fallback: string): string {
  if (typeof cause === "string" && cause.trim()) return cause;
  if (!cause || typeof cause !== "object") return fallback;
  const { message, code } = cause as { message?: unknown; code?: unknown };
  if (typeof message !== "string" || !message.trim()) return fallback;
  return typeof code === "string" && code ? `${message}（${code}）` : message;
}

export async function reminderStep<T>(
  failureMessage: string,
  operation: () => Promise<T>,
): Promise<T> {
  try {
    return await operation();
  } catch (cause) {
    const detail = reminderErrorMessage(
      cause,
      "しばらく待ってから再度お試しください。",
    );
    // Log only the stage and error text; never include the subscription or session.
    console.warn("[learning-reminder]", failureMessage, detail);
    throw new Error(`${failureMessage} ${detail}`);
  }
}
